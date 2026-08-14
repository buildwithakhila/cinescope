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

type TMDBMovieDetails={
     id: number,
    title: string,
    poster_path: string,
    release_date: string,
    vote_average: number
    overview:string
}

type MovieDetails= Movie & {overview:string}

export async function getPopularMovies(): Promise<Movie[]> {

    const response = await fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: { Authorization: `Bearer ${TMDB_READ_TOKEN}` }
    })

    if (!response.ok)
        throw new Error('failed API fetch movies')

    const movies: TMDBMoviesResponse = await response.json()

    const popularMovies: Movie[] = movies.results.map((result) => ({
        id: result.id.toString(),
        title: result.title,
        poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
        year: result.release_date.split('-')[0],
        rating: result.vote_average
    }))

    return popularMovies

}

export async function searchMovies(search:string):Promise<Movie[]>{

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}`,{
        headers:{
            Authorization:`Bearer ${TMDB_READ_TOKEN}`
        }
    })
    if(!response.ok)
        throw new Error('error in searching movie')

    const data :TMDBMoviesResponse= await response.json()

    const searchResults:Movie[]= data.results.map((movie)=>(
        {
        id: movie.id.toString(),
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        year: movie.release_date.split('-')[0],
        rating: movie.vote_average
        }
    ))
return searchResults

}

export async function getMovieDetails(id:string):Promise<MovieDetails>{

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`,{
        headers:{
            Authorization:`Bearer ${TMDB_READ_TOKEN}`
        }
    })
    if(!response.ok)
        throw new Error('Movie details not found')
    const data : TMDBMovieDetails =await response.json()

    return {
        id: data.id.toString(),
        title: data.title,
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        year: data.release_date.split('-')[0],
        rating: data.vote_average,
        overview:data.overview
    }

}