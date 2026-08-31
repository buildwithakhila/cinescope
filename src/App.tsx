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
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <span className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900">
            <span className="text-red-600">🎬</span> Cinescope
          </span>
          <Navbar />
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes >
      </main>
    </FavouriteProvider>
  )
}

export default App
