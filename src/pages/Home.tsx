import { useContext, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import { FavouriteContext } from "../context/FavouriteContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services/tmdb";
import { Button } from "../components/Button/Button";


export function Home() {
    const [page, setPage] = useState<number>(1)

    function handlePageNext() {
        setPage((prev) => prev + 1);
    }
    function handlePagePrev() {
        setPage((prev) => prev - 1);
    }

    const context = useContext(FavouriteContext)
    if (!context) {
        throw new Error('FavouriteContext must be used inside FavouriteProvider');
    }

    const { favourites, handleFavourite } = context;

    const { data = [], isPending, isFetching, isError } = useQuery({
        queryKey: ['popularMovies', page],
        queryFn: () => getPopularMovies(page),
        placeholderData: keepPreviousData
    });


    if (isPending)
        return (<p className="py-16 text-center text-gray-500">Loading movies…</p>)
    if (isError)
        return (<p className="py-16 text-center text-red-600">Error loading movies</p>)

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Popular this week</h1>
                {isFetching && <span className="text-sm text-gray-400">Loading next page…</span>}
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <MovieList movies={data} favorites={favourites} onFavourite={handleFavourite} />
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
                <Button label='Previous' variant='secondary' onClick={handlePagePrev} disabled={page === 1} />
                <span className="text-sm font-semibold text-gray-500">Page {page}</span>
                <Button label='Next' variant='secondary' onClick={handlePageNext} />
            </div>
        </div>

    )
}
