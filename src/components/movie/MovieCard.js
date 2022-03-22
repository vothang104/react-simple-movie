import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button';
import LoadingSkeleton from '../loading/LoadingSkeleton'


function MovieCard({ item, bgColor }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    vote_average,
    release_date,
    poster_path
  } = item
  const handleClickButton = () => {
    navigate(`/movie/${id}`);
  }
  return (
    <div className="movie-card h-full flex flex-col rounded-lg p-3 bg-slate-800">
        <img
        className="w-full h-[250px] object-cover rounded-lg mb-3 shrink-0"   
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="" />
        <div className='flex-1 flex flex-col'>
        <div className='flex-1 flex flex-col mb-5'>
        <h3 className="text-white text-base font-bold shrink-0 movie-card-title mb-3">{title}</h3>
        <div className="mt-auto flex justify-between items-center text-white text-xs opacity-50">
            <span>{new Date(release_date).getFullYear()}</span>
            <span>{vote_average}</span>
        </div>
        </div>
        <Button
        onClick={handleClickButton}
        bgColor={bgColor}
        >now playing</Button>
        </div>
    </div>
  )
}

export function MovieCardSkeleton() {
  return (
    <div className="movie-card h-full flex flex-col rounded-lg p-3 bg-slate-800">
        {/* <img
        className="w-full h-[250px] object-cover rounded-lg mb-3 shrink-0"   
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="" /> */}
        <LoadingSkeleton className='mb-3' width='100%' height='250px' radius='8px'></LoadingSkeleton>
        <div className='flex-1 flex flex-col'>
        <div className='flex-1 flex flex-col mb-5'>
        {/* <h3 className="text-white text-base font-bold shrink-0 movie-card-title mb-3">{title}</h3> */}
        <LoadingSkeleton className='mb-3' width='60%' height='20px' radius='8px'></LoadingSkeleton>
        <div className="mt-auto flex justify-between items-center text-white text-xs opacity-50">
            <LoadingSkeleton className='bg-red-500' radius='8px' width='10%'  height='20px'></LoadingSkeleton>
            <LoadingSkeleton className='bg-[#eee]' radius='8px' width='10%'  height='20px'></LoadingSkeleton>
        </div>
        </div>
        {/* <Button
        onClick={handleClickButton}
        bgColor={bgColor}
        >now playing</Button> */}
        <LoadingSkeleton className='bg-slate-800' radius='8px' height='30px'></LoadingSkeleton>
        </div>
    </div>
  )
}

export default MovieCard