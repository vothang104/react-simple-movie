import React from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr';
import MovieList from '../components/movie/MovieList';
import { api_key, fetcher } from '../config';

function MovieDetailPage() {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`,
        fetcher
    )

  return (
    <>
    <div
    className="w-full h-[600px] relative">
        <div className="overlay absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        <div
        style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`
        }}
        className="w-full h-full bg-cover bg-no-repeat"></div>
        <div className="mx-auto -mt-[200px] max-w-[800px] rounded-lg overflow-hidden h-[400px] relative z-10">
            <img
            className='w-full h-full object-cover object-[center,25%]'              
            src={`https://image.tmdb.org/t/p/original${data?.poster_path}`} alt="" />
        </div>
        <h2 className='text-3xl text-white text-center mt-5'>{data?.title}</h2>
        {
            data?.genres &&
            <div className='p-5 flex gap-x-3 justify-center'>
                {
                    data.genres.map(genre => (
                        <div
                        className='px-5 py-3 rounded-md border border-primary
                        text-white text-base' key={genre.id}>{genre.name}</div>
                    ))
                }
            </div>
        }
        <p className='text-sm text-white text-center max-w-[800px] mx-auto leading-relaxed pb-5'>{data?.overview}</p>
        <MovieCredits></MovieCredits>
        <MovieVideo></MovieVideo>
        <MovieSimilar></MovieSimilar>
    </div>
    </>
  )
}

function MovieCredits() {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`,
        fetcher
    )
    if(!data) return null;
    const { cast } = data;
    if(!cast || cast.length <=0) return null;
    return (
        <div className='pb-5 page-container mb-5'>
            <h2 className='text-white text-3xl text-center mb-5'>Cast</h2>
            <div className='grid grid-cols-4 gap-3'>
            {
                cast.slice(0, 4).map(item => (
                <div key={item.id || item.cast_id} className="cast-item h-[350px] relative">
                    <img
                    className='w-full h-full object-cover rounded-lg'
                    src={item?.profile_path ? `https://image.tmdb.org/t/p/original${item?.profile_path}` : 'https://images.unsplash.com/photo-1580518337843-f959e992563b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YWN0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'} alt="" />
                    <span className='absolute inline-block p-3 bg-slate-800 bottom-5 left-1/2
                    -translate-x-1/2 text-md font-semibold text-white rounded-md text-center'>{item.name}</span>
                </div>
                ))
            }
            </div>
        </div>
    )
}

function MovieVideo() {
    const { movieId } = useParams();
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=en-US`,
        fetcher
    )
    if(!data) return null;
    const { results } = data;
    if(!results || results.length <= 0) return null;
    console.log('movie video ~ ', data);
    return (
        <div className="page-container flex flex-col gap-10">
        {
            results.slice(0, 2).map(item => (
            <div key={item.id} className='h-[500px] flex flex-col items-start gap-y-3'>
                <h3 className='inline-block text-xl text-white bg-primary p-5 rounded-lg'>{item.name}</h3>
                <iframe
                className='flex-1 w-full rounded-md'
                src={`https://www.youtube.com/embed/${item.key}`}
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            ))
        }
        </div>
    )
}

function MovieSimilar() {
    const { movieId } = useParams();
    
    return (
        <div className='py-10'>
            <h2 className='text-2xl text-white font-medium text-center mb-5'>Movie Similar</h2>
            <div className="list-similar page-container">
               <MovieList type='similar' movieId={movieId}></MovieList>
            </div>
        </div>
    )
}

export default MovieDetailPage