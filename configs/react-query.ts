import axios from "axios";
import { QueryCache, QueryClient } from "react-query";
// import { toast } from 'react-toastify';
import { isDev } from "../utils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: isDev ? false : 3,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (isDev) {
        // 🎉 only show error toasts if we already have data in the cache
        // which indicates a failed background update
        if (query.state.data !== undefined) {
          let message = "";

          // Case when hit `api/auth/session` but got `Internal Server Error`
          if (typeof error === "string") {
            message = error.trim();
          }

          if (axios.isAxiosError(error)) {
            const { data, statusText } = error.response ?? {};
            /**
             * In case `data` is `string`, or `data` is object and has `message` property,
             * otherwise just use `statusText` or `error.message`
             */
            message =
              typeof data === "string"
                ? data
                : data?.message ?? statusText ?? error.message;
          }

          // Case when multiple toasts are shown at the same time
          //   toast.dismiss();
          //   toast.error(`Background update failed: ${message}`);
        }
      }
    },
  }),
});

export default queryClient;
