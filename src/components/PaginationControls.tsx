import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Direction } from "../lib/types";

type PaginationControlsProps = {
  currentPage: number;
  onClick: (direction: Direction) => void;
  numberOfPages: number;
};

type PaginationButtonProps = {
  currentPage: number;
  direction: Direction;
  onClick: () => void;
};

export default function PaginationControls({ currentPage, onClick, numberOfPages }: PaginationControlsProps) {
  return <section className="pagination">
    {currentPage > 1 && <PaginationButton direction={"previous"} currentPage={currentPage} onClick={() => onClick("previous")} />}
    {currentPage < numberOfPages && <PaginationButton direction={"next"} currentPage={currentPage} onClick={() => onClick("next")} />}
  </section>;
}

export function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button className={`pagination__button pagination__button--${direction}`} onClick={e => { onClick(); e.currentTarget.blur(); }}>
      {
        direction === "previous"
          ? (<><ArrowLeftIcon /> Page {currentPage - 1}</>)
          : (<>Page {currentPage + 1} <ArrowRightIcon /></>)
      }
    </button>
  );
}
