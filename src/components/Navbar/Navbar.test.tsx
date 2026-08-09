import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {
    it('shows all navigation links', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(
            screen.getByRole('link', { name: 'Home' })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('link', { name: 'Search' })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('link', { name: 'Favourites' })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('link', { name: 'Profile' })
        ).toBeInTheDocument();
    });
});