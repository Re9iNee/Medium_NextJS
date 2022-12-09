import React, { ReactElement } from "react";

const CommentSection = (): ReactElement => {
    return (
        <form className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
            <h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
            <h4 className='text-3xl font-bold'>Leave a comment below!</h4>

            <hr className='py-3 mt-2' />

            <label className='block mb-5'>
                <span className='text-gray-700'>Name</span>
                <input
                    className='shadow border rounded px-3 py-2 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    type='text'
                    placeholder='Your Name...'
                />
            </label>
            <label className='block mb-5'>
                <span className='text-gray-700'>Email</span>
                <input
                    className='shadow border rounded px-3 py-2 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    type='email'
                    placeholder='123@example.com'
                />
            </label>
            <label className='block mb-5 '>
                <span className='text-gray-700'>Comment</span>
                <textarea
                    className='shadow border rounded  py-2 px-3 form-text-area mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    placeholder='Add Your Comment...'
                    rows={8}
                />
            </label>
        </form>
    );
};

export default CommentSection;
