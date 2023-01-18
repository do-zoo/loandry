export const responseStatus = {
  success: 'success',
  error: 'error',
  'card-used': 'card-used',
  loading: 'loading',
  idle: 'idle',
  'new-card': 'new-card',
  scanning: 'scanning',
} as const;

type A = keyof typeof responseStatus;
type B = typeof responseStatus[keyof typeof responseStatus];

export type KeyOf<T extends Record<string, unknown> = {}> = keyof T;

export type ValueOf<T extends Record<string, unknown> = {}> = T[keyof T];

export type KeyOfResponseStatus = KeyOf<typeof responseStatus>;

const test: ValueOf<typeof responseStatus> = 'error';
