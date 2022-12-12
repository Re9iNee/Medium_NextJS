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
    comments: Comment[];
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

// This is exactly what we receive from database
export interface Comment extends CommentModel {
    approved: boolean;
    post: {
        _ref: string;
        _type: string;
    };
    _createdAt: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}
