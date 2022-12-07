import { ReactNode } from "react";
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

export default serializers;
