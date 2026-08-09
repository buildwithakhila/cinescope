import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MovieList from './MovieList';
import type { Movie } from '../../type/movie';
import userEvent from '@testing-library/user-event';

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
    });
    it('onclick of button', async () => {
        const onClick = vi.fn()
        render(<MovieList movies={movieData} favorites={[]} onFavourite={onClick}
        />)
        const user = userEvent.setup()
        const button = screen.getByRole('button', {
            name: 'Add Interstellar to favourites',
        });
        await user.click(button)
        expect(onClick).toHaveBeenCalledWith('2');
    });

    it('shows empty state when there are no movies', () => {
        render(
            <MovieList
                movies={[]}
                favorites={[]}
                onFavourite={vi.fn()}
            />
        );

        expect(screen.getByText('No movies found')).toBeInTheDocument();
    });
})