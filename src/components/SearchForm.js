import { useGlobalContext } from "../context";
import { useRef } from "react";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const inputRef = useRef(null);
  const handleChange = () => {
    setSearchTerm(inputRef.current.value);
  };

  return (
    <section className="search">
      <form className="search-form">
        <div className="form-control">
          <label htmlFor="cocktail">search your favorite cocktail</label>
          <input
            type="text"
            name="cocktail"
            onChange={handleChange}
            ref={inputRef}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
