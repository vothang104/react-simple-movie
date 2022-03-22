import 'swiper/css';
// import HomePage from "./page/HomePage";
import { Routes, Route } from 'react-router-dom';
import Main from './components/layout/Main';
// import MoviePage from './page/MoviePage';
// import MovieDetailPage from './page/MovieDetailPage';
import { lazy, Suspense} from 'react'

const HomePage = lazy(() => import('./page/HomePage'))
// const MoviePage = lazy(() => import('./page/MoviePage'))
const MoviePageV2 = lazy(() => import('./page/MoviePageV2'))
const MovieDetailPage = lazy(() => import('./page/MovieDetailPage'))
function App() {
  return (
    <Suspense fallback={<></>}>
    <Routes>
      <Route element={<Main></Main>}>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/movies' element={<MoviePageV2></MoviePageV2>}></Route>
      <Route path='/movie/:movieId' element={<MovieDetailPage></MovieDetailPage>}></Route>
      </Route>
    </Routes>
    </Suspense>
  );
}

export default App;
