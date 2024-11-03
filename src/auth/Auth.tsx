import { FormEvent, useState } from 'react';
import { useAuthSession } from './AuthSessionContext';
import { Navigate } from 'react-router-dom';

import styles from '../utils.module.scss';
import { supabase } from '../supabaseClient';

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const { session } = useAuthSession();

  if (session) {
    return <Navigate to="/" />;
  }

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.centeredFlex}>
      <div>
        <h1>Notion clone App</h1>
        <p>Авторизоваться с помощью почты</p>
        {loading ? (
          'Идет запрос...'
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />{' '}
            <button>Авторизоваться</button>
          </form>
        )}
      </div>
    </div>
  );
};
