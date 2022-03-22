import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import MovieCard, { MovieCardSkeleton } from '../components/movie/MovieCard';
import { api_key, fetcher } from '../config'
import useDebounce from '../hooks/useDebounce';
import ReactPaginate  from 'react-paginate'
import { v4 } from 'uuid';

function MoviePage() {
  const [filter, setFiler] = useState('');
  const filterDebounce = useDebounce(filter);
  const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3${filterDebounce ? '/search' : ''}/movie${!filterDebounce ? '/popular' : ''}?api_key=${api_key}&language=en-US&page=${itemOffset}${filterDebounce ? `&query=${filterDebounce}` : ''}`,
    fetcher
  )
    const movies = data?.results || [];
    const handleClickSearch = () => {
      
    }
    const isLoading = !data && !error;


  useEffect(() => {
    if(!data || !data.total_pages) return;
    // Fetch items from another resources.
    setPageCount(data.total_pages);
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log(event.selected);
    // const newOffset = (event.selected * itemsPerPage) % data.total_pages;
    const newOffset = (event.selected + 1);
    console.log('new offset ~ ', newOffset);
    setItemOffset(newOffset);
  };
  const handlePageActive = e => {
    e.target.style = `background-color: white; color: black`
  }
  const handleFilterChange = (e) => {
    setFiler(e.target.value);
    setItemOffset(1);
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
        onClick={handleClickSearch}
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
            return (<MovieCard key={movie.id} item={movie} bgColor='secondary'></MovieCard>)
          })
        }
      </div>
      }
      <ReactPaginate
        className='pagination page-container text-sm text-white flex justify-center gap-x-3 py-5'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        onPageActive={handlePageActive}
        activeClassName='active'
        initialPage={1}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default MoviePage