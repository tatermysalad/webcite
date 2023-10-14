/* eslint-disable react/prop-types */
import { useState } from "react";
import bookIcon from "../../assets/icons/book.png";
import paperIcon from "../../assets/icons/paper.png";
import websiteIcon from "../../assets/icons/website.png";
import formatReference from "./ReferenceFormatterComponent";

export default function ReferencesComponent({ references, selectedStyle, reference }) {
    const [copiedItems, setCopiedItems] = useState(Array(references.length).fill(false));

    const handleCopyClick = (index) => {
        const reference = references[index];
        const formattedString = formatReference(reference, selectedStyle);

        const tempElement = document.createElement("div");
        tempElement.innerHTML = formattedString;
        const textToCopy = tempElement.innerText;

        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                setCopiedItems((prevCopiedItems) => {
                    const updatedCopiedItems = [...prevCopiedItems];
                    updatedCopiedItems[index] = true;
                    return updatedCopiedItems;
                });

              
                setTimeout(() => {
                    setCopiedItems((prevCopiedItems) => {
                        const updatedCopiedItems = [...prevCopiedItems];
                        updatedCopiedItems[index] = false;
                        return updatedCopiedItems;
                    });
                }, 2000);
            })
            .catch((error) => {
                console.error("Failed to copy to clipboard: ", error);
            });
    };

    

    const handleRemoveClick = (index) => {
        const updatedReferences = [...references];
        updatedReferences.splice(index, 1);
        setCopiedItems((prevCopiedItems) => {
            const updatedCopiedItems = [...prevCopiedItems];
            updatedCopiedItems.splice(index, 1);
            return updatedCopiedItems;
        });
        localStorage.setItem("References", JSON.stringify(updatedReferences));
    };

    const getSourceIcon = (source) => {
        switch (source) {
            case "Book":
                return bookIcon;
            case "Research Paper":
                return paperIcon;
            case "Website":
                return websiteIcon;
            default:
                return null;
        }
    };
    const renderReferencingInfo = (reference) => {
        switch (selectedStyle) {
            case "Chicago":
                return (
                    /* Last Name, Initials. <i>Title</i>. Publisher. Year. */
                    <>
                        <p className="mx-0.5 mt-1 text-xs text-gray-800">
                            {reference.authorLast && `${reference.authorLast}, `}
                            {reference.authorFirst && `${reference.authorFirst[0]}. `}
                            {reference.authorInitial && `${reference.authorInitial}. `}
                            <i>{reference.title && `${reference.title}. `}</i>
                            {reference.publisher && `${reference.publisher}. `}
                            {reference.year && `${reference.year}. `}
                            {`${reference.websiteAddress}`}
                        </p>
                    </>
                );
            case "APA":
                return (
                    /* Last Name, First Initial. Middle Initial. (Year of Publication). Title of the book: Subtitle of the book. Publisher. */
                    <>
                        <p className="mt-1 text-xs text-gray-800">
                            {reference.authorLast && `${reference.authorLast}, `}
                            {reference.authorFirst && `${reference.authorFirst[0]}. `}
                            {reference.authorInitial && `${reference.authorInitial}. `}
                            {reference.year && `(${reference.year}). `}
                            {reference.title && `${reference.title}. `}
                            {reference.publisher && `${reference.publisher}. `}
                            {`${reference.websiteAddress}`}
                        </p>
                    </>
                );
            default:
                return (
                    /* Last Name, First Initial. Middle Initial. Title of the Book. Publisher, Year of Publication. */
                    <>
                        <p className="mt-1 text-xs text-gray-800">
                            {reference.authorLast && `${reference.authorLast}, `}
                            {reference.authorFirst && `${reference.authorFirst[0]}. `}
                            {reference.authorInitial && `${reference.authorInitial}. `}
                            {reference.publisher && `${reference.publisher}. `}
                            {reference.title && `${reference.title}. `}
                            {reference.year && `${reference.year}. `}
                            {`${reference.websiteAddress}`}
                        </p>
                    </>
                );
        }
    };
    return (
        <div>
            {references.map((reference, index) => (
                <li key={index} className="flex flex-wrap justify-center gap-x-6 py-5 mx-5">
                    <div className="flex min-w-0 gap-x-4 items-center">
                        <img className="h-12 w-12 flex-none rounded-lg" src={getSourceIcon(reference.source)} alt={reference.name} />
                        <div className="mx-0.5 min-w-0 flex-auto text-left">
                            {renderReferencingInfo(reference)}
                            <div className="flex items-center justify-center ">
                                <button
                                    onClick={() => handleRemoveClick(index)}
                                    className="m-1 mt-2 px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-md focus:outline-none hover:bg-red-600"
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={() => handleCopyClick(index)}
                                    className={`mr-20 m-1 mt-2 px-2 py-1 text-xs font-medium text-white bg-purple-500 rounded-md focus:outline-none hover:bg-purple-600 ${
                                        copiedItems[index] ? "cursor-not-allowed" : "cursor-pointer"
                                    }`}
                                    disabled={copiedItems[index]}
                                >
                                    {copiedItems[index] ? "Copied" : "Copy"}
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </div>
    );
}
