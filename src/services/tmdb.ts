import { TMDB_READ_TOKEN } from "../config/env";
import type { Movie } from "../type/movie";

type TMDBMovie = {
    id: number,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: number
}

type TMDBMoviesResponse = {
    results: TMDBMovie[]
}

export async function getPopularMovies(): Promise<Movie[]> {

    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: { Authorization: `Bearer ${TMDB_READ_TOKEN}` }
    })

    const movies: TMDBMoviesResponse = await response.json()
    if (!response.ok)
        throw new Error('failed API fetch movies')

    const popularMovies: Movie[] = movies.results.map((result) => ({
        id: result.id.toString(),
        title: result.title,
        poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        year: result.release_date.split('-')[0],
        rating: result.vote_average
    }))

    return popularMovies

}