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

// We use this for form module
export interface CommentFormInputs {
    name: string;
    email: string;
    comment: string;
}

// Model => we send this data to back
export interface CommentModel extends CommentFormInputs {
    _id: string;
}
