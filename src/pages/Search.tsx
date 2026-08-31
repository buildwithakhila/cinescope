import { useContext, useEffect, useState } from "react"
import MovieList from "../components/MovieList/MovieList"
import { FavouriteContext } from "../context/FavouriteContext"
import { useQuery } from "@tanstack/react-query"
import { searchMovies } from "../services/tmdb"


export function Search() {
    const [search, setSearch] = useState<string>('')
    const [debouncedSearch, setDebouncedSearch] = useState<string>('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 800);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    const context = useContext(FavouriteContext)

    if (!context)
        throw new Error('FavouriteContext must be used inside FavouriteProvider')

    const { favourites, handleFavourite } = context

    const { data: movieData = [], isFetching, isError } = useQuery({
        queryKey: ['searchMovies', debouncedSearch],
        queryFn: () => searchMovies(debouncedSearch),
        enabled: debouncedSearch.trim() !== ''
    })

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-gray-900">Search</h1>

            <input
                value={search}
                onChange={handleSearch}
                placeholder="Search movies..."
                className="mb-8 w-full max-w-md rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm shadow-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

            {isFetching && <p className="text-gray-500">Loading movies…</p>}

            {isError && <p className="text-red-600">Error loading movies</p>}

            {search.trim() !== '' && !isFetching && !isError && (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <MovieList
                        movies={movieData}
                        favorites={favourites}
                        onFavourite={handleFavourite}
                    />
                </div>
            )}

            {search.trim() === '' && (
                <p className="py-16 text-center text-gray-400">Start typing to search for a movie.</p>
            )}
        </div>
    );

}
