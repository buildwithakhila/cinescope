import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MovieCard from './MovieCard';

describe('MovieCard', () => {
    it('Show movie details', () => {
        render(
            <MovieCard title='Inception' poster="https://example.com/inception.jpg" year='2018' rating={8.8} />

        );

        expect(
            screen.getByRole('img', { name: /inception poster/i })
        ).toBeInTheDocument();

        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('2010')).toBeInTheDocument();
        expect(screen.getByText('8.8')).toBeInTheDocument();


    });
});