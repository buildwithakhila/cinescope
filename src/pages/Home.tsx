import { useState } from "react";
import type { Movie } from "../type/movie";
import MovieList from "../components/MovieList/MovieList";

const movieData: Movie[] = [
    {
        id: '1',
        title: 'Inception',
        poster: 'https://www.movieposters.com/cdn/shop/files/inception.mpw.123395_9e0000d1-bc7f-400a-b488-15fa9e60a10c.jpg?v=1762975399&width=1680',
        year: '2010',
        rating: 8.8
    }, {
        id: '2',
        title: 'Interstellar',
        poster: 'https://www.movieposters.com/cdn/shop/files/interstellar-139399.jpg?v=1762974876&width=1680',
        year: '2014',
        rating: 8.7
    }
]

const noMovies: Movie[] = [

]
export function Home() {
    const [favourites, setFavourites] = useState<string[]>([])

    function handleFavourite(id: string): void {

        setFavourites((prev) => {
            const isFavourite = prev.some((existing) => (existing === id))
            if (isFavourite) {
                return prev.filter((existing) => (existing !== id))
            } else
                return [...prev, id]
        })


    }

    return (
        <div className="flex gap-4">
            <MovieList movies={noMovies} favorites={favourites} onFavourite={handleFavourite} />
        </div>

    )
}

