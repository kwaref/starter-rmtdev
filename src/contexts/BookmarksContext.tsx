import { ReactNode, createContext } from "react";
import { useLocalStorage, useJobItems } from "../lib/hooks";
import { ExpandedJobItem } from "../lib/types";

type BookmarksContextProviderProps = {
  children: ReactNode;
};

type BookmarksContext = {
  handleToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
  bookmarkedJobItems: ExpandedJobItem[],
  isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({ children }: BookmarksContextProviderProps) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>('bookmarkedIds', []);

  const { jobItems: bookmarkedJobItems, isLoading } = useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev: number[]) => prev.filter((bookmarkId: number) => bookmarkId !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}



