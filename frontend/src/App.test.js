import { render, screen } from '@testing-library/react';
import App from './App';

test('renders username and password fields', () => {
    render(<App />);
  
    // Check for the presence of username field
    const usernameField = screen.getByPlaceholderText('Enter your username');
    expect(usernameField).toBeInTheDocument();
  
    // Check for the presence of password field
    const passwordField = screen.getByPlaceholderText('Enter your password');
    expect(passwordField).toBeInTheDocument();
  });