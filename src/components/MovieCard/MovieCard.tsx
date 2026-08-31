import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
type MovieCardProps = {
    id: string,
    title: string,
    poster: string,
    year: string,
    rating: number
    isFavourite: boolean
    onFavourite: () => void
}
const MovieCard = ({ id, title, poster, year, rating, isFavourite, onFavourite }: MovieCardProps) => {
    return (
        <div className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-lg">
            <Link to={`/movie/${id}`} className="block aspect-[2/3] w-full overflow-hidden bg-gray-100">
                <img
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={poster}
                    alt={`${title} poster`}
                />
            </Link>

            <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <Link
                        to={`/movie/${id}`}
                        className="line-clamp-1 text-sm font-semibold text-gray-900 hover:text-red-600"
                        title={title}
                    >
                        {title}
                    </Link>
                    <button
                        type="button"
                        onClick={onFavourite}
                        className="shrink-0 rounded-full p-1 hover:bg-gray-100"
                        aria-label={isFavourite ? 'Remove from favourites' : `Add ${title} to favourites`}
                    >
                        <Heart
                            size={18}
                            color={isFavourite ? '#dc2626' : '#9ca3af'}
                            fill={isFavourite ? '#dc2626' : 'none'}
                        />
                    </button>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs text-gray-500">
                    <span>{year}</span>
                    <span className="flex items-center gap-1 font-semibold text-amber-600">⭐ {rating}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard
