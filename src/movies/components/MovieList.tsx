import React, { useState } from "react";
import { MovieCard } from "./MovieCard";
import { AddMovieButton } from "./AddMovieButton";
import { AddMovieForm } from "./AddMovieForm";
import { Card } from "shared/components";
import { useMovies } from "./MovieProvider";

const BUTTON = "BUTTON";
const FORM = "FORM";

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState(BUTTON);

  const isButton = displayOptionType === BUTTON;
  // TODO: Display list of movies

  const handleAddMovie = (
    data: Record<"imageUrl" | "title" | "subtitle" | "description", string>
  ) => {
    moviesDispatch({ type: "add", payload: { movie: data } });
  };

  const handleDisplayOptionType = () => {
    setDisplayOptionType((displayOptionType: React.SetStateAction<string>) => {
      return displayOptionType === BUTTON ? FORM : BUTTON;
    });
  };

  return (
    <div className="card-deck">
      {movies.map((movie) => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>
      ))}
      <Card>
        <AddMovieButton onClick={handleDisplayOptionType} />
        {!isButton && (
          <AddMovieForm
            onSubmit={handleAddMovie}
            onCancel={handleDisplayOptionType}
          />
        )}
      </Card>
    </div>
  );
};
