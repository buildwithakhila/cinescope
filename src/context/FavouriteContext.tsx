import { createContext, useState, type ReactNode } from "react";

type FavouriteContextType = {
    favourites: string[],
    handleFavourite(id: string): void
}

type FavouriteProviderType = {
    children: ReactNode
}


export const FavouriteContext = createContext<FavouriteContextType | undefined>(undefined)


export function FavouriteProvider({ children }: FavouriteProviderType) {

    const [favourites, setFavourites] = useState<string[]>([])

    function handleFavourite(id: string): void {

        setFavourites((prev) => {
            const isFavourite = prev.some((existing) => (existing === id))
            if (isFavourite) {
                return prev.filter((existing) => (existing !== id))
            } else
                return [...prev, id]
        })


    }
    return (
        <FavouriteContext.Provider
            value={{ favourites, handleFavourite }}
        >
            {children}

        </FavouriteContext.Provider>
    )
}