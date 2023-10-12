import { useState, useEffect } from "react";
import ReferencesComponent from "./ReferencesComponent";

export default function StackedList() {
    // const [localStorage, setLocalStorage] = useLocalStorage("References", null);
    const [references, setReferences] = useState([]);
    const [copiedItems, setCopiedItems] = useState([]);

    const getReferencesFromLocalStorage = () => {
        const storedValue = localStorage.getItem("References");
        const references = storedValue ? JSON.parse(storedValue) : null;
        setReferences(references);
    };

    useEffect(() => {
        // Initial retrieval of references
        getReferencesFromLocalStorage();

        // Set up a timer to periodically check for changes in local storage
        const refreshInterval = setInterval(() => {
            getReferencesFromLocalStorage();
        }, 500); // Adjust the interval as needed (e.g., every 10 seconds)

        // Clear the interval when the component unmounts
        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    const handleCopyAllClick = () => {
        const allItemsText = JSON.stringify(references, null, 4);
        navigator.clipboard.writeText(allItemsText);
        setCopiedItems(Array(references.length).fill(true));
    };

    return (
        <div id="stackedList">
            <div className="flex items-center justify-center">
                {references && (
                    <ul role="list" className="divide-y divide-gray-100">
                        <ReferencesComponent references={references} />
                    </ul>
                )}
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
