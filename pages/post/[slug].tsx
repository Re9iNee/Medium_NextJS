import CommentList from "@components/CommentList";
import CommentSection from "@components/CommentSection";
import Header from "@components/Header";
import HorizontalDivider from "@components/HorizontalDivider";
import { sanityClient, urlFor } from "@sanityConfig";
import { Post } from "@types";
import { GetStaticPathsResult, GetStaticProps } from "next";
import Image from "next/image";
import PortableText from "react-portable-text";
import serializers from "./serializerObject";

type Props = {
    post: Post;
};
const Post = ({ post }: Props) => {
    console.log(post);

    return (
        <main>
            <Header />

            <picture>
                <Image
                    alt=''
                    width={0}
                    height={0}
                    className='w-full h-40 object-cover'
                    src={urlFor(post.mainImage).url()}
                />
            </picture>

            <article className='max-w-3xl mx-auto p-5'>
                <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
                <h2 className='text-xl font-light text-gray-500 mb-2'>
                    {post.description}
                </h2>

                <div className='flex items-center space-x-2'>
                    <Image
                        alt=''
                        width={0}
                        height={0}
                        className='h-10 w-10 rounded-full'
                        src={urlFor(post.author.image).url()}
                    />

                    <p className='font-extralight text-sm'>
                        Blog post by
                        <span className='text-green-600'>
                            {post.author.name}
                        </span>
                        - Published at
                        {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>

                <div>
                    <div className='mt-10'>
                        <PortableText
                            serializers={serializers}
                            projectId={
                                process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
                            }
                            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                            content={post.body}
                        />
                    </div>
                </div>
            </article>

            <HorizontalDivider />

            <CommentSection postId={post._id} />

            <CommentList comments={post.comments} />
        </main>
    );
};

export default Post;

// to use ISR - we gotta get all slugs and paths to the posts in order to cache them.
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
            "comments": *[
            _type == "comment" &&
            post._ref == ^._id && 
            approved == true
            ],
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
