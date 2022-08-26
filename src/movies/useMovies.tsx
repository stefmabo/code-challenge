import React, { useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { Movie, MoviesAction } from "types";
import { getMovies } from "api/movies";

interface MoviesState {
  movies: Movie[];
  initialized: boolean;
}

export function useMoviesCollection(): [
  MoviesState,
  React.Dispatch<MoviesAction>
] {
  // TODO: Implement all action processing

  const movieReducer = (
    state: MoviesState,
    action: MoviesAction
  ): MoviesState => {
    switch (action.type) {
      case "fetch":
        return { movies: action.payload.data, initialized: true };

      case "add":
        return { ...state, movies: [...state.movies, {id: uuid(), ratings: [], ...action.payload.movie}] };

      case "delete":
        return {
          ...state,
          movies: state.movies.filter((m) => m.id !== action.payload.movieId),
        };

      case "rate":
        const movies = [...state.movies].map((m) =>
          m.id === action.payload.movieId
            ? { ...m, ratings: [...m.ratings, action.payload.rating] }
            : m
        );
        return { ...state, movies };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    initialized: false,
  });

  useEffect(() => {
    async function fetchData() {
      let data: Movie[] = [];
      try {
        data = await getMovies();
      } catch (error) {
        data = [];
      } finally {
        dispatch({
          type: "fetch",
          payload: {
            data,
          },
        });
      }
    }
    fetchData();
  }, []);

  return [state, dispatch];
}
