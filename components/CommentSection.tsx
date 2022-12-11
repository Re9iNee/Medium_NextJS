import { CommentFormInputs, CommentModel } from "@types";
import { ReactElement, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import CommentForm from "./CommentForm";

type Props = {
    postId: string;
};

const CommentSection = ({ postId }: Props): ReactElement => {
    const [submitted, setSubmitted] = useState(false);

    const onSubmit: SubmitHandler<CommentFormInputs> = async (formValues) => {
        const values: CommentModel = {
            _id: postId,
            ...formValues,
        };

        await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify(values),
        }).then(() => {
            setSubmitted(true);
        });
    };

    return (
        <>
            {submitted ? (
                <div className='flex flex-col py-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto text-center'>
                    <h3 className='text-3xl font-bold'>
                        Thank your for submitting your comment!
                    </h3>
                    <p>Once it has been approved, it will appear bellow</p>
                </div>
            ) : (
                <CommentForm onSubmit={onSubmit} />
            )}
        </>
    );
};

export default CommentSection;
