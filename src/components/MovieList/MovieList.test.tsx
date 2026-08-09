import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MovieList from './MovieList';
import type { Movie } from '../../type/movie';

describe('MovieList', () => {
    const movieData: Movie[] = [
        {
            id: '1',
            title: 'Inception',
            poster: 'inception.jpg',
            year: '2010',
            rating: 8.8,
        },
        {
            id: '2',
            title: 'Interstellar',
            poster: 'interstellar.jpg',
            year: '2014',
            rating: 8.7,
        },
    ];
    it('All Movies are rendered', () => {
        render(
            <MovieList movies={movieData} favorites={[]} onFavourite={vi.fn()}
            />

        );


        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('Interstellar')).toBeInTheDocument();
    })
})