import { useContext, useEffect, useState } from "react"
import MovieList from "../components/MovieList/MovieList"
import { FavouriteContext } from "../context/FavouriteContext"
import { useQuery } from "@tanstack/react-query"
import { searchMovies } from "../services/tmdb"


export function Search() {
    const [search, setSearch] = useState<string>('')
    const[debouncedSearch, setDebouncedSearch]= useState<string>('')

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
        queryKey: ['searchMovies',debouncedSearch],
        queryFn:()=> searchMovies(debouncedSearch),
        enabled:debouncedSearch.trim()!==''
    })

    return (
  <div>
    <input
      value={search}
      onChange={handleSearch}
      placeholder="Search movies..."
      className="border border-gray-300 rounded-md mb-4 px-3 py-2 w-80"
    />

    {isFetching && <p>Loading movies...</p>}

    {isError && <p>Error loading movies</p>}

    {search.trim() !== '' && !isFetching && !isError && (
      <div className="flex flex-wrap gap-4">
        <MovieList
          movies={movieData}
          favorites={favourites}
          onFavourite={handleFavourite}
        />
      </div>
    )}
  </div>
);

}