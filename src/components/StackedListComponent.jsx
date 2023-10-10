import React from "react";

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
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
