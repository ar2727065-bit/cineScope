import { useState } from "react";

function MovieSearch() {
    const [search, setSearch] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Searching for:", search);
    };

    const clearSearch = () => {
        setSearch("");
    };

    return (
        <form
            className="search-box"
            onSubmit={handleSubmit}
        >
            <label htmlFor="movie-search">
                Search for a show
            </label>

            <input
                id="movie-search"
                type="text"
                placeholder="e.g. Breaking Bad"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">
                Search
            </button>

            <button
                type="button"
                onClick={clearSearch}
            >
                Clear
            </button>

            <p>
                Current search: <strong>{search || "Nothing yet"}</strong>
            </p>
        </form>
    );
}

export default MovieSearch;