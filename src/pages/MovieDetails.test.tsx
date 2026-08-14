import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { MovieDetails } from './MovieDetails';
import { FavouriteProvider } from '../context/FavouriteContext';
import { getMovieDetails } from '../services/tmdb';

vi.mock('../services/tmdb', () => ({
  getMovieDetails: vi.fn(),
}));

function renderMovieDetails(path: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <FavouriteProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </MemoryRouter>
      </FavouriteProvider>
    </QueryClientProvider>
  );
}

afterEach(() => {
  vi.clearAllMocks();
});

describe('MovieDetails', () => {
  it('shows movie details for the given id', async () => {
    vi.mocked(getMovieDetails).mockResolvedValue({
      id: '1',
      title: 'Inception',
      poster: 'inception.jpg',
      year: '2010',
      rating: 8.8,
      overview: 'Dreams within dreams',
    });

    renderMovieDetails('/movie/1');

    expect(
      await screen.findByText('Inception')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Dreams within dreams')
    ).toBeInTheDocument();
  });

  it('shows error when movie details cannot be loaded', async () => {
    vi.mocked(getMovieDetails).mockRejectedValue(
      new Error('Movie details not found')
    );

    renderMovieDetails('/movie/999');

    expect(
      await screen.findByText('Error loading movie details')
    ).toBeInTheDocument();
  });

  it('adds movie to favourites when favourite button is clicked', async () => {
    vi.mocked(getMovieDetails).mockResolvedValue({
      id: '1',
      title: 'Inception',
      poster: 'inception.jpg',
      year: '2010',
      rating: 8.8,
      overview: 'Dreams within dreams',
    });

    const user = userEvent.setup();

    renderMovieDetails('/movie/1');

    const button = await screen.findByRole('button', {
      name: 'Add Inception to favourites',
    });

    await user.click(button);

    expect(
      screen.getByRole('button', {
        name: 'Remove from favourites',
      })
    ).toBeInTheDocument();
  });
});