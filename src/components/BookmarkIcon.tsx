import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { handleToggleBookmark, bookmarkedIds } = useBookmarksContext();

  const filled = bookmarkedIds.includes(id);

  return (
    <button
      onClick={(event) => {
        handleToggleBookmark(id);
        event.stopPropagation();
        event.preventDefault();
      }}
      className="bookmark-btn">
      <BookmarkFilledIcon className={`${filled && 'filled'}`} />
    </button>
  );
}
