import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    const [value, setValue] = useState(initial);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

