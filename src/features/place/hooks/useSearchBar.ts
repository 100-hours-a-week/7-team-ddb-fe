'use client';

import { useState } from 'react';
import { z } from 'zod';

import { searchSchema } from '../utils';

import { usePlaceToast } from '.';

export function useSearchBar(initialQuery = '') {
  const { showToast } = usePlaceToast();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [helperText, setHelperText] = useState('');

  const validateSearch = (query: string) => {
    try {
      const validatedData = searchSchema.parse({ query });
      setHelperText('');
      return validatedData.query.trim();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.errors[0].message;
        setHelperText(message);
        showToast(message);
      }
      return null;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (helperText) {
      setHelperText('');
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    validateSearch,
    handleInputChange,
  };
}
