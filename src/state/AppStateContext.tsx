import { createContext, useContext } from 'react';

import { usePageState } from './usePageState';
import { Page } from '../utils/types';

type AppStageContextType = ReturnType<typeof usePageState>;

const AppStageContext = createContext<AppStageContextType>(
  {} as AppStageContextType
);

interface AppStateProviderProps {
  children: React.ReactNode;
  initialState: Page;
}

export const AppStateProvider = ({
  children,
  initialState,
}: AppStateProviderProps) => {
  const pageStateHandlers = usePageState(initialState);

  return (
    <AppStageContext.Provider value={pageStateHandlers}>
      {children}
    </AppStageContext.Provider>
  );
};

export const useAppState = () => useContext(AppStageContext);
