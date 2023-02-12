import {
  Box,
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React from 'react';
import { useStyles } from './LoginForm.styles';
import { Logo } from '../../assets';
import { IconEye, IconKey, IconMail } from '@tabler/icons-react';
import { useLogin } from '../../hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserLoginSchema } from '../../variables/schema';
import { useSession } from 'next-auth/react';

export function LoginForm() {
  const { data: session } = useSession();
  const { classes } = useStyles();
  const formMethods = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(UserLoginSchema),
  });

  const { mutate: login, isLoading } = useLogin(formMethods);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = formMethods;

  const errorMail = errors.email?.message;
  const errorPassword = errors.password?.message;

  const onSubmit = handleSubmit(data => {
    login(data);
  });

  return (
    <Container size="xs" className={classes.container}>
      <Stack spacing="md" align="center">
        <Logo className={classes.logo} />
        <Stack spacing="xs" className={classes.greeting}>
          <Title>Selamat Datang</Title>
          <Text>Silahkan Login terlebih dahulu</Text>
        </Stack>
        <FormProvider {...formMethods}>
          <form onSubmit={onSubmit} className={classes.form}>
            <Stack spacing="md" align="center">
              <TextInput
                placeholder="Masukan email"
                type="email"
                className={classes.input}
                icon={<IconMail size={14} />}
                {...register('email')}
                error={errorMail}
              />
              <PasswordInput
                placeholder="Masukan password"
                className={classes.input}
                icon={<IconKey size={14} />}
                {...register('password')}
                error={errorPassword}
              />
              <Button fullWidth loading={isLoading} type="submit">
                {isLoading ? 'Tunggu Sebentar' : 'Masuk'}
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Stack>
    </Container>
  );
}

export default LoginForm;
