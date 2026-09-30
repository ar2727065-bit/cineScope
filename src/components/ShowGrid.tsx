import { useEffect, useState } from "react";
import type { Show, ShowSearchResult } from "../types/show";
import ShowCard from "./ShowCard";

interface ShowGridProps {
    search: string;
}

function ShowGrid({ search }: ShowGridProps) {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchShows = async () => {
            if (!search.trim()) {
                setShows([]);
                return;
            }

            setLoading(true);

            const response = await fetch(
                `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(search)}`
            );

            const data: ShowSearchResult[] =
                await response.json();

            const extractedShows = data.map(
                (result) => result.show
            );

            setShows(extractedShows);
            setLoading(false);
        };

        fetchShows();
    }, [search]);

    if (loading) {
        return <p>Searching...</p>;
    }

    if (search && shows.length === 0) {
        return <p>No shows found.</p>;
    }

    return (
        <div className="show-grid">
            {shows.map((show) => (
             <ShowCard
              key={show.id}
              id={show.id}
              title={show.name}
              rating={show.rating.average ?? 0}
              genre={show.genres.join(", ")}
              image={show.image?.medium ?? null}
               />
            ))}
        </div>
    );
}

export default ShowGrid;