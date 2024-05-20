import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { numberOfResults } = useJobItemsContext();
  return <p className="count"><span className="u-bold">{numberOfResults}</span> results</p>;
}
