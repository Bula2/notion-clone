import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('render gettings', () => {
    render(<App />);

    expect(screen.getByText('Hello TypeScript React!')).toBeInTheDocument();
  });
});
