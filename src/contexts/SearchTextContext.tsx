import { ReactNode, createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContextProviderProps = {
  children: ReactNode;
};

type SearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleSearchTextChange: (newSearchText: string) => void
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

export default function SearchTextContextProvider({ children }: SearchTextContextProviderProps) {

  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  const handleSearchTextChange = (newSearchText: string) => {
    setSearchText(newSearchText)
  }

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleSearchTextChange
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}



