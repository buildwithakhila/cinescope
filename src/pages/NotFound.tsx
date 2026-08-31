import { Link } from "react-router-dom"

export function NotFound() {
    return (
        <div className="py-20 text-center">
            <p className="text-6xl">🎬</p>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
            <p className="mt-2 text-gray-500">This scene doesn't exist.</p>
            <Link to="/" className="mt-6 inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                Back to Home
            </Link>
        </div>
    )
}
