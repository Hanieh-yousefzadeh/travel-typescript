import { useContext } from "react";
import { useParams } from "react-router";
import { TripContext } from "../context/tripcontext";


function TripDetails() {

    const { tripId } = useParams();

    const { state } = useContext(TripContext);

    console.log(tripId);
    console.log(state.trips);

    return (
        <div>
            <h1>Trip Details</h1>
        </div>
    );
}
export default TripDetails;