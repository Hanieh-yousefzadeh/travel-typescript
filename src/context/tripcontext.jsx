import { createContext, useReducer } from "react";
export const TripContext = createContext();

const initialState = { trips: [] };

function reducer(state, action) {
    switch (action.type) {
        case "addTrip": {
            return {
                ...state,
                trips: [...state.trips, action.payload]
            }
        }
        case "deleteAllTrips": {
            return {
                ...state,
                trips: []
            }
        }
        case "editTrip": {
            return {
                ...state,
                trips: state.trips.map((trip) => trip.id === action.payload.id ? action.payload : trip)
            };
        }
        case "addExpense": {
            return {
                ...state,
                trips: state.trips.map((trip) => trip.id === action.payload.tripId  ? {...trip ,expenses: [ ...(trip.expenses || []), action.payload.expense ] } : trip )
            };
        }
        default: return state;
    }
}


export function TripProvider({ children }) {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    return (
        <TripContext value={{ state, dispatch }}>
            {children}
        </TripContext>
    );
}