import { ReactNode } from "react";
import { SortBy } from "../lib/types";

type SortingControlsProps = {
  onClick: (newSortBy: SortBy) => void;
  sortBy: SortBy;
};

type SortingButtonProps = {
  onClick: () => void;
  children: ReactNode;
  isActive: boolean;
};

export default function SortingControls({ onClick, sortBy }: SortingControlsProps) {
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