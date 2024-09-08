import React from 'react';
import { Page } from './Page/Page';
import { AppStateProvider } from './state/AppStateContext';
import { nanoid } from 'nanoid';
import { createPage } from './utils/createPage';

const initialState = createPage();

const App: React.FC = () => {
  return (
    <AppStateProvider initialState={initialState}>
      <Page />
    </AppStateProvider>
  );
};

export default App;
