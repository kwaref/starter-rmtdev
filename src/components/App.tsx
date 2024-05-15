import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import JobList from "./JobList";
import { useDebounce, useSearchQuery } from "../lib/hooks";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { Direction, SortBy } from "../lib/types";

function App() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const numberOfResults = jobItems?.length || 0;
  const sortedJobItems = [...(jobItems || [])].sort((a, b) => {
    if (sortBy === 'relevant') {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return b.daysAgo - a.daysAgo;
    }
  });
  const jobitemsSliced = sortedJobItems?.slice(currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE) || [];

  const handlePageChange = (direction: Direction) => {
    if (direction === "next") {
      setCurrentPage(prev => prev + 1);
    } else {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleSort = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  return <>
    <Background />
    <Header>
      <HeaderTop>
        <Logo />
        <BookmarksButton />
      </HeaderTop>
      <SearchForm searchText={searchText} setSearchText={setSearchText} />
    </Header>
    <Container>
      <Sidebar>
        <SidebarTop>
          <ResultsCount numberOfResults={numberOfResults} />
          <SortingControls onClick={handleSort} sortBy={sortBy} />
        </SidebarTop>
        <JobList jobItems={jobitemsSliced} isLoading={isLoading} />
        <PaginationControls currentPage={currentPage} onClick={handlePageChange} numberOfPages={numberOfResults / RESULTS_PER_PAGE} />
      </Sidebar>
      <JobItemContent />
    </Container>
    <Footer />
    <Toaster position="top-right" />
  </>;
}

export default App;
