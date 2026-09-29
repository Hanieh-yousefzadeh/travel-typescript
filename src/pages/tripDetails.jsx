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
    const [editingExpenseId, setEditingExpenseId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");

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
    function selectCategory(e) {
        setSelectedCategory(e.target.value)
    }




    const trip = state.trips.find((trip) => trip.id === Number(tripId));
    // console.log(trip);
    console.log(trip.expenses);
    if (!trip) {
        return <p>Trip not found.</p>;
    }

    function addExpense() {

        const newExpense = {
            id: editingExpenseId ? editingExpenseId : Date.now(),
            title: expenseTitle,
            category: expenseCategory,
            amount: Number(expenseAmount),
            paidBy: expensePaidBy
        };

        // console.log(newExpense);

        dispatch({
            type: editingExpenseId !== null ? "editExpense" : "addExpense",
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

    const totalExpenses = (trip.expenses || []).reduce((total, expense) => total + expense.amount, 0);
    const remainingBudget = trip.budget - totalExpenses;

    function deleteExpense(expenseId) {
        dispatch({
            type: "deleteExpense",
            payload: {
                tripId: trip.id,
                expenseId: expenseId
            }
        });

    }
    function deleteAllEXpense() {
        dispatch({
            type: "deleteAllExpenses",
            payload: {
                tripId: trip.id
            }
        });
    }
    function editExpense(expense) {
        setEditingExpenseId(expense.id);

        setExpenseTitle(expense.title);
        setExpenseCategory(expense.category);
        setExpenseAmount(expense.amount);
        setExpensePaidBy(expense.paidBy);

        setIsExpenseModalOpen(true);
    }

    const filteredExpenses = selectedCategory === "all" ? trip.expenses || [] : (trip.expenses || []).filter((expense) => expense.category === selectedCategory);

    return (
        <div>
            <h1>Trip Details</h1>
            <button className="btn" onClick={deleteAllEXpense} > Delete All </button>
            <select value={selectedCategory} onChange={selectCategory} className="select bg-[#F1EEE2]">
                <option value="all"> All categories </option>
                {categories.map((category) => (<option key={category} value={category} > {category}</option>
                ))}
            </select>
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

                        <h3 className="text-xl font-bold"> {editingExpenseId !== null ? "Edit Expense" : "Add Expense"}</h3>

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
                            <button className="btn" onClick={addExpense}>  {editingExpenseId !== null ? "Save Changes" : "Add Expense"}</button>
                        </div>

                    </div>
                </dialog>
            )}
            <div className="">

                <h2 className="text-2xl font-bold">Expenses </h2>
                <p>Total Expenses:{" "} {totalExpenses.toLocaleString()} Toman</p>

                {filteredExpenses.length === 0 ? (<p className="mt-4">No expenses yet.</p>) : (

                    <div className="">

                        {filteredExpenses.map((expense) => (

                            <div key={expense.id} className="border">

                                <h3 className="font-bold">{expense.title} </h3>
                                <p> Category: {expense.category} </p>
                                <p> Amount:{" "}{expense.amount.toLocaleString()} Toman</p>
                                <p> Paid by: {expense.paidBy}</p>
                                <p>Remaining Budget:{" "}{remainingBudget.toLocaleString()} Toman</p>

                                <div className="flex gap-3">
                                    <button className="btn" onClick={() => editExpense(expense)}>Edit</button>
                                    <button className="btn" onClick={() => deleteExpense(expense.id)}>Delete </button>

                                </div>
                            </div>

                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
export default TripDetails;