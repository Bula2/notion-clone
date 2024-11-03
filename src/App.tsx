import React from 'react';
import { Page } from './Page/Page';
import { AppStateProvider } from './state/AppStateContext';
import { Route, Routes } from 'react-router-dom';
import { createPage } from './utils/createPage';
import { Auth } from './auth/Auth';
import { Private } from './auth/Private';

const initialState = createPage();

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/:id"
        element={
          <Private
            component={
              <AppStateProvider initialState={initialState}>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
      <Route
        path="/"
        element={
          <Private
            component={
              <AppStateProvider initialState={initialState}>
                <Page />
              </AppStateProvider>
            }
          />
        }
      />
    </Routes>
  );
};

export default App;
