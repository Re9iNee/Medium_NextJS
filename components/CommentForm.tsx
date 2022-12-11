import { CommentFormInputs } from "@types";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";

type Props = {
    onSubmit: (data: CommentFormInputs) => void;
};

const CommentForm = ({ onSubmit }: Props): ReactElement => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CommentFormInputs>();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col p-5 max-w-2xl mx-auto mb-10'
        >
            <h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
            <h4 className='text-3xl font-bold'>Leave a comment below!</h4>

            <hr className='py-3 mt-2' />

            <label className='block mb-5'>
                <span className='text-gray-700'>Name</span>
                <input
                    {...register("name", { required: true })}
                    className='shadow border rounded px-3 py-2 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    type='text'
                    placeholder='Your Name...'
                />
            </label>
            <label className='block mb-5'>
                <span className='text-gray-700'>Email</span>
                <input
                    {...register("email", { required: true })}
                    className='shadow border rounded px-3 py-2 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    type='email'
                    placeholder='123@example.com'
                />
            </label>
            <label className='block mb-5'>
                <span className='text-gray-700'>Comment</span>
                <textarea
                    {...register("comment", { required: true })}
                    className='shadow border rounded  py-2 px-3 form-text-area mt-1 block w-full ring-yellow-500 outline-none focus:ring'
                    placeholder='Add Your Comment...'
                    rows={8}
                />
            </label>

            <div className='flex flex-col p-5'>
                {errors.name && (
                    <span className='text-red-500'>
                        - The Name Field is required
                    </span>
                )}
                {errors.comment && (
                    <span className='text-red-500'>
                        - The Comment Field is required
                    </span>
                )}
                {errors.email && (
                    <span className='text-red-500'>
                        - The Email Field is required
                    </span>
                )}
            </div>

            <input
                type='submit'
                className='bg-yellow-500 rounded hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white px-4 cursor-pointer font-bold py-2'
            />
        </form>
    );
};

export default CommentForm;
