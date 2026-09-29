import { useContext, useState } from "react";
import { useParams } from "react-router";
import { TripContext } from "../context/tripcontext";
import { categories } from "../data/categoris";


function TripDetails() {

    const { tripId } = useParams();
    const { state, dispatch } = useContext(TripContext);
    // console.log(tripId);
    // console.log(state.trips);

    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    const [expenseTitle, setExpenseTitle] = useState("");
    const [expenseCategory, setExpenseCategory] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expensePaidBy, setExpensePaidBy] = useState("");

    function handleShowExpense() {
        setIsExpenseModalOpen(true)
    }
    function closeModal() {
        setIsExpenseModalOpen(false)
    }
    function inputExpenseTitle(e) {
        setExpenseTitle(e.target.value)
    }

    function handleExpenseCategory(e) {
        setExpenseCategory(e.target.value)
    }

    function handleExpenseAmount(e) {
        setExpenseAmount(e.target.value)
    }

    function handleExpensePaidBy(e) {
        setExpensePaidBy(e.target.value)
    }



    const trip = state.trips.find((trip) => trip.id === Number(tripId));
    // console.log(trip);
    console.log(trip.expenses);
    if (!trip) {
        return <p>Trip not found.</p>;
    }

    function addExpense() {

        const newExpense = {
            id: Date.now(),
            title: expenseTitle,
            category: expenseCategory,
            amount: Number(expenseAmount),
            paidBy: expensePaidBy
        };

        // console.log(newExpense);

        dispatch({
            type: "addExpense",
            payload: {
                tripId: trip.id,
                expense: newExpense
            }
        });

        setExpenseTitle("");
        setExpenseCategory("");
        setExpenseAmount("");
        setExpensePaidBy("");

        setIsExpenseModalOpen(false);
    }


    return (
        <div>
            <h1>Trip Details</h1>
            <h2> Destination :{trip.country}</h2>

            <div className="flex">
                <h3>People :</h3>
                {trip.people.map((person) => (<span key={person.id}> {person.name} </span>))}
            </div>
            <p> Budget: {trip.budget.toLocaleString()} Toman</p>

            <div className="flex">
                <h3>Activities :</h3>
                {trip.activities.map((activity) => (<span key={activity.id} > {activity.title}</span>))}
            </div>
            <button className="btn " onClick={handleShowExpense}>  + Add Expense </button>

            {isExpenseModalOpen && (
                <dialog id="my_modal_5" className="modal modal-open modal-bottom sm:modal-middle">
                    <div className="modal-box bg-white">

                        <h3 className="text-xl font-bold"> Add Expense </h3>

                        <div>
                            <label className=""> What did you spend on? </label>
                            <input type="text" className="input input-bordered" placeholder="e.g. Dinner" value={expenseTitle} onChange={inputExpenseTitle} />
                        </div>
                        <div>
                            <label className=""> Category</label>

                            <select className="select select-bordered bg-[#F1EEE2]" value={expenseCategory} onChange={handleExpenseCategory} >
                                <option value=""> Select category </option>
                                {categories.map((category) => (<option key={category} value={category} className="">{category} </option>))}
                            </select>
                        </div>
                        <div>
                            <label className=""> Amount (Toman)</label>
                            <input type="number" className="input input-bordered " placeholder="200,000,000" value={expenseAmount} onChange={handleExpenseAmount} />
                        </div>
                        <div>
                            <label className=""> Who paid? </label>
                            <select className="select select-bordered bg-[#F1EEE2]" value={expensePaidBy} onChange={handleExpensePaidBy}>
                                <option value="">  Select person</option>
                                {trip.people.map((person) => (<option key={person.id} value={person.name} > {person.name} </option>))}
                            </select>
                        </div>

                        <div className="modal-action mt-20">
                            <button className="btn " onClick={closeModal} >  Cancel </button>
                            <button className="btn" onClick={addExpense}>  Add Expense</button>
                        </div>

                    </div>
                </dialog>
            )}
        </div>
    );
}
export default TripDetails;