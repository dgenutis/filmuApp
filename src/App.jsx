import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import MovieList from "./components/MovieList";
import Categories from "./components/Categories";
import SavedMovies from "./components/SavedMovies";
import Foooter from "./components/Foooter";

const API_KEY = "53c258bb52d305146e19a71e58aa2cc5";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchPopularMovies();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      setCategories(response.data.genres);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const fetchSearchMovies = async (query) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setMovies(response.data.results);
      setSearchQuery(query);
    } catch (error) {
      console.error("Error fetching search movies", error);
    }
  };

  const searchByCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${categoryId}`
      );
      setMovies(response.data.results);
      const selectedCategory = categories.find(
        (category) => category.id === categoryId
      );
      setSelectedCategory(selectedCategory);
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching movies by category:", error);
    }
  };

  const saveMovie = (movie) => {
    setSavedMovies((prevSavedMovies) => {
      const updatedSavedMovies = [...prevSavedMovies, movie];
      console.log("Updated saved movies:", updatedSavedMovies);
      return updatedSavedMovies;
    });
  };

  const removeMovie = (movieId) => {
    setSavedMovies((prevSavedMovies) =>
      prevSavedMovies.filter((movie) => movie.id !== movieId)
    );
  };
  const clearSavedMovies = () => setSavedMovies([]);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = categories.find((category) => category.id === id);
        return genre ? genre.name : "Unknown";
      })
      .join(", ");
  };

  const fetchMovieTrailers = async (movieId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const trailers = response.data.results.filter(
        (video) => video.type === "Trailer"
      );
      return trailers;
    } catch (error) {
      console.error("Error fetching movie trailers:", error);
      return [];
    }
  };

  return (
    <>
      <Search onSearch={fetchSearchMovies} />
      <Categories
        categories={categories}
        onSelectedCategory={searchByCategory}
      />
      <MovieList
        movies={movies}
        categories={categories}
        onSave={saveMovie}
        savedMovies={savedMovies.map((movie) => movie.id)}
        selectedCategory={selectedCategory}
        fetchMovieTrailers={fetchMovieTrailers}
        searchQuery={searchQuery}
      />
      <SavedMovies
        savedMovies={savedMovies}
        onClear={clearSavedMovies}
        getGenreNames={getGenreNames}
        onRemove={removeMovie}
      />
      <Foooter />
    </>
  );
}

export default App;
