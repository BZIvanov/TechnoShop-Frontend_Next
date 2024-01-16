import { CardWrapper } from '@/components/auth/card-wrapper';

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel='Do not have an account?'
      backButtonHref='/auth/register'
      showSocial={true}
    >
      form
    </CardWrapper>
  );
};
