import { ReactNode } from "react";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

type SidebarProps = {
  children: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="sidebar">
      <SidebarTop/>
      {children}
      <PaginationControls />
    </div>
  );
}

export function SidebarTop() {
  return (
    <div className="sidebar__top">
      <ResultsCount />
      <SortingControls />
    </div>
  );
}

