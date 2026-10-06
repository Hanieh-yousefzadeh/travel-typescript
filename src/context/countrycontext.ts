import { createContext ,type Dispatch , type SetStateAction } from "react";

type Country ={
    name :string;
    capital :string;
    numericCode :string;
    flag : string ;
}
type CountryContextType = {
    countries :  Country[];
    favorites :  Country[];
    setFavorites : Dispatch<SetStateAction<Country[]>>
}

export const CountryContext = createContext<CountryContextType | null>(null);