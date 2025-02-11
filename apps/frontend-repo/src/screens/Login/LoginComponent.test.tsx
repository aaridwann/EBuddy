 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

import LoginPage from './LoginComponent';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  connectAuthEmulator: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

const mockLoginGoogle = jest.fn(() => Promise.resolve());

describe('LoginPage Component', () => {
  it('should render login form correctly', () => {
    render(<LoginPage loginGoogle={mockLoginGoogle} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login with google/i)).toBeInTheDocument();
  });

  it('should handle input change', () => {
    render(<LoginPage loginGoogle={mockLoginGoogle} />);

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('should handle email/password login successfully', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({});
    
    render(<LoginPage loginGoogle={mockLoginGoogle} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getAllByText('Login')[1]);

    await waitFor(() => expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, 'test@example.com', 'password123'));
    await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/'));
  });

  it('should display error when email/password login fails', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<LoginPage loginGoogle={mockLoginGoogle} />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getAllByText('Login')[1]);

    await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument());
  });

  it('should handle Google login successfully', async () => {
    render(<LoginPage loginGoogle={mockLoginGoogle} />);

    fireEvent.click(screen.getByText(/login with google/i));

    await waitFor(() => expect(mockLoginGoogle).toHaveBeenCalled());
    await waitFor(() => expect(useRouter().push).toHaveBeenCalledWith('/'));
  });

  //   it('should display error when Google login fails', async () => {
  //     const mockLoginGoogle = jest.fn().mockRejectedValue(new Error('Google login failed'));

  //     render(<LoginPage loginGoogle={mockLoginGoogle} />);

  //     fireEvent.click(screen.getByText(/login with google/i));

//     await waitFor(() => expect(screen.getByText(/Something error, please try again later./i)).toBeInTheDocument());
//   });
});
