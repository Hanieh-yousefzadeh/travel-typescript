import { createContext ,type Dispatch , type SetStateAction } from "react";

type User ={
    name :string;
    family : string;
    email :string;
}

type AuthContextType = {
    user : User | null;
    setUser : Dispatch<SetStateAction< User|null>>
}

export const AuthContext = createContext<AuthContextType | null > (null);