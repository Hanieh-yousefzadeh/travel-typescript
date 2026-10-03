import { useContext, useState } from "react";
import { useParams } from "react-router";
import { TripContext } from "../context/tripcontext";
import { categories } from "../data/categoris";
import { Trash, PencilSparkles, Ticket, Banknote } from "lucide-react"


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
    const [selectedPerson, setSelectedPerson] = useState("all");

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
        setSelectedPerson("all")
    }
    function selectPerson(e) {
        setSelectedPerson(e.target.value)
        setSelectedCategory("all")
    }




    const trip = state.trips.find((trip) => trip.id === Number(tripId));
    // console.log(trip);
    // console.log(trip.expenses);
    if (!trip) {
        return <p>Trip not found.</p>;
    }

    function addExpense() {

        if (!expenseTitle.trim()) {
            alert("Please enter expense title");
            return;
        }

        if (!expenseCategory) {
            alert("Please select a category");
            return;
        }

        if (!expenseAmount || Number(expenseAmount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        if (!expensePaidBy) {
            alert("Please select who paid");
            return;
        }

        const newExpense = {
            id: editingExpenseId !== null ? editingExpenseId : Date.now(),
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
        setEditingExpenseId(null);

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

    let filteredExpenses = trip.expenses || [];

    if (selectedCategory !== "all") {
        filteredExpenses = filteredExpenses.filter(
            (expense) => expense.category === selectedCategory
        );
    }
    if (selectedPerson !== "all") {
        filteredExpenses = filteredExpenses.filter(
            (expense) => expense.paidBy === selectedPerson
        );
    }
    return (
        <div className="min-h-160 bg-[#F7FAF7]">

            <div className="flex  gap-2 justify-center py-15">
                <button className="bg-[#F1EEE2] self-start rounded-lg text-[#072629] px-5 py-2  cursor-pointer font-semibold hover:bg-[#072629ad] hover:text-amber-50 text-lg" onClick={handleShowExpense}>  Add Expense </button>

                <select value={selectedCategory} onChange={selectCategory} className="select select-bordered  w-35 sm:h-11 rounded-lg bg-[#F1EEE2]">
                    <option value="all"> All categories </option>
                    {categories.map((category) => (<option key={category} value={category} > {category}</option>
                    ))}
                </select>


                <select value={selectedPerson} onChange={selectPerson} className="select select-bordered  w-35 sm:h-11 rounded-lg bg-[#F1EEE2]">
                    <option value="all">All people </option>
                    {trip.people.map((person) => (<option key={person.id} value={person.name} > {person.name}</option>
                    ))}
                </select>
                <button className="border-2 border-[#e9e3cae9] sm:mt-0.5 mt-1.5 text-[#072629c5] rounded-lg self-start sm:h-10 sm:px-2   hover:bg-[#e9e3cae9] " onClick={deleteAllEXpense} > <Trash className="hover:fill-[#07262976] cursor-pointer sm:p-0 p-1" /></button>
            </div>


            <div className="flex px-10 gap-7 ">
                <div className="flex-1">
                    <div className="card bg-[#F1EEE2] rounded-xl shadow-md p-5  text-[#072629] gap-1 flex flex-row justify-between border-2 border-[#F1EEE2]" >
                        <div>
                            <h2 className="font-bold text-[#072629d0] text-lg"> Destination : {trip.country}</h2>
                            <p className="font-medium text-[#072629b3]"> Budget: {trip.budget.toLocaleString()} T</p>
                            <div className=" flex items-baseline font-medium text-[#072629b3]">
                                <h3 className="font-semibold">People :</h3>
                                <div className="flex gap-2 pl-2">
                                    {trip.people.map((person) => (<span key={person.id}> {person.name} </span>))}
                                </div>
                            </div>
                        </div>
                        <Ticket className="size-18 mt-2 text-[#0726298f] fill-[#F7FAF7]" strokeWidth={1.5} />

                    </div>

                </div>
                <div className="flex-1 border-2 bg-[#F1EEE2] border-[#F1EEE2] rounded-xl p-5 gap-1 flex justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-[#072629d0]">Expenses </h2>
                        <p className="font-medium text-[#072629d0]">Total Expenses :{" "} {totalExpenses.toLocaleString()} T</p>
                        <p className="font-medium text-red-950">Remaining Budget :{" "}{remainingBudget.toLocaleString()} T</p>
                    </div>
                    <Banknote className="size-18 mt-2 text-[#072629d0] fill-[#F7FAF7]" strokeWidth={1.5}/>
                </div>
                

            </div>


            {isExpenseModalOpen && (
                <dialog id="my_modal_5" className="modal modal-open modal-bottom sm:modal-middle ">
                    <div className="modal-box w-11/12 max-w-2xl  bg-white rounded-2xl text-[#072629] grid gap-3">

                        <h3 className="text-xl font-bold pb-5">Expense Details</h3>

                        <div className="flex gap-3">
                            <label className="sm:text-base text-xs pt-1"> What did you spend on? </label>
                            <input type="text" className="input input-bordered rounded-lg bg-[#f1eee2b3] sm:placeholder:text-base placeholder:text-xs" placeholder="e.g. Dinner" value={expenseTitle} onChange={inputExpenseTitle} />
                        </div>
                        <div className="flex gap-3">
                            <label className="sm:text-base text-xs pt-1"> Category</label>

                            <select className="select select-bordered rounded-lg bg-[#f1eee2f4] sm:text-base text-xs" value={expenseCategory} onChange={handleExpenseCategory} >
                                <option value=""> Select category </option>
                                {categories.map((category) => (<option key={category} value={category} className="">{category} </option>))}
                            </select>
                        </div>
                        <div className="flex gap-3">
                            <label className="sm:text-base text-xs pt-1"> Amount (Toman)</label>
                            <input type="number" className="input input-bordered rounded-lg bg-[#f1eee2b3] sm:placeholder:text-base placeholder:text-xs" placeholder="200,000,000" value={expenseAmount} onChange={handleExpenseAmount} />
                        </div>
                        <div className="flex gap-3">
                            <label className="sm:text-base text-xs pt-1"> Who paid? </label>
                            <select className="select select-bordered rounded-lg bg-[#f1eee2f4] sm:text-base text-xs" value={expensePaidBy} onChange={handleExpensePaidBy}>
                                <option value="">  Select person</option>
                                {trip.people.map((person) => (<option key={person.id} value={person.name} > {person.name} </option>))}
                            </select>
                        </div>

                        <div className="modal-action mt-7">

                            <button className="font-semibold border-[#e9e3ca] border-3 rounded-lg px-2 pb-1.5 pt-1 text-[#072629c8] hover:bg-[#072629ad] hover:border-[#07262919] hover:text-amber-50 sm:text-base text-xs" onClick={addExpense}>  {editingExpenseId !== null ? "Save Changes" : "Add Expense"}</button>
                            <button className="font-semibold border-[#e9e3ca] border-3 rounded-lg px-4 pb-1.5 pt-1 text-[#072629c8] hover:bg-[#072629ad] hover:border-[#07262919] hover:text-amber-50 sm:text-base text-xs" onClick={closeModal} >  Cancel </button>
                        </div>

                    </div>
                </dialog>
            )}
            <div className="">


                {filteredExpenses.length === 0 ? (<p className="text-center text-xl font-medium text-[#072629d0] pt-15">No expenses yet.</p>) : (

                    <div className=" p-10 grid sm:grid-cols-3 grid-cols-1 gap-5">

                        {filteredExpenses.map((expense) => (

                            <div key={expense.id} className="card bg-[#F1EEE2] rounded-xl shadow-md p-5  text-[#072629]" >

                                <div className="flex justify-between">
                                    <h3 className="text-2xl font-bold "> {expense.title} </h3>
                                    <div className="flex gap-2 sm:mt-0 mt-2 ">
                                        <button onClick={() => editExpense(expense)} ><PencilSparkles className="size-5 cursor-pointer hover:fill-[#07262976]" /></button>
                                        <button onClick={() => deleteExpense(expense.id)}> <Trash className="size-5 cursor-pointer hover:fill-[#07262976]" /></button>
                                    </div>
                                </div>

                                <p className="font-medium text-[#072629b3]"> Category : {expense.category} </p>
                                <p className="font-medium text-[#072629b3]"> Amount :{" "}{expense.amount.toLocaleString()} Toman</p>
                                <p className="font-medium text-[#072629b3]"> Paid by : {expense.paidBy}</p>
                            </div>

                        ))}
                    </div>
                )}


            </div>
        </div>
    );
}
export default TripDetails;