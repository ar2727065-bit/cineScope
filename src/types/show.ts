export interface Show {
    id: number;
    name: string;

    rating: {
        average: number | null;
    };

    genres: string[];

    image: {
        medium: string | null;
        original: string | null;
    } | null;

    summary: string | null;
}

export interface ShowSearchResult {
    score: number;
    show: Show;
}

export interface Episode {
    id: number;
    name: string;
    season: number;
    number: number;
    airdate: string;
    runtime: number | null;
    summary: string | null;
    image: {
        medium: string | null;
        original: string | null;
    } | null;
}