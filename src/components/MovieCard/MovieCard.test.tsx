import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MovieCard from './MovieCard';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('MovieCard', () => {
    it('Show movie details', () => {
        render(
            <MemoryRouter>
            <MovieCard
                id='1'
                title='Inception'
                poster="https://example.com/inception.jpg"
                year='2018'
                rating={8.8}
                isFavourite={false}
                onFavourite={vi.fn()} />
                </MemoryRouter>

        );
        expect(
            screen.getByRole('img', { name: /inception poster/i })
        ).toBeInTheDocument();

        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('2018')).toBeInTheDocument();
       expect(screen.getByText('⭐ 8.8')).toBeInTheDocument();


    });

    it('calls onFavourite when favourite button is clicked', async () => {
        const onFavourite = vi.fn();
        const user = userEvent.setup();

        render(
            <MemoryRouter>
            <MovieCard
                id='1'
                title="Inception"
                poster="https://example.com/inception.jpg"
                year="2018"
                rating={8.8}
                isFavourite={false}
                onFavourite={onFavourite}
            />
            </MemoryRouter>
        );

        const button = screen.getByRole('button', {
            name: 'Add Inception to favourites',
        });

        await user.click(button);

        expect(onFavourite).toHaveBeenCalledTimes(1);
    })
})
