import { Heart } from 'lucide-react';

type MovieCardProps = {
    title: string,
    poster: string,
    year: string,
    rating: number
    isFavourite: boolean
    onFavourite: () => void
}
const MovieCard = ({ title, poster, year, rating, isFavourite, onFavourite }: MovieCardProps) => {
    return (
        <div className="w-64 rounded-xl overflow-hidden bg-white shadow-md">
            <img
                className="w-full h-96 object-cover"
                src={poster}
                alt={`${title} poster`}
            />

            <div className="p-3">
                <div className="flex justify-between">
                    <p className="font-bold">{title}</p>
                    <button
                        type="button"
                        onClick={onFavourite}
                        aria-label={isFavourite ? 'Remove from favourites' : `Add ${title} to favourites`}
                    >
                        <Heart
                            color={isFavourite ? 'red' : 'black'}
                            fill={isFavourite ? 'red' : 'none'}
                        />
                    </button>
                </div>
                <div className="flex justify-between">
                    <p>{year}</p>
                    <p>⭐ {rating}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard