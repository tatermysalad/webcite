/* eslint-disable react/prop-types */
import React from "react";


export default function ResearchPaperComponent({ searchResults }) {
    return (
        <>
            {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((item, index) => (
                        <li key={index}>
                            <strong>Title:</strong> {item.title}
                            <br />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
