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
import { useDebounce, useJobItems } from "../lib/hooks";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";

function App() {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);
  const { jobItems, isLoading, numberOfResults } = useJobItems(debouncedSearchText);

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
          <SortingControls />
        </SidebarTop>
        <JobList jobItems={jobItems} isLoading={isLoading} />
        <PaginationControls />
      </Sidebar>
      <JobItemContent />
    </Container>
    <Footer />
  </>;
}

export default App;
