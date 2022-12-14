import Image from "next/image";
import { ReactElement } from "react";

const Info = (): ReactElement => {
    return (
        <div className='flex justify-between items-center dark:bg-yellow-700 bg-yellow-400 border-y border-black py-10 lg:py-0'>
            <div className='px-10 space-y-5'>
                <h1 className='text-6xl max-w-xl font-serif'>
                    <span className='underline decoration-black decoration-4'>
                        Medium
                    </span>{" "}
                    is a place to write, read, and connect
                </h1>

                <h2>
                    It&apos;s easy and free to post your thinking on any topic
                    and connect with millions of readers.
                </h2>
            </div>

            <Image
                alt='logo'
                width={0}
                height={32}
                className='hidden md:inline-flex h-32 lg:h-full'
                src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'
            />
        </div>
    );
};

export default Info;
