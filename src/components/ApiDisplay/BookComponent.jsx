/* eslint-disable react/prop-types */
import React from "react";


export default function BookComponent({ searchResults }) {
    return (
        <>
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((item, index) => (
                        <li key={index}>
                            <strong>Title:</strong> {item.title}
                            <br />
                            <strong>Author:</strong> {item.author ? item.author.join(", ") : "N/A"}
                            <br />
                            <strong>Publisher:</strong> {item.publisher ? item.publisher.join(", ") : "N/A"}
                            <br />
                            <strong>Year:</strong> {item.publish_date ? item.publish_date[0] : "N/A"}
                            <br />
                            <strong>ISBN:</strong> {item.isbn ? item.isbn.join(", ") : "N/A"}
                            <br />
                            <br />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
