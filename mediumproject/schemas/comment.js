export default {
    name: "comment",
    title: "Comment",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
        },
        {
            name: "approved",
            type: "boolean",
            title: "Approved",
            description: "Comments won't show on the site without approval",
        },
        {
            name: "email",
            title: "Email",
            type: "string",
        },
        {
            name: "post",
            type: "reference",
            to: [{ type: "post" }],
        },
        {
            name: "comment",
            title: "Comment",
            type: "string",
        },
    ],
};
