import CommentList from "@components/CommentList";
import CommentSection from "@components/CommentSection";
import Header from "@components/Header";
import HorizontalDivider from "@components/HorizontalDivider";
import { sanityClient, urlFor } from "@sanityConfig";
import { Post } from "@types";
import { GetStaticPathsResult, GetStaticProps } from "next";
import Image from "next/image";
import { ReactNode } from "react";
import PortableText from "react-portable-text";

// This is a helper object to override how we want PortableText to render different elements
const serializers = {
    h1: (props: object[]) => (
        <h1 className='text-2xl font-bold my-5' {...props} />
    ),
    h2: (props: object[]) => (
        <h2 className='text-xl font-bold my-5' {...props} />
    ),
    li: ({ children }: { children: ReactNode }) => (
        <li className='ml-4 list-disc'>{children}</li>
    ),
    link: ({ href, children }: { href: string; children: ReactNode }) => (
        <a href={href} className='tex-blue-500 hover:underline'>
            {children}
        </a>
    ),
};

type Props = {
    post: Post;
};
const Post = ({ post }: Props) => {
    return (
        <main>
            <Header />

            <div className='w-full h-40 relative'>
                <Image
                    fill
                    alt='post main image'
                    className='object-cover'
                    src={urlFor(post.mainImage).url()}
                />
            </div>

            <article className='max-w-3xl mx-auto p-5'>
                <h1 className='text-3xl mt-10 mb-3'>{post.title}</h1>
                <h2 className='text-xl font-light text-gray-500 mb-2'>
                    {post.description}
                </h2>

                <div className='flex items-center space-x-2'>
                    <Image
                        width={10}
                        height={10}
                        alt='author image'
                        className='h-10 w-10 rounded-full'
                        src={urlFor(post.author.image).url()}
                    />

                    <p className='font-extralight text-sm'>
                        Blog post by{" "}
                        <span className='text-green-600'>
                            {post.author.name}
                        </span>{" "}
                        - Published at{" "}
                        {new Date(post._createdAt).toLocaleString()}
                    </p>
                </div>

                <div>
                    {post.body && (
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
                    )}
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
