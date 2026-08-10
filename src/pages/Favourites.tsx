import { useContext } from "react";
import MovieList from "../components/MovieList/MovieList";
import { movieData } from "../data/movies";
import { FavouriteContext } from "../context/FavouriteContext";

export function Favourites() {
    const context = useContext(FavouriteContext)
    if (!context)
        throw new Error('Use favorite context within favourite provider')

    const { favourites, handleFavourite } = context
    return (
        <div className="flex gap-4">
            <MovieList movies={movieData.filter((existing) => favourites.includes(existing.id))} favorites={favourites} onFavourite={handleFavourite} />
        </div>)
} 