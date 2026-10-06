import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export type Country = {
    name: string;
    capital: string;
    numericCode: string;
    flags :{ png:string } ;
}
type CountryContextType = {
    countries: Country[];
    favorites: Country[];
    setFavorites: Dispatch<SetStateAction<Country[]>>
}

export const CountryContext = createContext<CountryContextType | null>(null);

export function useCountryContext() {
    const context = useContext(CountryContext)
    if (!context) {
        throw new Error("useCountryContext must be used inside CountryProvider")
    }
    return context;
}