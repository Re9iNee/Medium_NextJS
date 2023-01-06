import Image from "next/image";
import Link from "next/link";
import mediumLogo from "../public/icons/logo.png";

function Header() {
    return (
        <header className='flex justify-between p-5 max-w-7xl mx-auto'>
            <div className='flex items-center space-x-5'>
                <Link href='/'>
                    <Image
                        src={mediumLogo}
                        alt='Medium Logo'
                        className='w-44 object-contain cursor-pointer'
                    />
                </Link>
                <div className='hidden md:inline-flex items-center space-x-5'>
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3 className='text-white bg-green-800 px-4 py-1 rounded-full'>
                        Follow
                    </h3>
                </div>
            </div>
            <div className='flex items-center space-x-5 dark:text-green-400 text-green-800'>
                <h3>Sign In</h3>
                <h3 className='border px-4 py-1 rounded-full dark:border-green-400 border-green-800'>
                    Get Started
                </h3>
            </div>
        </header>
    );
}

export default Header;
