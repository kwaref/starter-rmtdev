import { ReactNode } from "react";
import { useJobItemsContext } from "../lib/hooks";

type SortingButtonProps = {
  onClick: () => void;
  children: ReactNode;
  isActive: boolean;
};

export default function SortingControls() {
  const { sortBy, handleSort: onClick } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton onClick={() => onClick("relevant")} isActive={sortBy==='relevant'} >Relevant</SortingButton>
      <SortingButton onClick={() => onClick("recent")} isActive={sortBy==='recent'} >Recent</SortingButton>
    </section>
  );
}

function SortingButton({ onClick, children, isActive }: SortingButtonProps) {
  return (
    <button onClick={() => onClick()} className={`sorting__button ${isActive && "sorting__button--active"}`}>
      {children}
    </button>
  );
}