import { ReactElement } from 'react';
import { useAuthSession } from './AuthSessionContext';
import { Navigate } from 'react-router-dom';

type PrivateProps = {
  component: ReactElement;
};

export const Private: React.FC<PrivateProps> = ({ component }) => {
  const { session, loading } = useAuthSession();

  if (loading) {
    <>Авторизация....</>;
  }

  return session ? component : <Navigate to="/auth" />;
};
