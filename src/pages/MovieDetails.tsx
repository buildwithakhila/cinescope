import { useParams } from "react-router-dom"
import { movieData } from "../data/movies";
import { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";
import { Heart } from "lucide-react";

export function MovieDetails() {
    const { id } = useParams();
    const movie = movieData.find((movie) => movie.id === id)
    if (!movie) {
        return (<p>No Movie Found</p>)
    }
    const context = useContext(FavouriteContext)
    if (!context)
        throw new Error('use context within provider')

    const { favourites, handleFavourite } = context;
    const isFavourite = favourites.includes(movie.id)
    return (
        <div>
            Movie Details
            <img
                src={movie.poster}
                alt={`${movie.title} poster`}
            />
            <p>{movie.title}</p>
            <p>{movie.year}</p>
            <p>⭐ {movie.rating}</p>
            <button aria-label={isFavourite ? 'Remove from favourites' : `Add ${movie.title} to favourites`} onClick={() => handleFavourite(movie.id)}><Heart color={isFavourite ? 'red' : 'black'} fill={isFavourite ? 'red' : 'none'} /></button>
        </div>)
}

