type ResultsCountProps = {
  numberOfResults: number;
};
export default function ResultsCount({ numberOfResults }: ResultsCountProps) {
  return <p className="count"><span className="u-bold">{numberOfResults}</span> results</p>;
}
