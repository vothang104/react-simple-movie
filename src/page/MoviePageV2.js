import React, { useState } from 'react'
// import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import MovieCard, { MovieCardSkeleton } from '../components/movie/MovieCard';
import { api_key, fetcher } from '../config'
import useDebounce from '../hooks/useDebounce';
import { v4 } from 'uuid';

function MoviePageV2() {
  const [filter, setFiler] = useState('');
  const filterDebounce = useDebounce(filter);
    const { data, error, size, setSize } = useSWRInfinite(
      (index) => `https://api.themoviedb.org/3${filterDebounce ? '/search' : ''}/movie${!filterDebounce ? '/popular' : ''}?api_key=${api_key}&language=en-US&page=${index + 1}${filterDebounce ? `&query=${filterDebounce}` : ''}`,
      fetcher
    )
  // const { data, error } = useSWR(
  //   `https://api.themoviedb.org/3${filterDebounce ? '/search' : ''}/movie${!filterDebounce ? '/popular' : ''}?api_key=${api_key}&language=en-US&page=${itemOffset}${filterDebounce ? `&query=${filterDebounce}` : ''}`,
  //   fetcher
  // )
  const isLoading = !data && !error;
  const movies = data ? data.reduce((initialValue, item) => [...initialValue, ...item?.results], []) : []
  const isEmpty = data?.[0]?.results === 0
  const isReachingEnd = isEmpty || data?.[data.length - 1]?.results.length < 20;
  console.log('isReachingEnd ~ ', isReachingEnd);
  const handleFilterChange = (e) => {
    setFiler(e.target.value);
  }
  return (
    <>
      <div className="flex items-center mx-auto w-[600px] mb-5">
        <div className='flex-1 border border-white rounded-md overflow-hidden'>
          <input
          value={filter}
          onChange={handleFilterChange}
          className='w-full outline-none border-none p-3 bg-slate-800 text-white'
          placeholder='Search....'
          type="text" />
        </div>
        <button
        className='ml-5 py-3 px-5 rounded-md bg-primary border-none outline-none text-base text-white font-semibold'
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        </button>
      </div>
      {
        isLoading ?
        <div className="grid grid-cols-4 gap-10">
          {
            new Array(4).fill(0).map(() => (
              <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
            )
            )
          }
        </div> :
      <div className="page-container grid grid-cols-4 gap-10">
        {
          movies.length > 0 &&
          movies.map(movie => {
            return (<MovieCard key={v4()} item={movie} bgColor='secondary'></MovieCard>)
          })
        }
      </div>
      }
      <div className="py-10 text-center">
        <button
        onClick={() => {!isReachingEnd && setSize(size + 1)}}
        disabled={isReachingEnd}
        className='outline-none border-none rounded-md bg-primary text-white text-sm p-3'>Load More</button>
      </div>
    </>
  )
}

export default MoviePageV2