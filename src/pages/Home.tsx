import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ShowGrid from "../components/ShowGrid";

function Home() {
    const [search, setSearch] = useState("");

    return (
        <main className="container">
            <h1>Discover Your Next Show</h1>

            <p className="subtitle">
                Search thousands of TV shows with CineScope.
            </p>

            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <ShowGrid search={search} />
        </main>
    );
}

export default Home;