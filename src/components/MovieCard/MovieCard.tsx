type MovieCardProps = {
    title: string,
    poster: string,
    year: string,
    rating: number
}
const MovieCard = ({ title, poster, year, rating }: MovieCardProps) => {
    return (
        <div className="w-64 rounded-xl overflow-hidden bg-white shadow-md">
            <img
                className="w-full h-96 object-cover"
                src={poster}
                alt={`${title} poster`}
            />

            <div className="p-3">
                <p className="font-bold">{title}</p>

                <div className="flex justify-between">
                    <p>{year}</p>
                    <p>⭐ {rating}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard