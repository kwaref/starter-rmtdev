import { useContext, useEffect, useState } from "react";
import { ExpandedJobItem, JobItem } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContext";
import { ActiveIdContext } from "../contexts/ActiveIdContext";
import { SearchTextContext } from "../contexts/SearchTextContext";
import { JobItemsContext } from "../contexts/JobItemsContext";

type jobItemAPIResponse = {
    public: boolean;
    jobItem: ExpandedJobItem;
};

const fetchJobItem = async (id: number): Promise<jobItemAPIResponse> => {
    const response = await fetch(`${BASE_API_URL}/${id}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description);
    }
    const data = await response.json();
    return data;
};

export const useJobItem = (id: number | null) => {
    const { data, isInitialLoading } = useQuery(
        ['job-item', id],
        () => id ? fetchJobItem(id) : null,
        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: !!id,
            onError: handleError
        }
    );
    return { jobItem: data?.jobItem, isLoading: isInitialLoading };
};

export function useJobItems(ids: number[]) {
    const results = useQueries({
        queries: ids.map(id => ({
            queryKey: ['job-item', id],
            queryFn: () => fetchJobItem(id),
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: !!id,
            onError: handleError
        })),
    });
    const jobItems = results.map(result => result.data?.jobItem).filter(jobItem => !!jobItem) as ExpandedJobItem[];
    const isLoading = results.some(result => result.isLoading);

    return { jobItems, isLoading };
}

// ---------------------------------------------------------------------------------

type jobItemsAPIResponse = {
    public: boolean;
    sorted: boolean;
    jobItems: JobItem[];
};

const fetchJobItems = async (searchText: string): Promise<jobItemsAPIResponse> => {
    const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description);
    }
    const data = await response.json();
    return data;
};

export const useSearchQuery = (searchText: string) => {
    
    const { data, isInitialLoading } = useQuery(
        ['job-items', searchText],
        () => fetchJobItems(searchText),
        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: !!searchText,
            onError: handleError
        }
    );
    return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
};

// ---------------------------------------------------------------------------------

export const useActiveId = () => {
    const [activeId, setActiveId] = useState<number | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            const id = +window.location.hash.slice(1);
            setActiveId(id);
        };

        handleHashChange();

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return activeId;
};

export const useDebounce = <T>(value: T, delay = 300): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timerId = setTimeout(() => setDebouncedValue(value), delay);
        return () => {
            clearTimeout(timerId);
        };
    }, [value, delay]);
    return debouncedValue;
};

// ---------------------------------------------------------------------------------

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue)));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue] as const;
}

export function useOnClickOutside(refs: React.RefObject<HTMLElement>[], handler: () => void) {
    useEffect(() => {

        const handleClick = (e: MouseEvent) => {
            if (refs.every(ref => !ref.current?.contains(e.target as Node))) {
                handler();
            }
        };

        document.addEventListener('click', handleClick);

        return () => { document.removeEventListener('click', handleClick); };
    }, [refs, handler]);
}

// ---------------------------------------------------------------------------------


export function useBookmarksContext() {
    const context = useContext(BookmarksContext);

    if (!context) {
        throw new Error("useBookmarksContext must be used inside a BookmarksContextProvider");
    }
    return context;
}

export function useActiveIdContext() {
    const context = useContext(ActiveIdContext);

    if (!context) {
        throw new Error("useActiveIdContext must be used inside a ActiveIdContextProvider");
    }
    return context;
}

export function useSearchTextContext() {
    const context = useContext(SearchTextContext);

    if (!context) {
        throw new Error("useSearchTextContext must be used inside a SearchTextContextProvider");
    }
    return context;
}

export function useJobItemsContext() {
    const context = useContext(JobItemsContext);

    if (!context) {
        throw new Error("useJobItemsContext must be used inside a JobItemsContextProvider");
    }
    return context;
}