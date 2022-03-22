import React, { Fragment } from 'react'
import Banner from '../components/banner/Banner'
import MovieList from '../components/movie/MovieList'

function HomePage() {
  return (
    <Fragment>
      <Banner></Banner>
      <section className="page-container movies-layout mb-20">
        <h2 className="text-white text-2xl font-bold capitalize mb-10">now playing</h2>
        <MovieList type='now_playing'></MovieList>
      </section>
      <section className="page-container top-rated mb-20">
        <h2 className="text-white text-2xl font-bold capitalize mb-10">Top rated movies</h2>
        <MovieList type='top_rated'></MovieList>
      </section>
      <section className="page-container top-rated mb-20">
        <h2 className="text-white text-2xl font-bold capitalize mb-10">Trending</h2>     
          <MovieList type='popular'></MovieList>
      </section>
    </Fragment>
  )
}

export default HomePage