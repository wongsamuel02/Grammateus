import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './pages/LoginForm'; // Adjust the import path if necessary

describe('LoginForm', () => {
    test('renders the login form with email and password fields', () => {
        render(<LoginForm />);
    
        // Check if the email and password fields are present
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    });
});  