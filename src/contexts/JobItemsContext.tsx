import { ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { Direction, JobItem, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemsContextProviderProps = {
  children: ReactNode;
};

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSliced: JobItem[];
  isLoading: boolean;
  numberOfResults: number;
  numberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handlePageChange: (direction: Direction) => void;
  handleSort: (sortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({ children }: JobItemsContextProviderProps) {

  const { debouncedSearchText } = useSearchTextContext();

  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const numberOfResults = jobItems?.length || 0;
  const numberOfPages = numberOfResults / RESULTS_PER_PAGE;

  const sortedJobItems = useMemo(() => [...(jobItems || [])].sort((a, b) => {
    if (sortBy === 'relevant') {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return b.daysAgo - a.daysAgo;
    }
  }), [jobItems, sortBy]);

  const jobItemsSliced = useMemo(() => sortedJobItems?.slice(
    currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE) || [],
    [currentPage, sortedJobItems]
  );

  const handlePageChange = useCallback((direction: Direction) => {
    if (direction === "next") {
      setCurrentPage(prev => prev + 1);
    } else {
      setCurrentPage(prev => prev - 1);
    }
  }, []);

  const handleSort = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const contextValue = useMemo(() => ({
    jobItems,
    jobItemsSliced,
    isLoading,
    numberOfResults,
    numberOfPages,
    currentPage,
    sortBy,
    handlePageChange,
    handleSort
  }), [
    jobItems,
    jobItemsSliced,
    isLoading,
    numberOfPages,
    numberOfResults,
    currentPage,
    sortBy,
    handlePageChange,
    handleSort
  ])

  return (
    <JobItemsContext.Provider
      value={contextValue}
    >
      {children}
    </JobItemsContext.Provider>
  );
}



