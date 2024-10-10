import { render, screen } from '@testing-library/react';
import App from './App';

test('renders username and password fields', () => {
    render(<App />);
  });