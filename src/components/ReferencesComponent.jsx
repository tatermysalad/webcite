/* eslint-disable react/prop-types */
import { useState } from "react";
import bookIcon from "../assets/icons/book.png";
import paperIcon from "../assets/icons/paper.png";
import websiteIcon from "../assets/icons/website.png";

export default function ReferencesComponent({ references }) {
    const [copiedItems, setCopiedItems] = useState(Array(references.length).fill(false));

    const handleCopyClick = (index) => {
        navigator.clipboard.writeText(JSON.stringify(references[index], null, 4));
        setCopiedItems((prevCopiedItems) => {
            const updatedCopiedItems = [...prevCopiedItems];
            updatedCopiedItems[index] = true;
            return updatedCopiedItems;
        });
    };

    const handleRemoveClick = (index) => {
        // Create a copy of the references array without the item to be removed
        const updatedReferences = [...references];
        updatedReferences.splice(index, 1);

        // Update the state
        setCopiedItems((prevCopiedItems) => {
            const updatedCopiedItems = [...prevCopiedItems];
            updatedCopiedItems.splice(index, 1);
            return updatedCopiedItems;
        });

        // Save the updated references array in local storage
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

    return (
        <div>
            {references.map((reference, index) => (
                <li key={index} className="flex flex-wrap justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4 items-center">
                        <img className="h-12 w-12 flex-none rounded-lg" src={getSourceIcon(reference.source)} alt={reference.name} />
                        <div className="min-w-0 flex-auto">
                            <p className="mt-1 text-xs font-semibold text-gray-900">{`Title: ${reference.title}`}</p>
                            <p className="mt-1 text-xs text-gray-500">{`Author/ Publisher: ${reference.author} / ${reference.publisher}`}</p>
                            <p className="mt-1 text-xs text-gray-500">{`Access from / URL: ${reference.url}`}</p>
                            <p className="mt-1 text-xs text-gray-500">{`Published: ${reference.publishDate}`}</p>
                            <button
                                onClick={() => handleRemoveClick(index)}
                                className="mt-2 px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-md focus:outline-none hover:bg-red-600"
                            >
                                Remove
                            </button>
                            <button
                                onClick={() => handleCopyClick(index)}
                                className={`mt-2 px-2 py-1 text-xs font-medium text-white bg-purple-500 rounded-md focus:outline-none hover:bg-purple-600 ${
                                    copiedItems[index] ? "cursor-not-allowed" : "cursor-pointer"
                                }`}
                                disabled={copiedItems[index]}
                            >
                                {copiedItems[index] ? "Copied" : "Copy"}
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </div>
    );
}
