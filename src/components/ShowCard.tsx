import { Link } from "react-router-dom";

interface ShowCardProps {
    id: number;
    title: string;
    rating: number;
    genre: string;
    image: string | null;
}

function ShowCard({
    id,
    title,
    rating,
    genre,
    image
}: ShowCardProps) {
    return (
        <div className="show-card">
            {image ? (
                <img src={image} alt={title} />
            ) : (
                <div className="no-image">
                    No image
                </div>
            )}

            <div className="show-card-content">
                <h2>{title}</h2>

                <p>⭐ {rating}</p>

                <p>{genre || "Genre unavailable"}</p>

                <Link
                    to={`/show/${id}`}
                    className="details-button"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default ShowCard;