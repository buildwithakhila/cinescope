import { useParams } from "react-router-dom"
import { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";
import { Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../services/tmdb";

export function MovieDetails() {
    const { id } = useParams();

    const {data:movie,isLoading,isError} = useQuery({
        queryKey: ['movieDetails',id],
        queryFn: ()=>getMovieDetails(id!),
        enabled:!!id
    }
    )
    
    if(isLoading){
        return(<p>Loading movie details</p>)
    }
    if(isError){
        return(<p>Error loading movie details</p>)
    }
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
            <p>{movie.overview}</p>
            <p>⭐ {movie.rating}</p>
            <button aria-label={isFavourite ? 'Remove from favourites' : `Add ${movie.title} to favourites`} onClick={() => handleFavourite(movie.id)}><Heart color={isFavourite ? 'red' : 'black'} fill={isFavourite ? 'red' : 'none'} /></button>
        </div>)
}

