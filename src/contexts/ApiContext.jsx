import { createContext, useState } from "react";

const ResearchUrl = "https://api.semanticscholar.org/graph/v1/paper/";
const BookUrl = "https://openlibrary.org/";
const WebsiteUrl = "https://api.linkpreview.net/";

export const ApiContext = createContext(null);

export default function ApiProvider({ children }) {
    const [researchUrl, setResearchUrl] = useState(ResearchUrl);
    const [bookUrl, setBookUrl] = useState(BookUrl);
    const [websiteUrl, setWebsiteUrl] = useState(WebsiteUrl);

    return (
        <ApiContext.Provider
            value={{
                researchApi: researchUrl,
                setResearchApi: setResearchUrl,
                bookApi: bookUrl,
                setBookApi: setBookUrl,
                websiteApi: websiteUrl,
                setWebsiteApi: setWebsiteUrl,
            }}>
            {children}
        </ApiContext.Provider>
    );
}
