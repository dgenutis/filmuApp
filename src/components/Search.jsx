import { useState, useEffect } from "react";
import "./Search.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
      setQuery("");
    }
  };

  const handleSearch = () => {
    if (query.length >= 2) {
      onSearch(query);
      setQuery("");
    }
  };

  //header effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        if (!isScrollingDown) {
          document.querySelector(".header").style.transform =
            "translateY(-100%)";
          setIsScrollingDown(true);
        }
      } else {
        document.querySelector(".header").style.transform = "translateY(0)";
        setIsScrollingDown(false);
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, isScrollingDown]);
  //header effect end

  return (
    <div className="header">
      <h2>the movie data base</h2>
      <img src="/logo.svg" alt="logo" className="header-image" />
      <div className="search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeydown}
          placeholder="Search for movies..."
        />
        <button onClick={handleSearch}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
              clipRule="evenodd"
            ></path>
            <path
              fillRule="evenodd"
              d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
