import { useContext } from "react";
import MovieList from "../components/MovieList/MovieList";
import { movieData } from "../data/movies";
import { FavouriteContext } from "../context/FavouriteContext";


export function Home() {

    const context = useContext(FavouriteContext)
    if (!context) {
        throw new Error('FavouriteContext must be used inside FavouriteProvider');
    }

    const { favourites, handleFavourite } = context;

    return (
        <div className="flex gap-4">
            <MovieList movies={movieData} favorites={favourites} onFavourite={handleFavourite} />
        </div>

    )
}

