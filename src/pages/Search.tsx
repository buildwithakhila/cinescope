import { useContext, useState } from "react"
import { movieData } from "../data/movies"
import MovieList from "../components/MovieList/MovieList"
import { FavouriteContext } from "../context/FavouriteContext"

export function Search() {
    const [search, setSearch] = useState<string>('')

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    const context = useContext(FavouriteContext)

    if (!context)
        throw new Error('FavouriteContext must be used inside FavouriteProvider')

    const { favourites, handleFavourite } = context
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