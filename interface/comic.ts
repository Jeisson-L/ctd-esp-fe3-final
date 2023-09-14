
export interface Data {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comic[];
}

export interface Comic {
    id: string;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: null | string;
    modified: string;
    isbn: string;
    upc: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: TextObject[];
    resourceURI: string;
    urls: URL[];
    series: Series;
    variants: Series[];
    collections: any[];
    collectedIssues: Series[];
    dates: DateElement[];
    prices: Price[];
    price: number;
    oldPrice: number;
    stock: number;
    thumbnail: Thumbnail;
    images: Thumbnail[];
    creators: Creators;
    characters: Characters;
    stories: Stories;
    events: Characters;
}

export interface Character {
    id: number
    name: string
    description: null | string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: Characters
    series: Series;
    stories: Stories;
    events: Characters;
    urls: URL[];
}

export interface Characters {
    available: number;
    collectionURI: string;
    items: Series[];
    returned: number;
}

export interface Series {
    resourceURI: string;
    name: string;
}

export interface Creators {
    available: number;
    collectionURI: string;
    items: CreatorsItem[];
    returned: number;
}

export interface CreatorsItem {
    resourceURI: string;
    name: string;
    role: string;
}

export interface DateElement {
    date: string;
}

export interface Thumbnail {
    path: string;
    extension: string;
}

export interface Price {
    price: number;
}



export interface Stories {
    available: number;
    collectionURI: string;
    items: StoriesItem[];
    returned: number;
}

export interface StoriesItem {
    resourceURI: string;
    name: string;
}

export interface TextObject {
    type: string;
    language: string;
    text: string;
}

export interface URL {
    type: string;
    url: string;
}