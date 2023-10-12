import { useContext } from "react";
import { ApiContext } from "../../contexts/ApiContext";

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
        const extraQuery = "?fields=title,url,authors,year,venue,citationStyles,journal&limit=1";

        const apiUrl = `${researchApi}search${extraQuery}&query=`;
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
        const extraQuery = "?limit=1&fields=title,publisher,first_publish_year,author_name";
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
