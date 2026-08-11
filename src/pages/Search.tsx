import { useContext, useState } from "react"
import MovieList from "../components/MovieList/MovieList"
import { FavouriteContext } from "../context/FavouriteContext"
import { useQuery } from "@tanstack/react-query"
import { getPopularMovies } from "../services/tmdb"

export function Search() {
    const [search, setSearch] = useState<string>('')

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    const context = useContext(FavouriteContext)

    if (!context)
        throw new Error('FavouriteContext must be used inside FavouriteProvider')

    const { favourites, handleFavourite } = context

    const { data: movieData = [], isPending, isError } = useQuery({
        queryKey: ['popularMovies'],
        queryFn: getPopularMovies
    })

    if (isPending)
        return (<p>Loading Movies...</p>)
    if (isError)
        return (<p>Error Loading Movies</p>)
    return (
        <div >
            <input value={search} onChange={handleSearch} placeholder="Search movies..." className="border border-gray-300 rounded-md mb-4 px-3 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-red-500" />
            <div className="flex gap-4">
                <MovieList movies={movieData.filter((existing) => (
                    existing.title.toLowerCase().includes(search.toLowerCase())
                ))} favorites={favourites} onFavourite={handleFavourite} />
            </div>

        </div>
    )

}