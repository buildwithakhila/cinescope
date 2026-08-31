import { NavLink } from "react-router-dom"

function getStyle(isActive: boolean): string {
    return (
        "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors " +
        (isActive
            ? "bg-red-600 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900")
    )
}

function Navbar() {
    return (
        <nav className="flex items-center gap-1">
            <NavLink to='/' end className={({ isActive }) => getStyle(isActive)}>Home</NavLink>
            <NavLink to='/search' className={({ isActive }) => getStyle(isActive)}>Search</NavLink>
            <NavLink to='/favourites' className={({ isActive }) => getStyle(isActive)}>Favourites</NavLink>
            <NavLink to='/profile' className={({ isActive }) => getStyle(isActive)}>Profile</NavLink>
        </nav>
    )
}
export default Navbar
