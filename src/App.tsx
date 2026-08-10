
import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Search } from "./pages/Search"
import { MovieDetails } from "./pages/MovieDetails"
import { Profile } from "./pages/Profile"
import { Favourites } from "./pages/Favourites"
import { NotFound } from "./pages/NotFound"
import Navbar from "./components/Navbar/Navbar"
import { FavouriteProvider } from "./context/FavouriteContext"


function App() {

  return (
    <FavouriteProvider>
      <h1 className="text-4xl font-bold">Cinescope</h1>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes >
    </FavouriteProvider>
  )
}

export default App
