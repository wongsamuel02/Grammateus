import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './pages/LoginPage'; // Adjust the import path if necessary

describe('LoginForm', () => {
    test('renders the login form with username and password fields', () => {
        render(<LoginForm />);
    
        // Check if the username and password fields are present
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });
});  