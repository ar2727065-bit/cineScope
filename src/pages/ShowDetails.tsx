import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Episode, Show } from "../types/show";

function ShowDetails() {
    const { id } = useParams();

    const [show, setShow] = useState<Show | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchShowDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const showResponse = await fetch(
                    `https://api.tvmaze.com/shows/${id}`
                );

                if (!showResponse.ok) {
                    throw new Error("Show not found");
                }

                const showData: Show =
                    await showResponse.json();

                setShow(showData);

                const episodesResponse = await fetch(
                    `https://api.tvmaze.com/shows/${id}/episodes`
                );

                if (!episodesResponse.ok) {
                    throw new Error("Failed to load episodes");
                }

                const episodesData: Episode[] =
                    await episodesResponse.json();

                setEpisodes(episodesData);

                // Check if this show is already a favorite
                const savedFavorites =
                    localStorage.getItem("favorites");

                if (savedFavorites) {
                    const favorites: Show[] =
                        JSON.parse(savedFavorites);

                    const alreadyFavorite = favorites.some(
                        (favorite) => favorite.id === showData.id
                    );

                    setIsFavorite(alreadyFavorite);
                }

            } catch (error) {
                setError("Failed to load show details.");
            } finally {
                setLoading(false);
            }
        };

        fetchShowDetails();
    }, [id]);

    const toggleFavorite = () => {
        if (!show) return;

        const savedFavorites =
            localStorage.getItem("favorites");

        const favorites: Show[] = savedFavorites
            ? JSON.parse(savedFavorites)
            : [];

        if (isFavorite) {
            const updatedFavorites = favorites.filter(
                (favorite) => favorite.id !== show.id
            );

            localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
            );

            setIsFavorite(false);
        } else {
            const updatedFavorites = [
                ...favorites,
                show
            ];

            localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
            );

            setIsFavorite(true);
        }
    };

    if (loading) {
        return (
            <main className="container">
                <p>Loading show...</p>
            </main>
        );
    }

    if (error || !show) {
        return (
            <main className="container">
                <p className="error-message">
                    {error || "Show not found."}
                </p>

                <Link to="/">
                    ← Back to Home
                </Link>
            </main>
        );
    }

    return (
        <main className="container">
            <Link to="/" className="back-link">
                ← Back to Home
            </Link>

            <section className="show-details">
                <div className="show-details-image">
                    {show.image ? (
                        <img
                            src={
                                show.image.original ??
                                show.image.medium ??
                                ""
                            }
                            alt={show.name}
                        />
                    ) : (
                        <div className="no-image">
                            No image
                        </div>
                    )}
                </div>

                <div className="show-details-info">
                    <h1>{show.name}</h1>

                    <p className="rating">
                        ⭐ {show.rating.average ?? "N/A"}
                    </p>

                    <div className="genres">
                        {show.genres.map((genre) => (
                            <span key={genre}>
                                {genre}
                            </span>
                        ))}
                    </div>

                    <p className="summary">
                        {show.summary
                            ? show.summary.replace(
                                  /<[^>]*>/g,
                                  ""
                              )
                            : "No summary available."}
                    </p>

                    <button
                        className="favorite-button"
                        onClick={toggleFavorite}
                    >
                        {isFavorite
                            ? "💔 Remove from Favorites"
                            : "❤️ Add to Favorites"}
                    </button>
                </div>
            </section>

            <section className="episodes-section">
                <h2>Episodes</h2>

                {episodes.length === 0 ? (
                    <p>No episodes found.</p>
                ) : (
                    <div className="episode-list">
                        {episodes.map((episode) => (
                            <div
                                className="episode-card"
                                key={episode.id}
                            >
                                <div>
                                    <h3>
                                        S
                                        {String(
                                            episode.season
                                        ).padStart(2, "0")}
                                        E
                                        {String(
                                            episode.number
                                        ).padStart(2, "0")}{" "}
                                        {episode.name}
                                    </h3>

                                    <p>
                                        {episode.airdate}
                                        {" • "}
                                        {episode.runtime ??
                                            "?"}{" "}
                                        min
                                    </p>

                                    <p>
                                        {episode.summary
                                            ? episode.summary.replace(
                                                  /<[^>]*>/g,
                                                  ""
                                              )
                                            : "No summary available."}
                                    </p>
                                </div>

                                {episode.image?.medium && (
                                    <img
                                        src={
                                            episode.image.medium
                                        }
                                        alt={episode.name}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default ShowDetails;