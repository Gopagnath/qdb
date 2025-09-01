import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types';

/**
 * Custom hook to fetch a random user between 1-10
 * Called once when the component mounts
 */
export const useUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchUser = async () => {
      try {
        const userId = Math.floor(Math.random() * 10) + 1;
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users/${userId}`,
          { signal }
        );
        setUser(response.data);
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled', error.message);
        } else {
          console.error('Error fetching user:', error.message);
        }
      }
    };

    fetchUser();

    // Cleanup to avoid memory leaks
    return () => controller.abort();
  }, []);

  return user;
};