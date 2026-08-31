import { useParams } from "react-router-dom"
import { useContext } from "react";
import { FavouriteContext } from "../context/FavouriteContext";
import { Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../services/tmdb";

export function MovieDetails() {
    const { id } = useParams();

    const { data: movie, isLoading, isError } = useQuery({
        queryKey: ['movieDetails', id],
        queryFn: () => getMovieDetails(id!),
        enabled: !!id
    }
    )

    if (isLoading) {
        return (<p className="py-16 text-center text-gray-500">Loading movie details…</p>)
    }
    if (isError) {
        return (<p className="py-16 text-center text-red-600">Error loading movie details</p>)
    }
    if (!movie) {
        return (<p className="py-16 text-center text-gray-500">No movie found</p>)
    }

    const context = useContext(FavouriteContext)
    if (!context)
        throw new Error('use context within provider')

    const { favourites, handleFavourite } = context;
    const isFavourite = favourites.includes(movie.id)
    return (
        <div className="flex flex-col gap-8 sm:flex-row">
            <img
                className="w-full max-w-xs shrink-0 rounded-xl object-cover shadow-sm ring-1 ring-gray-200 sm:w-64"
                src={movie.poster}
                alt={`${movie.title} poster`}
            />
            <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">{movie.title}</h1>
                    <button
                        aria-label={isFavourite ? 'Remove from favourites' : `Add ${movie.title} to favourites`}
                        onClick={() => handleFavourite(movie.id)}
                        className="shrink-0 rounded-full p-2 hover:bg-gray-100"
                    >
                        <Heart color={isFavourite ? '#dc2626' : '#9ca3af'} fill={isFavourite ? '#dc2626' : 'none'} />
                    </button>
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <span>{movie.year}</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-600">⭐ {movie.rating}</span>
                </div>
                <p className="mt-6 leading-relaxed text-gray-700">{movie.overview}</p>
            </div>
        </div>)
}
