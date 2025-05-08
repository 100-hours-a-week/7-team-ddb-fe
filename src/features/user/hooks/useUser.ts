'use client';

import { useEffect, useState } from 'react';

import { getUser } from '../api';
import { User } from '../types';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return { user };
};
