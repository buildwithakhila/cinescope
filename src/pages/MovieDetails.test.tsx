import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MovieDetails } from './MovieDetails';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { FavouriteProvider } from '../context/FavouriteContext';
import userEvent from '@testing-library/user-event';


describe('Movie details', () => {
    it('show movie details for the given id', () => {
        render(

            <FavouriteProvider>
                <MemoryRouter initialEntries={['/movie/1']}>
                    <Routes><Route path='/movie/:id' element={<MovieDetails />} /></Routes>

                </MemoryRouter>
            </FavouriteProvider>)
        expect(screen.getByText('Inception')).toBeInTheDocument()
    });

    it('no movie found', () => {
        render(

            <FavouriteProvider>
                <MemoryRouter initialEntries={['/movie/999']}>
                    <Routes><Route path='/movie/:id' element={<MovieDetails />} /></Routes>

                </MemoryRouter>
            </FavouriteProvider>)
        expect(screen.getByText('No Movie Found')).toBeInTheDocument()
    });

    it('adds movie to favourites when favourite button is clicked', async () => {
        const user = userEvent.setup();

        render(
            <FavouriteProvider>
                <MemoryRouter initialEntries={['/movie/1']}>
                    <Routes><Route path='/movie/:id' element={<MovieDetails />} /></Routes>

                </MemoryRouter>
            </FavouriteProvider>)
        const button = screen.getByRole('button', {
            name: 'Add Inception to favourites',
        });

        await user.click(button);
        expect(
            screen.getByRole('button', {
                name: 'Remove from favourites'
            })
        ).toBeInTheDocument();


    })
})