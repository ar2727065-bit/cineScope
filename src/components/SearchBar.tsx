interface SearchBarProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ search, setSearch }: SearchBarProps) {

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        console.log("Searching for:", search);
    };

    const handleClear = () => {
        setSearch("");
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <label htmlFor="show-search">
                Search shows
            </label>

            <div className="search-bar__row">
                <input
                    id="show-search"
                    type="text"
                    placeholder="Search for a show..."
                    value={search}
                    onChange={handleChange}
                />

                <button type="submit">
                    Search
                </button>

                <button type="button" onClick={handleClear}>
                    Clear
                </button>
            </div>
        </form>
    );
}

export default SearchBar;