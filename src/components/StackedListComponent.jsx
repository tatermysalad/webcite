import React, { useState } from "react";

const references = [
    {
        author: "Author 1",
        title: "Title of Reference 1",
        publishDate: "2023-10-10",
        publisher: "Publisher 1",
        url: "website.com",
        imageUrl: "/src/assets/icons/book.png",
    },
    {
        author: "Author 2",
        title: "Title of Reference 2",
        publishDate: "2023-10-11",
        publisher: "Publisher 2",
        url: "website.com",
        imageUrl: "/src/assets/icons/paper.png",
    },
    {
        author: "Author 3",
        title: "Title of Reference 1",
        publishDate: "2023-10-10",
        publisher: "Publisher 1",
        url: "website.com",
        imageUrl: "/src/assets/icons/book.png",
    },
    {
        author: "Author 4",
        title: "Title of Reference 2",
        publishDate: "2023-10-11",
        publisher: "Publisher 2",
        url: "website.com",
        imageUrl: "/src/assets/icons/website.png",
    },
];

export default function StackedList() {
    const [copiedItems, setCopiedItems] = useState(Array(references.length).fill(false));

    const handleCopyClick = (index) => {
        navigator.clipboard.writeText(JSON.stringify(references[index], null, 4));
        setCopiedItems((prevCopiedItems) => {
            const updatedCopiedItems = [...prevCopiedItems];
            updatedCopiedItems[index] = true;
            return updatedCopiedItems;
        });
    };

    const handleCopyAllClick = () => {
        const allItemsText = JSON.stringify(references, null, 4);
        navigator.clipboard.writeText(allItemsText);
        setCopiedItems(Array(references.length).fill(true));
    };

    return (
        <div id="stackedList">
            <div className="flex items-center justify-center">
                <ul role="list" className="divide-y divide-gray-100">
                    {references.map((reference, index) => (
                        <li key={index} className="flex flex-wrap justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4 items-center">
                                <img className="h-12 w-12 flex-none rounded-lg" src={reference.imageUrl} alt={reference.name} />
                                <div className="min-w-0 flex-auto">
                                    <p className="mt-1 text-xs font-semibold text-gray-900">{`Title: ${reference.title}`}</p>
                                    <p className="mt-1 text-xs text-gray-500">{`Author/ Publisher: ${reference.author} / ${reference.publisher}`}</p>
                                    <p className="mt-1 text-xs text-gray-500">{`Access from / URL: ${reference.url}`}</p>
                                    <p className="mt-1 text-xs text-gray-500">{`Published: ${reference.publishDate}`}</p>
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
                </ul>
            </div>
            <div className="text-center mt-4">
                <button
                    onClick={handleCopyAllClick}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md focus:outline-none hover:bg-purple-600"
                >
                    Copy All
                </button>
            </div>
        </div>
    );
}
