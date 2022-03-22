import React from 'react'
import useSWR from 'swr'
import { fetcher } from '../../config'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useNavigate } from 'react-router-dom'
import Button from '../button/Button'

function Banner() {
    const { data } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=b83329d622db241d877f6eb83b65fcaf&language=en-US&page=1`,
        fetcher
    )
   const banners = data?.results || [];
   console.log(banners);

  return (
    <section className="banner h-[500px] page-container mb-20">
        <Swiper
        spaceBetween={40}
        slidesPerView={1}
        grabCursor={'true'}
        >
            {
                banners.length > 0 &&
                banners.map(item => {
                    return (
                        <SwiperSlide key={item.id}><BannerItem item={item}></BannerItem></SwiperSlide>
                    )
                })
            }
        </Swiper>
    </section>
  )
}

function BannerItem({ item }) {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full rounded-lg relative">
          <div className="overlay-banner absolute inset-0 bg-gradient-to-t
          from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
          <img
          className="w-full h-full object-cover object-top rounded-lg"
          src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
          alt="" />
          <div className="absolute bottom-3 left-5 w-full text-white">
            <h2 className="font-bold text-3xl mb-5">{item.title}</h2>
            <div className="flex items-center gap-x-3 mb-5">
              <span className="inline-block p-3 border border-white rounded-md text-white text-base
              hover:bg-slate-900 cursor-pointer transition-all">Action</span>         
              <span className="inline-block p-3 border border-white rounded-md text-white text-base
              hover:bg-slate-900 cursor-pointer transition-all">Adventure</span>         
              <span className="inline-block p-3 border border-white rounded-md text-white text-base
              hover:bg-slate-900 cursor-pointer transition-all">Drama</span>         
            </div> 
            <div className="flex gap-x-3">
              <Button onClick={() => navigate(`/movie/${item.id}`)} className='w-fit'>watch now</Button>
            </div>
          </div>
        </div>
    )
}

export default Banner