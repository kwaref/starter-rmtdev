import { useEffect, useState } from "react";
import { ExpandedJobItem, JobItem } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

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
            onError: (error) => { console.log(error); }
        }
    );
    return { jobItem: data?.jobItem, isLoading: isInitialLoading };
};

export const useJobItems = (searchText: string) => {
    const [jobItems, setJobItems] = useState<JobItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const numberOfResults = jobItems.length;
    const jobitemsSliced = jobItems.slice(0, 7);

    useEffect(() => {
        if (!searchText) return;
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
            const data = await response.json();
            setIsLoading(false);
            setJobItems(data.jobItems);
        };
        fetchData();
    }, [searchText]);

    return { jobItems: jobitemsSliced, isLoading, numberOfResults };
};

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