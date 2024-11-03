import React, { useEffect, useState } from 'react';
import { Page } from '../utils/types';
import { useMatch } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import startPageScaffold from './startPageScaffold.json';

import styles from '../utils.module.scss';
import { Loader } from '../components/Loader';

type InjectedProps = {
  initialState: Page | null;
};

type PropsWithoutInject<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<
    PropsWithoutInject<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInject<TProps>) => {
    const match = useMatch('/:slug');
    const pageSlug = match ? match.params.slug : 'start';

    const [initialState, setInitialState] = useState<Page | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      setIsLoading(true);
      const fetchInitialState = async () => {
        try {
          const { data } = await supabase.auth.getUser();
          const user = data.user;
          if (!user) {
            throw new Error('User is not logged in');
          }
          const { data: dataFrom } = await supabase
            .from('pages')
            .select('title, id, cover, nodes, slug')
            .match({ slug: pageSlug, created_by: user.id })
            .single();
          if (!dataFrom && pageSlug === 'start') {
            const result = await supabase
              .from('pages')
              .insert({
                ...startPageScaffold,
                slug: 'start',
                created_by: user.id,
              })
              .single();
            setInitialState(result?.data);
          } else {
            setInitialState(dataFrom);
          }
        } catch (e) {
          if (e instanceof Error) {
            setError(error);
          }
        }
        setIsLoading(false);
      };
      fetchInitialState();
    }, [pageSlug]);

    if (isLoading) {
      return (
        <div className={styles.centeredFlex}>
          <Loader />
        </div>
      );
    }
    if (error) {
      return <div>{error.message}</div>;
    }

    if (!initialState) {
      <div>Page not found</div>;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
