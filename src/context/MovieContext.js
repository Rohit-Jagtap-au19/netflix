import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export function useMovieContext() {
  return useContext(MovieContext);
}

export function MovieProvider({ children }) {
  const [movie, setMovie] = useState(null);

  return (
    <MovieContext.Provider value={{ movie, setMovie }}>
      {children}
    </MovieContext.Provider>
  );
}