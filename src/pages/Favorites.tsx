import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Show } from "../types/show";

function Favorites() {
    const [favorites, setFavorites] = useState<Show[]>([]);

    useEffect(() => {
        const savedFavorites =
            localStorage.getItem("favorites");

        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const removeFavorite = (id: number) => {
        const updatedFavorites = favorites.filter(
            (favorite) => favorite.id !== id
        );

        setFavorites(updatedFavorites);

        localStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        );
    };

    return (
        <main className="container">
            <Link to="/" className="back-link">
                ← Back to Home
            </Link>

            <h1>My Favorites ❤️</h1>

            {favorites.length === 0 ? (
                <div className="empty-state">
                    <p>
                        You haven't added any favorite shows yet.
                    </p>

                    <Link to="/">
                        Discover Shows
                    </Link>
                </div>
            ) : (
                <div className="show-grid">
                    {favorites.map((show) => (
                        <div
                            className="show-card"
                            key={show.id}
                        >
                            {show.image?.medium ? (
                                <img
                                    src={show.image.medium}
                                    alt={show.name}
                                />
                            ) : (
                                <div className="no-image">
                                    No image
                                </div>
                            )}

                            <div className="show-card-content">
                                <h2>{show.name}</h2>

                                <p>
                                    ⭐{" "}
                                    {show.rating.average ??
                                        "N/A"}
                                </p>

                                <p>
                                    {show.genres.join(", ") ||
                                        "Genre unavailable"}
                                </p>

                                <div className="favorite-actions">
                                    <Link
                                        to={`/show/${show.id}`}
                                        className="details-button"
                                    >
                                        View Details
                                    </Link>

                                    <button
                                        onClick={() =>
                                            removeFavorite(
                                                show.id
                                            )
                                        }
                                        className="remove-button"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Favorites;