import { NavLink } from "react-router-dom"

function getStyle(isActive: boolean): string {
    return (isActive ? 'text-red-600 font-bold' : 'text-gray-700')
}
function Navbar() {
    return (
        <nav className={'flex gap-4'}>
            <NavLink to='/' end className={({ isActive }) => getStyle(isActive)} >Home</NavLink >
            <NavLink to='/search' className={({ isActive }) => getStyle(isActive)}>Search</NavLink >
            <NavLink to='/favourites' className={({ isActive }) => getStyle(isActive)}>Favourites</NavLink >
            <NavLink to='/profile' className={({ isActive }) => getStyle(isActive)}>Profile</NavLink >
        </nav>

    )
}
export default Navbar
