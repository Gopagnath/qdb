import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  username: 'johndoe',
};

describe('Sidebar', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  test('fetches and displays user details', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    // Initially show loading spinner
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for user name to appear
    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });

    // Check email is displayed
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  test('shows error message if fetching user fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    // Wait for error text to appear
    await waitFor(() => {
      expect(screen.getByText(/failed to load user/i)).toBeInTheDocument();
    });
  });
});
