import { createContext, useReducer,useContext, useEffect, type Dispatch ,type ReactNode } from "react";

export type Expense = {
    id: number;
    title: string;
    category: string;
    amount: number;
    paidBy: string
}


export type Trip = {
    id: number;
    country: string;
    people: {
        id :number;
        name : string
    }[];
    budget: number;
    expenses: Expense[]
}

type State = {
    trips: Trip[];
    deletedTrips: Trip[] | null;
    deletedExpenses: {
        tripId: number;
        expenses: Expense[];
    } | null
}

type Action =
    | { type: "addTrip"; payload: Trip }
    | { type: "deleteAllTrips" }
    | { type: "undoDeleteAllTrips" }
    | { type: "editTrip"; payload: Trip }
    | { type: "deleteTrip"; payload: number }
    | {type: "addExpense";
        payload: {
            tripId: number;
            expense: Expense
        }
    }
    | { type: "deleteExpense";
        payload: {
            tripId: number;
            expenseId: number
        }
    }
    | {type: "editExpense";
        payload: {
            tripId: number;
            expense: Expense
        }
    }
    | { type: "deleteAllExpenses" ; 
        payload :{
            tripId: number;
        }}
    | { type: "undoDeleteAllExpenses" }

export type TripContextType = {
    state: State;
    dispatch: Dispatch<Action>
}
export const TripContext = createContext<TripContextType | null>(null);
const savedTrips = localStorage.getItem("trips")
const initialState: State = {
    trips: savedTrips ? JSON.parse(savedTrips) as Trip[] : [],
    deletedTrips: null,
    deletedExpenses: null
};

function reducer(state: State, action: Action): State {
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
                deletedTrips: state.trips,
                trips: []
            };
        }
        case "undoDeleteAllTrips": {
            return {
                ...state,
                trips: state.deletedTrips || [],
                deletedTrips: null,
            };
        }
        case "editTrip": {
            return {
                ...state,
                trips: state.trips.map((trip) => trip.id === action.payload.id ? action.payload : trip)
            };
        }
        case "deleteTrip":
            return {
                ...state,
                trips: state.trips.filter(
                    (trip) => trip.id !== action.payload
                )
            };
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
            const trip = state.trips.find((trip) => trip.id === action.payload.tripId)
                if(!trip){
                    return state;
                }
            return {
                ...state,

                deletedExpenses: {
                    tripId: action.payload.tripId,
                    expenses: trip.expenses || []
                },

                trips: state.trips.map((trip) =>
                    trip.id === action.payload.tripId ? { ...trip, expenses: [] } : trip
                )
            };
        }
        case "undoDeleteAllExpenses": {
                if(!state.deletedExpenses){
                    return state;
                }
                const deletedExpenses = state.deletedExpenses
            return {
                ...state,

                trips: state.trips.map((trip) => trip.id === deletedExpenses.tripId ? {
                    ...trip,
                    expenses: deletedExpenses.expenses
                } : trip
                ), deletedExpenses: null
            };
        }
        default: return state;
    }
}



export function TripProvider({ children} :{ children: ReactNode }) {
    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );
    useEffect(() => {
        localStorage.setItem("trips", JSON.stringify(state.trips));
    }, [state.trips]);


    return (
        <TripContext value={{ state, dispatch }}>
            {children}
        </TripContext>
    );
}
export function useTripContext() {
    const context = useContext(TripContext);

    if (!context) {
        throw new Error("useTripContext must be used inside TripProvider" );
    }
    return context;
}