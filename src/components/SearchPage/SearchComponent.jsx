import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../contexts/ApiContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import useApiSearch from "../ApiSearch/ApiFunctionComponent";

export default function SearchComponent() {
    // eslint-disable-next-line no-unused-vars
    const { websiteApi, setWebsiteApi, researchApi, setResearchApi, bookApi, setBookApi } = useContext(ApiContext);
    const { searchBook, searchResearchPaper, searchWebsite } = useApiSearch();

    const [localStorage, setLocalStorage] = useLocalStorage("References", []);

    const [selectedReferenceType, setSelectedReferenceType] = useState("Website");
    const [searchQuery, setSearchQuery] = useState("");

    // if api returns one result
    const [searchResult, setSearchResult] = useState([]);
    // if api returns multiple and requires processing
    const [searchResults, setSearchResults] = useState([]);

    const [searchFilter, setSearchFilter] = useState("title");

    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        authorLast: "",
        authorFirst: "",
        authorInitial: "",
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
        e.preventDefault();
        setLoading(true);
        if (searchQuery !== "") {
            if (selectedReferenceType === "Book") {
                let responseData = await searchBook(searchQuery);
                console.log(`book data is loaded:`);
                console.log(responseData.docs);
                setSearchResults(responseData.docs);
            } else if (selectedReferenceType === "Research Paper") {
                let responseData = await searchResearchPaper(searchQuery);
                console.log(`research paper data is loaded:`);
                console.log(responseData.data.slice(0, 3));
                setSearchResults(responseData.data.slice(0, 3));
            } else if (selectedReferenceType === "Website") {
                let responseData = await searchWebsite(searchQuery, searchFilter);
                console.log(`website data is loaded:`);
                console.log(responseData);
                setSearchResult(responseData);
            }
        } else {
            alert("Please enter some data to search");
        }
        setLoading(false);
    };

    useEffect(() => {
        console.log(`trying to load data`);
        if (selectedReferenceType === "Website" && searchResult && typeof searchResult.title === "string") {
            const titleParts = searchResult.title.split("|");
            setFormData({
                title: titleParts[0] || "",
                authorLast: "",
                authorFirst: "",
                authorInitial: "",
                websiteAddress: searchResult.url || "",
                publisher: titleParts.length > 1 ? titleParts[1].trim() : "",
                year: "",
                source: selectedReferenceType,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResult]);

    useEffect(() => {
        console.log(`trying to load data`);
        if (selectedReferenceType === "Research Paper" && searchResults) {
            const result = searchResults[0];
            console.log(result);
            setFormData({
                title: result["title"],
                authorLast: result["authors"][0]["name"].split(" ").pop(),
                authorFirst: result["authors"][0]["name"].split(" ")[0][0],
                authorInitial: "",
                websiteAddress: result["url"],
                publisher: result["journal"]["name"],
                year: result["year"],
                source: selectedReferenceType,
            });
            console.log(formData);
        } else if (selectedReferenceType === "Book" && searchResults) {
            const result = searchResults[0];
            console.log(result);
            setFormData({
                title: result["title"],
                authorLast: result["author_name"][0].split(" ").pop(),
                authorFirst: result["author_name"][0].split(" ")[0],
                authorInitial: "",
                websiteAddress: "",
                publisher: result["publisher"][0],
                year: result["first_publish_year"],
                source: selectedReferenceType,
            });
            console.log(formData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchResults]);

    useEffect(() => {
        formData["source"] = selectedReferenceType;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedReferenceType]);

    const initialFormData = {
        title: "",
        authorLast: "",
        authorFirst: "",
        authorInitial: "",
        websiteAddress: "",
        publisher: "",
        year: "",
        source: selectedReferenceType,
    };
    const handleSave = () => {
        addObject(formData);
        setFormData(initialFormData);
        setIsSaved(true);

        setTimeout(() => {
            setIsSaved(false);
        }, 10000);
    };

    return (
        <div id="searchComponent">
            <form className="flex items-center justify-center">
                <div className="w-1/2">
                    <div className="border-b border-gray-200 pb-8">
                        <h2 className="text-lg font-semibold text-gray-900">Let me cite that for you:</h2>
                        <div>
                            <div className="mt-4">
                                <label htmlFor="referenceType" className="block text-sm font-medium leading-6 text-gray-900">
                                    What is your reference type?
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
                                <label htmlFor="searchQuery" className="block text-sm font-medium leading-6 text-gray-900">
                                    {selectedReferenceType === "Website"
                                        ? "Enter the URL of the website you used here"
                                        : "Enter your search term here"}
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
                        </div>
                    </div>
                </div>
            </form>
            <form className="flex items-center justify-center">
                <div className="space-y-12 w-3/5 h-auto content-center">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="m-2 text-base font-semibold leading-7 text-gray-900">Reference</h2>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="">
                                <label htmlFor="authorFirst" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="authorFirst"
                                    name="authorFirst"
                                    className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={formData.authorFirst}
                                    onChange={handleFormDataChange}
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="authorInitial" className="block text-sm font-medium leading-6 text-gray-900">
                                    Initials
                                </label>
                                <div className="">
                                    <input
                                        type="text"
                                        id="authorInitial"
                                        name="authorInitial"
                                        className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.authorInitial}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="authorLast" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="">
                                    <input
                                        type="text"
                                        id="authorLast"
                                        name="authorLast"
                                        className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.authorLast}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <div className="">
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.title}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="publisher" className="block text-sm font-medium leading-6 text-gray-900">
                                    Publisher
                                </label>
                                <div className="">
                                    <input
                                        type="text"
                                        id="publisher"
                                        name="publisher"
                                        className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.publisher}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                                    Year
                                </label>
                                <div className="">
                                    <input
                                        type="text"
                                        id="year"
                                        name="year"
                                        className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.year}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="websiteAddress" className="block text-sm font-medium leading-6 text-gray-900">
                                    Website Address
                                </label>
                                <div className="">
                                    <input
                                        type="text"
                                        id="websiteAddress"
                                        name="websiteAddress"
                                        className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={formData.websiteAddress}
                                        onChange={handleFormDataChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-center gap-x-6">
                            <button
                                type="button"
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                                onClick={() => setFormData(initialFormData)}
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                        {isSaved ? <div className="text-green-600 mt-2">Reference saved successfully!</div> : <></>}
                    </div>
                </div>
            </form>
        </div>
    );
}
