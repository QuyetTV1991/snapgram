import Loader from "./Loader";
import GridPostList from "./GridPostList";

type SearchResultsProps = {
  searchedPosts: any;
  isSearchFetching: boolean;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;

  if (searchedPosts && searchedPosts.documents.length > 0)
    return <GridPostList posts={searchedPosts.documents} />;

  return (
    <p className="text-light-4 mt-4 text-center w-full">No results found</p>
  );
};

export default SearchResults;
