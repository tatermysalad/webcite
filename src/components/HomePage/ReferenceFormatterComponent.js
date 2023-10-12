export default function formatReference(reference, selectedStyle) {
    switch (selectedStyle) {
        case "Chicago":
            return [
                reference.authorLast && `${reference.authorLast}, `,
                reference.authorFirst && `${reference.authorFirst[0]}. `,
                reference.authorInitial && `${reference.authorInitial}. `,
                reference.title && `<i>${reference.title}. </i>`,
                reference.publisher && `${reference.publisher}. `,
                reference.year && `${reference.year}. `,
                reference.websiteAddress,
            ]
                .filter(Boolean)
                .join("");
        case "APA":
            return [
                reference.authorLast && `${reference.authorLast}, `,
                reference.authorFirst && `${reference.authorFirst[0]}. `,
                reference.authorInitial && `${reference.authorInitial}. `,
                reference.year && `(${reference.year}). `,
                reference.title && `${reference.title}. `,
                reference.publisher && `${reference.publisher}. `,
                reference.websiteAddress,
            ]
                .filter(Boolean)
                .join("");
        default:
            return [
                reference.authorLast && `${reference.authorLast}, `,
                reference.authorFirst && `${reference.authorFirst[0]}. `,
                reference.authorInitial && `${reference.authorInitial}. `,
                reference.publisher && `${reference.publisher}. `,
                reference.title && `${reference.title}. `,
                reference.year && `${reference.year}. `,
                reference.websiteAddress,
            ]
                .filter(Boolean)
                .join("");
    }
};
