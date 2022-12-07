import Header from "@components/Header";
import { sanityClient } from "@sanityConfig";
import { Post } from "@types";
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from "next";

type Props = {
    post: Post;
};
const Post = ({ post }: Props) => {
    console.log(post);

    return (
        <main>
            <Header />
        </main>
    );
};

export default Post;

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
    // Fetch All Posts
    const query = `//groq
    *[_type == "post"]{
        _id,
        slug {
            current
        }
    }
    `;

    const posts = await sanityClient.fetch(query);
    // paths = [{ params: { slug: "my-first-post" } }, ...];
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }));

    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `//groq
        *[_type == "post" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            author-> {
                name,
                image
            },
            description,
            mainImage,
            slug,
            body
        }
    `;

    const post = await sanityClient.fetch(query, { slug: params?.slug });

    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: { post },
        // enables ISR
        revalidate: 60, // after 60 seconds, it will update the old cache
    };
};
