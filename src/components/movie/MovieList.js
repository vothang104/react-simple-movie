import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from './MovieCard';
import useSWR from 'swr';
import { api_key, fetcher } from '../../config';

function MovieList({ type, movieId = '' }) {
  const [movies, setMovies] = useState([]);

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie${movieId && `/${movieId}`}/${type}?api_key=${api_key}&language=en-US&page=1`,
    fetcher
  );
  //https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&page=1

  useEffect(() => {
    if(data && data.results) setMovies(data.results);
  }, [data])
  return (
    <div className='movie-list select-none'>
        <Swiper
        spaceBetween={40}
        slidesPerView={4}
        grabCursor={"true"}
        >
        {
          movies.length > 0 &&
          movies.map(movie => {
            return (<SwiperSlide key={movie.id}>
            <MovieCard
            item={movie}
            bgColor='primary'
            ></MovieCard></SwiperSlide>)
          })
        }
        </Swiper>
    </div>
  )
}

export default MovieList