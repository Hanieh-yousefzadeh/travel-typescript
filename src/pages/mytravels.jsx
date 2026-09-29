import { useState, useContext } from "react";
import { CountryContext } from "../context/countrycontext";
import { Link } from "react-router";
import { TripContext } from "../context/tripcontext";



function MyTravels() {

    const { countries } = useContext(CountryContext);
    const { state, dispatch } = useContext(TripContext);


    const [isModalOpen, setIsModalOpen] = useState(false)
    function openModal() {
        setIsModalOpen(true)
    }
    function closeModal() {
        setIsModalOpen(false)
    }

    const [country, setCountry] = useState("");

    const [budget, setBudget] = useState("");

    const [activities, setActivities] = useState([]);

    const [activityInput, setActivityInput] = useState("");
    const [filterCountry, setFilterCountry] = useState("");

    const filteredTrips = filterCountry ? state.trips.filter((trip) => trip.country === filterCountry) : state.trips;

    const user = JSON.parse(localStorage.getItem("user"));
    const [person, setPerson] = useState([{
        id: Date.now(),
        name: user.name
    }]);

    const [personInput, setPersonInput] = useState("");

    const [editingTripId, setEditingTripId] = useState(null);

    function addPerson() {
        if (!personInput.trim()) {
            return;
        }

        setPerson((prev) => [...prev,
        {
            id: Date.now(),
            name: personInput.trim()
        }
        ]);

        setPersonInput("");
    }

    function deletePerson(id) {
        setPerson((prev) => prev.filter((person) => person.id !== id))
    }

    function addActivity() {
        if (!activityInput.trim()) {
            return;
        }
        setActivities((prev) => [...prev,
        {
            id: Date.now(),
            title: activityInput.trim()
        }
        ]);
        setActivityInput("");

    }

    function deleteActivitychip(id) {
        setActivities((prev) => prev.filter((item) => item.id !== id));
    }

    function handleSelectCard(e) {
        setCountry(e.target.value)
    }
    function handleBudget(e) {
        setBudget(e.target.value)
    }

    function handlePersonInput(e) {
        setPersonInput(e.target.value)
    }
    function handleActivityInput(e) {
        setActivityInput(e.target.value)
    }

    function selectCountry(e) {
        setFilterCountry(e.target.value)
    }




    function saveTrip() {

        if (editingTripId) {

            const updatedTrip = {
                id: editingTripId,
                country,
                people: person,
                budget: Number(budget),
                activities
            };

            dispatch({
                type: "editTrip",
                payload: updatedTrip
            });

        } else {

            const newTrip = {
                id: Date.now(),
                country,
                people: person,
                budget: Number(budget),
                activities,
                expenses: []
            };

            dispatch({
                type: "addTrip",
                payload: newTrip
            });
        }

        setIsModalOpen(false);
        setEditingTripId(null);
        setCountry("");
        setBudget("");
        setPersonInput("");
        setActivityInput("");
    }

    function deleteAllTrips() {
        dispatch({
            type: "deleteAllTrips"
        });
    }

    function editTrip(trip) {
        setEditingTripId(trip.id);

        setCountry(trip.country);
        setBudget(trip.budget);
        setPerson(trip.people);
        setActivities(trip.activities);

        setIsModalOpen(true);
    }



    return (
        <section>
            <button className="btn" onClick={openModal}>Add Trip</button>
            <select className="select select-bordered bg-[#F1EEE2]" value={filterCountry} onChange={selectCountry}>
                <option value="">All Countries</option>
                {countries.map((country) => (<option key={country.numericCode} value={country.name} > {country.name}</option>
                ))}
            </select>
            {state.trips.length > 0 && (
                <button className="btn btn-error" onClick={deleteAllTrips} > Delete All Trips </button>
            )}
            {isModalOpen && (
                <dialog id="my_modal_4" className="modal modal-open ">
                    <div className="modal-box w-11/12 max-w-5xl bg-white">

                        <div className="grid gap-5">
                            <div className="flex gap-2">
                                <label> <span>Where do you want to go?</span> </label>

                                <select className="select select-bordered bg-[#F1EEE2]" value={country} onChange={handleSelectCard}>
                                    <option value=""> Select country </option>
                                    {countries.map((country) => (
                                        <option key={country.numericCode} value={country.name} > {country.name} </option>
                                    ))}
                                </select>
                            </div>



                            <div className="">
                                <label><span> Budget (Toman) </span></label>
                                <input type="number" placeholder="5000000000" className="input input-bordered bg-[#F1EEE2]" value={budget} onChange={handleBudget} />

                            </div>

                            <div>
                                <label><span>Who is traveling?</span> </label>
                                <input type="text" placeholder="e.g. ghazal" className="input input-bordered bg-[#F1EEE2]" value={personInput} onChange={handlePersonInput} />
                                <button className="btn ml-5" onClick={addPerson}> Add </button>
                                <div className="flex gap-3 mt-2">
                                    {person.map((person, index) => (

                                        <div key={person.id} className="badge badge-lg gap-5 p-3 bg-[#F1EEE2]">

                                            {person.name}
                                            {index !== 0 && (
                                                <button type="button" onClick={() => deletePerson(person.id)} > × </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="">
                                <label><span>What do you want to do?</span> </label>
                                <input type="text" placeholder="e.g. Museum" className="input input-bordered  bg-[#F1EEE2]" value={activityInput} onChange={handleActivityInput} />
                                <button type="button" className="btn ml-5" onClick={addActivity} > Add </button>
                                <div className=" flex gap-3">
                                    {activities.map((activity) => (
                                        <div key={activity.id} className="badge badge-lg  gap-5 p-3 bg-[#F1EEE2]">
                                            {activity.title}
                                            <button type="button" onClick={() => deleteActivitychip(activity.id)}> × </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="modal-action">
                            <button onClick={saveTrip} className="btn">{editingTripId ? "Save Changes" : "Add Trip"} </button>
                            <button className="btn" onClick={closeModal}>Close</button>
                        </div>


                    </div>
                </dialog>
            )}
            <div className="grid gap-5 mt-8">
                {filteredTrips.map((trip) => (
                    <div key={trip.id} className="card bg-[#F1EEE2] shadow-md p-5" >

                        <h2 className="text-2xl font-bold"> {trip.country} </h2>
                        <button className="btn btn-sm" onClick={() => editTrip(trip)} > Edit </button>
                        <p className="mt-2"> Budget: {trip.budget.toLocaleString()} Toman </p>

                        <div className="mt-3 ">
                            <p className="font-semibold"> People: </p>
                            <div className="flex gap-2 mt-2">
                                {trip.people.map((person) => (
                                    <span key={person.id} className="badge bg-white"> {person.name} </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-3">

                            <p className="font-semibold"> Activities: </p>
                            <div className="flex gap-2 mt-2">
                                {trip.activities.map((activity) => (
                                    <span key={activity.id} className="badge bg-white" >{activity.title}</span>
                                ))}
                            </div>
                        </div>
                        <Link to={`/myTrips/${trip.id}`} className="mt-5" > View Trip → </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default MyTravels;

