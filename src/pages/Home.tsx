import { useContext, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import { FavouriteContext } from "../context/FavouriteContext";
import { keepPreviousData,useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services/tmdb";
import { Button } from "../components/Button/Button";


export function Home() {
    const[page,setPage]=useState<number>(1)

    function handlePageNext(){
        setPage((prev)=>prev+1);
    }
     function handlePagePrev(){
        setPage((prev)=>prev-1);
    }

    const context = useContext(FavouriteContext)
    if (!context) {
        throw new Error('FavouriteContext must be used inside FavouriteProvider');
    }

    const { favourites, handleFavourite } = context;

    const { data=[], isPending, isFetching, isError } = useQuery({
        queryKey: ['popularMovies',page],
        queryFn: ()=>getPopularMovies(page),
        placeholderData:keepPreviousData
    });


    if(isPending)
        return(<p>Loading Movies...</p>)
    if (isError)
        return (<p>Error Loading Movies</p>)

    return (
        <div>
        <div className="flex flex-wrap gap-4">
           {isFetching && <p>Loading next page...</p>}
            <MovieList movies={data} favorites={favourites} onFavourite={handleFavourite} />
        </div>
        <Button label = 'Previous' variant ='secondary' onClick={handlePagePrev} disabled = {page===1}/>
        <Button label = 'Next' variant ='secondary' onClick={handlePageNext}/>
        </div>

    )
}

