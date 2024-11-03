import { createContext, useContext } from 'react';

import { usePageState } from './usePageState';
import { Page } from '../utils/types';
import { withInitialState } from './withInitialState';

type AppStageContextType = ReturnType<typeof usePageState>;

const AppStageContext = createContext<AppStageContextType>(
  {} as AppStageContextType
);

interface AppStateProviderProps {
  children: React.ReactNode;
  initialState: Page | null;
}

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }: AppStateProviderProps) => {
    const pageStateHandlers = usePageState(initialState!);

    return (
      <AppStageContext.Provider value={pageStateHandlers}>
        {children}
      </AppStageContext.Provider>
    );
  }
);

export const useAppState = () => useContext(AppStageContext);
