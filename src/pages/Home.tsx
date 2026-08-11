import { useContext } from "react";
import MovieList from "../components/MovieList/MovieList";
import { FavouriteContext } from "../context/FavouriteContext";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services/tmdb";


export function Home() {

    const context = useContext(FavouriteContext)
    if (!context) {
        throw new Error('FavouriteContext must be used inside FavouriteProvider');
    }

    const { favourites, handleFavourite } = context;

    const { data, isPending, isError } = useQuery({
        queryKey: ['popularMovies'],
        queryFn: getPopularMovies,
    });

    if (isPending)
        return (<p>Waiting</p>)

    if (isError)
        return (<p>Error loading Movies</p>)

    return (
        <div className="flex gap-4">
            <MovieList movies={data} favorites={favourites} onFavourite={handleFavourite} />
        </div>

    )
}

