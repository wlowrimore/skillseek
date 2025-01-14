import Form from "next/form";
import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input placeholder:text-[0.85rem] placeholder:md:text-xl mb-2 md:mb-0"
        placeholder="Search by Service, Author, or Category"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button
          type="submit"
          title="Search"
          aria-label="Search Input"
          className="search-btn text-white"
        >
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
