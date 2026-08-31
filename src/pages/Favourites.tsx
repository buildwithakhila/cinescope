import { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import MovieList from "../components/MovieList/MovieList";
import { FavouriteContext } from "../context/FavouriteContext";
import { getMovieDetails } from "../services/tmdb";

export function Favourites() {
    const context = useContext(FavouriteContext)
    if (!context)
        throw new Error('Use favorite context within favourite provider')

    const { favourites, handleFavourite } = context

    const favouriteQueries = useQueries({
        queries: favourites.map((id) => ({
            queryKey: ['movieDetails', id],
            queryFn: () => getMovieDetails(id),
        })),
    })

    const isLoading = favouriteQueries.some((query) => query.isLoading)
    const favouriteMovies = favouriteQueries
        .map((query) => query.data)
        .filter((movie) => movie !== undefined)

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Favourites</h1>

            {favourites.length === 0 ? (
                <p className="py-16 text-center text-gray-400">
                    You haven't favourited any movies yet — tap the heart on a movie to save it here.
                </p>
            ) : isLoading ? (
                <p className="py-16 text-center text-gray-500">Loading your favourites…</p>
            ) : (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <MovieList movies={favouriteMovies} favorites={favourites} onFavourite={handleFavourite} />
                </div>
            )}
        </div>
    )
}
