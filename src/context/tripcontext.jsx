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
                trips: state.trips.map((trip) => trip.id === action.payload.tripId ? { ...trip, expenses: [...(trip.expenses || []), action.payload.expense] } : trip)
            };
        }
        case "deleteExpense": {
            return {
                ...state,
                trips: state.trips.map((trip) => trip.id === action.payload.tripId ? { ...trip, expenses: trip.expenses.filter((expense) => expense.id !== action.payload.expenseId) } : trip)
            };
        }
        case "editExpense": {
            return {
                ...state,
                trips: state.trips.map((trip) => trip.id === action.payload.tripId ? { ...trip, expenses: trip.expenses.map((expense) => expense.id === action.payload.expense.id ? action.payload.expense : expense) } : trip)
            };
        }
        case "deleteAllExpenses": {
            return {
                ...state,
                trips: state.trips.map((trip) => trip.id === action.payload.tripId ? { ...trip, expenses: [] } : trip )
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