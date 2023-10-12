/* eslint-disable react/prop-types */
import React from "react";


export default function WebsiteComponent({ searchResults }) {
    return (
        <>
            {Object.keys(searchResults).length > 0 && (
                <ul>
                    {Object.keys(searchResults).map((key, index) => (
                        <li key={index}>
                            <strong>{key}:</strong> {searchResults[key]}
                            <br/>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
