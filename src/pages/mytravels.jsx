import { useState, useContext } from "react";
import { CountryContext } from "../context/countrycontext";
import { Link } from "react-router";
import { TripContext } from "../context/tripcontext";
import { Plus, Trash, PencilSparkles, MoveRight } from "lucide-react"



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


    function handleSelectCard(e) {
        setCountry(e.target.value)
    }
    function handleBudget(e) {
        setBudget(e.target.value)
    }

    function handlePersonInput(e) {
        setPersonInput(e.target.value)
    }

    function selectCountry(e) {
        setFilterCountry(e.target.value)
    }




    function saveTrip() {

        if (!country) {
            alert("Please select a country");
            return;
        }

        if (!budget || Number(budget) <= 0) {
            alert("Please enter a valid budget");
            return;
        }

        if (editingTripId) {

            const updatedTrip = {
                id: editingTripId,
                country,
                people: person,
                budget: Number(budget),
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
        setPerson([{
            id: Date.now(),
            name: user.name
        }])


    }
    function deleteTrip(id) {
        dispatch({
            type: "deleteTrip",
            payload: id
        });
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

        setIsModalOpen(true);
    }



    return (
        <section className="xl:min-h-160 min-h-105 px-5 py-15  xl:py-15 items-start bg-[#e9f2e95e] xl:px-12">
            <div className="flex sm:flex-row flex-col xl:pr-10  ">
                <button className="bg-[#EBE6D4] self-start rounded-lg text-[#072629] px-5 py-2  sm:mr-5 cursor-pointer font-semibold hover:bg-[#072629ad] hover:text-amber-50 text-lg" onClick={openModal}>Add Trip</button>

                {state.trips.length > 0 && (
                    <div className="flex sm:gap-0 gap-2 sm:mt-0 mt-5">
                        <select className="select select-bordered  w-35 sm:h-11 rounded-lg bg-[#F1EEE2]" value={filterCountry} onChange={selectCountry}>
                            <option value="">All Countries</option>
                            {countries.map((country) => (<option key={country.numericCode} value={country.name} > {country.name}</option>
                            ))}
                        </select>
                        <button className="border-2 border-[#e9e3cae9] sm:mt-0.5 mt-1.5 text-[#072629c5] rounded-lg self-start sm:h-10 sm:px-2  sm:ml-5 hover:bg-[#e9e3cae9] " onClick={deleteAllTrips} > <Trash className="hover:fill-[#07262976] cursor-pointer sm:p-0 p-1" /> </button>
                    </div>

                )}
            </div>
            {isModalOpen && (
                <dialog id="my_modal_4" className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-5xl bg-white rounded-2xl text-[#072629]">

                        <div className="grid gap-5">
                            <div className="flex gap-3">
                                <label> <span className="sm:text-base text-xs">Where do you want to go?</span> </label>

                                <select className="select select-bordered rounded-lg bg-[#f1eee2f4] sm:text-base text-xs" value={country} onChange={handleSelectCard}>
                                    <option value=""> Select country </option>
                                    {countries.map((country) => (
                                        <option key={country.numericCode} value={country.name} > {country.name} </option>
                                    ))}
                                </select>
                            </div>



                            <div className="flex gap-3">
                                <label><span className="sm:text-base text-xs"> Budget (Toman) </span></label>
                                <input type="number" placeholder="5000000000" className=" ml-2 input input-bordered rounded-lg bg-[#f1eee2b3] sm:placeholder:text-base placeholder:text-xs" value={budget} onChange={handleBudget} />

                            </div>

                            <div>
                                <div className=" flex sm:gap-3 gap-1.5 ">
                                    <label className="pt-1"><span className="sm:text-base text-xs">Who is traveling?</span> </label>
                                    <input type="text" placeholder="e.g. ghazal" className="input input-bordered rounded-lg bg-[#f1eee2b3] sm:text-base text-xs" value={personInput} onChange={handlePersonInput} />
                                    <button className=" border-[#e9e3cacd] border-3 rounded-lg  px-1.5 sm:h-auto h-7 sm:mt-0 mt-1.5 text-[#072629c8] hover:bg-[#072629ad] hover:border-[#07262919] hover:text-amber-50 " onClick={addPerson}><Plus strokeWidth={2.5} className="sm:size-auto size-3" /> </button>
                                </div>
                                <div className="flex gap-3 mt-2">
                                    {person.map((person, index) => (

                                        <div key={person.id} className="sm:text-base text-xs badge badge-lg gap-5 px-2 pt-3 pb-4 rounded-lg bg-[#f1eee2b3]">

                                            {person.name}
                                            {index !== 0 && (
                                                <button type="button" onClick={() => deletePerson(person.id)} > × </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="modal-action">
                            <button onClick={saveTrip} className="font-semibold border-[#e9e3ca] border-3 rounded-lg px-2 pb-1.5 pt-1 text-[#072629c8] hover:bg-[#072629ad] hover:border-[#07262919] hover:text-amber-50 sm:text-base text-xs">{editingTripId ? "Save Changes" : "Add Trip"} </button>
                            <button className="font-semibold border-[#e9e3ca] border-3 rounded-lg px-4 pb-1.5 pt-1 text-[#072629c8] hover:bg-[#072629ad] hover:border-[#07262919] hover:text-amber-50 sm:text-base text-xs" onClick={closeModal}>Close</button>
                        </div>


                    </div>
                </dialog>
            )}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-5">
                {filteredTrips.map((trip) => (

                    <div key={trip.id} className="card bg-[#F1EEE2] rounded-xl shadow-md p-5 mt-25 text-[#072629]" >

                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold "> {trip.country} </h2>

                            <div className="flex gap-2 sm:mt-0 mt-2 ">
                                <button onClick={() => editTrip(trip)} ><PencilSparkles className="size-5 cursor-pointer hover:fill-[#07262976]" /></button>
                                <button onClick={() => deleteTrip(trip.id)}> <Trash className="size-5 cursor-pointer hover:fill-[#07262976]" /></button>
                            </div>

                        </div>
                        <p className="mt-5 font-medium text-[#072629d0]"> Budget : {trip.budget.toLocaleString()} T </p>

                        <div className=" flex items-baseline font-medium text-[#072629d0]">
                            <p className="font-semibold"> People : </p>
                            <div className="flex gap-2 mt-2 pl-2">
                                {trip.people.map((person) => (
                                    <span key={person.id} className=""> {person.name} </span>
                                ))}
                            </div>
                        </div>

                        <Link to={`/myTrips/${trip.id}`} className="mt-5 font-semibold flex  items-center gap-1 self-end" > View Trip <MoveRight className="size-4.5 pt-1" /> </Link>
                    </div>

                ))}
            </div>
        </section>
    )
}
export default MyTravels;

