import { urlFor } from "@sanityConfig";
import { Post } from "@types";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";

type Props = {
    posts: Post[];
};

const Posts = ({ posts }: Props): ReactElement => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
            {posts.map((post) => (
                <Link key={post._id} href={`/post/${post.slug.current}`}>
                    <div className='border rounded-lg group cursor-pointer overflow-hidden'>
                        <picture>
                            <img
                                className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                                src={urlFor(post.mainImage).url()}
                                alt=''
                            />
                        </picture>
                        <div className='flex justify-between p-5 gap-5 flex-nowrap'>
                            <div>
                                <p className='text-lg font-bold'>
                                    {post.title}
                                </p>
                                <p className='text-xs'>
                                    {post.description} by {post.author.name}
                                </p>
                            </div>

                            <Image
                                width={0}
                                height={0}
                                sizes='100vw'
                                className='w-12 h-12 rounded-full'
                                src={urlFor(post.author.image).url()}
                                alt=''
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Posts;
