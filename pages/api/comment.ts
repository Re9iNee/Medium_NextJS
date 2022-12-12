import { sanityClient } from "@sanityConfig";
import { CommentModel } from "@types";
import { NextApiRequest, NextApiResponse } from "next";

export default function CommentsHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "POST":
            createComment(req, res);
            break;
        case "GET":
            res.status(200).json({ name: "I never believed" });

            break;
        default:
            res.status(405).json({ message: "Method not Allowed" });
    }
}

async function createComment(req: NextApiRequest, res: NextApiResponse) {
    const requestBody: CommentModel = JSON.parse(req.body);
    const { _id, ...restOfBody } = requestBody;

    try {
        await sanityClient.create({
            _type: "comment",
            post: {
                _type: "reference",
                _ref: _id,
            },
            ...restOfBody,
        });
    } catch (e) {
        return res.status(500).json({ message: "Couldn't submit comment", e });
    }

    return res.status(200).json({ message: "Comment Submitted" });
}
