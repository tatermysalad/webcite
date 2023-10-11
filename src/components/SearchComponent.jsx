import { useContext, useState } from "react";
import { ApiContext } from "../contexts/ApiContext";
import useLocalStorage from "../hooks/useLocalStorage";

export default function SearchComponent() {
    // eslint-disable-next-line no-unused-vars
    const { websiteApi, setWebsiteApi, researchApi, setResearchApi, bookApi, setBookApi } = useContext(ApiContext);

    const [localStorage, setLocalStorage] = useLocalStorage("References", []);

    const [selectedReferenceType, setSelectedReferenceType] = useState("Website");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState({});
    const [searchFilter, setSearchFilter] = useState("title");

    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        websiteAddress: "",
        publisher: "",
        year: "",
        source: selectedReferenceType,
    });

    const handleFormDataChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addObject = (newData) => {
        const newArray = [...localStorage];
        newArray.push(newData);
        setLocalStorage(newArray);
    };

    const handleReferenceTypeChange = (e) => {
        setSelectedReferenceType(e.target.value);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        console.log("searching!");
        e.preventDefault();
        setLoading(true);
        let apiUrl = "";
        let headersApi = {}; // Initialize an empty object for headers

        if (selectedReferenceType === "Website") {
            apiUrl = `${websiteApi}?q=`;
            headersApi = {
                "X-Linkpreview-Api-Key": import.meta.env.VITE_WEBSITE_API_KEY,
            };
        } else if (selectedReferenceType === "Research Paper") {
            apiUrl = `${researchApi}search/bulk?query=`;
        } else if (selectedReferenceType === "Book") {
            apiUrl = `${bookApi}search.json?q=`;

            if (searchFilter === "title") {
                apiUrl = `${bookApi}search.json?title=`;
            } else if (searchFilter === "author") {
                apiUrl = `${bookApi}search.json?author=`;
            }

        }

        if (searchQuery !== "") {
            const requestOptions = {
                method: "GET", 
                headers: headersApi, 
                mode: "cors",
            };
            let searchQ = searchQuery.replace(/ /g, "%20");
            console.log(apiUrl + searchQ, requestOptions);
            let response = await fetch(apiUrl + searchQ, requestOptions);

            let responseData = await response.json();
            console.log(responseData);
            setSearchResults(responseData);
        }

        if (searchResults) {
            const { title, author, url, publisher, year } = searchResults;
            setFormData({
                title,
                author,
                websiteAddress: url,
                publisher,
                year,
                source: selectedReferenceType,
            });
        } else {
            alert("Please enter some data to search");
        }
        setLoading(false)
    };

    const handleSave = () => {
        addObject(formData);
    };
    return (
        <div id="searchComponent">
            <form className="flex items-center justify-center">
                <div className="w-1/2">
                    <div className="border-b border-gray-200 pb-8">
                        <h2 className="text-lg font-semibold text-gray-900">Search for Reference</h2>
                        <div>
                            <div className="mt-4">
                                <label htmlFor="referenceType" className="block text-sm font-medium text-gray-900">
                                    Reference Type
                                </label>
                                <select
                                    id="referenceType"
                                    name="referenceType"
                                    className="block w-full rounded-md border border-gray-300 py-2 text-gray-900"
                                    value={selectedReferenceType}
                                    onChange={handleReferenceTypeChange}
                                >
                                    <option value="Website">Website</option>
                                    <option value="Research Paper">Research Paper</option>
                                    <option value="Book">Book</option>
                                </select>
                            </div>
                            <div className="mt-4">
                                <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-900">
                                    Search for your reference here:
                                </label>
                                <div className="mt-4 flex items-center">
                                    {selectedReferenceType === "Book" && (
                                        <div className="w-20 mr-1">
                                            <select
                                                id="searchFilter"
                                                name="searchFilter"
                                                className="block w-full rounded-md border border-gray-300 py-2 text-gray-900"
                                                value={searchFilter}
                                                onChange={(e) => setSearchFilter(e.target.value)}
                                            >
                                                <option value="title">Title</option>
                                                <option value="author">Author</option>
                                            </select>
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        id="searchQuery"
                                        name="searchQuery"
                                        className="block w-full rounded-md border border-gray-300 py-2 text-gray-900 p-2"
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSearch}
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded rounded-md bg-indigo-600 text-sm font-semibold text-white px-3 py-2 hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-600"
                            >
                                {loading ? "Loading..." : "Search"}
                            </button>
                            {/* Display search results here */}
                            <div className="mt-4">
                                {formData.source === "Website" && (
                                    <ul>
                                        {Object.keys(searchResults).map((key, index) => (
                                            <li key={index}>
                                                <strong>{key}:</strong> {searchResults[key]}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {formData.source === "Research Paper" && (
                                    <ul>
                                        {searchResults.data.slice(0, 5).map((result, index) => (
                                            <li key={index}>
                                                <strong>Title:</strong> {result.title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {formData.source === "Book" && searchResults.data && (
                                    <ul>
                                        
                                        {// eslint-disable-next-line no-unused-vars
                                            searchResults.data.slice(0, 5).map((book, index) => (
                                            <li key={book.key}>
                                                <strong>Title:</strong> {book.title}
                                                <br />
                                                <strong>Author:</strong> {book.contributor ? book.contributor.join(", ") : "N/A"}
                                                <br />
                                                <strong>Publisher:</strong> {book.publisher ? book.publisher.join(", ") : "N/A"}
                                                <br />
                                                <strong>Year:</strong> {book.publish_date ? book.publish_date[0] : "N/A"}
                                                <br />
                                                <strong>ISBN:</strong> {book.isbn ? book.isbn.join(", ") : "N/A"}
                                                <br />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <form className="flex items-center justify-center">
                <div className="space-y-12 w-3/6 h-auto content-center">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Top Result</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600"></p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="mt-2">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.title}
                                    onChange={handleFormDataChange}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="author" className="block text-sm font-medium leading-6 text-gray-900">
                                    Author
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="author"
                                        name="author"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.author}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="websiteAddress" className="block text-sm font-medium leading-6 text-gray-900">
                                    Website Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="websiteAddress"
                                        name="websiteAddress"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.websiteAddress}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="publisher" className="block text-sm font-medium leading-6 text-gray-900">
                                    Publisher
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="publisher"
                                        name="publisher"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.publisher}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                                    Year
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        id="year"
                                        name="year"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.year}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
