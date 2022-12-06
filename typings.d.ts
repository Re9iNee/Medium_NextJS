export interface Post {
    _id: string;
    _createdAt: string;
    title: string;
    description: string;
    mainImage: {
        asset: {
            url: string;
        };
    };
    slug: {
        current: string;
    };
    author: Author;
    body: object[];
}

interface Author {
    name: string;
    image: string;
}
