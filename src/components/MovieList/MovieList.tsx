import type { Movie } from "../../type/movie"
import MovieCard from "../MovieCard/MovieCard"

type MovieListProps = {
    movies: Movie[]
    favorites: string[]
    onFavourite(id: string): void
}
const MovieList = ({ movies, favorites, onFavourite }: MovieListProps) => {
    if (movies.length === 0) {
        return (<p className="text-red-700">No movies found</p>)
    }
    else {
        return (
            movies.map((movie) => (<MovieCard
                key={movie.id}
                title={movie.title}
                poster={movie.poster}
                year={movie.year}
                rating={movie.rating}
                isFavourite={favorites.some((existing) => (existing === movie.id))}
                onFavourite={() => onFavourite(movie.id)}

            />))
        )
    }

}

export default MovieList