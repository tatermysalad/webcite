import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";

export default function useApiSearch() {
    const { websiteApi, researchApi, bookApi } = useContext(ApiContext);

    const searchWebsite = async (searchQuery) => {
        const apiUrl = `${websiteApi}?q=`;
        const headersApi = {
            "X-Linkpreview-Api-Key": import.meta.env.VITE_WEBSITE_API_KEY,
        };
        const requestOptions = {
            method: "GET",
            headers: headersApi,
            mode: "cors",
        };
        const searchQ = searchQuery.replace(/ /g, "%20");
        const response = await fetch(apiUrl + searchQ, requestOptions);
        const responseData = await response.json();
        return responseData;
    };
    const searchResearchPaper = async (searchQuery) => {
        const apiUrl = `${researchApi}search/bulk?query=`;
        const requestOptions = {
            method: "GET",
            mode: "cors",
        };
        const searchQ = searchQuery.replace(/ /g, "%20");
        const response = await fetch(apiUrl + searchQ, requestOptions);
        const responseData = await response.json();
        return responseData;
    };

    // Function to search for a Book reference
    const searchBook = async (searchQuery, searchFilter) => {
        const extraQuery = "?limit=3&fields=title,publisher,isbn,publish_year";
        let apiUrl = `${bookApi}search.json${extraQuery}&q=`;
        if (searchFilter === "title") {
            apiUrl = `${bookApi}search.json${extraQuery}&title=`;
        } else if (searchFilter === "author") {
            apiUrl = `${bookApi}search.json${extraQuery}&author=`;
        }

        const requestOptions = {
            method: "GET",
            mode: "cors",
        };
        const searchQ = searchQuery.replace(/ /g, "%20");
        const response = await fetch(apiUrl + searchQ, requestOptions);
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    };
    return {
        searchBook,
        searchResearchPaper,
        searchWebsite,
    };
}
