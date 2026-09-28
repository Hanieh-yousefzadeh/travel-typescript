import { useContext, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router";
import { AuthContext } from "../context/authcontect";
import { UserRound, Heart, TextAlignJustify, X, MapPinned } from "lucide-react"
import { CountryContext } from "../context/countrycontext";

function Header() {

    const navigate = useNavigate();

    const { user, setUser } = useContext(AuthContext)
    const { favorites, setFavorites } = useContext(CountryContext)
    function handelLog() {
        setUser(null)
        setFavorites([])
        localStorage.removeItem("user")
        localStorage.removeItem("favorites")
        navigate("/login")
    }

    const [isOpen, setIsOpen] = useState(false);
    function handelClick() {
        return setIsOpen(!isOpen)
    }
    return (
        <nav className="relative">
            <div className=" bg-[#EBE6D4]  sm:h-17 h-11 w-full sm:px-10 px-5 flex items-center justify-between text-[#072629]">
                <Link to="/" className=" xl:text-3xl text-xl font-bold flex items-baseline"><MapPinned className="size-5 text-[#072629ad]" />Tripy</Link>
                <button onClick={handelClick} className="sm:hidden ">
                    {isOpen ? (<X className="p-0.5 w-7 h-6 sm:w-9 sm:h-8 rounded-sm text-[#26141A]" />)
                        :
                        (<TextAlignJustify className="p-0.5 w-7.5 h-7 sm:w-9 sm:h-8 rounded-sm text-[#26141A]" strokeWidth={3} />)
                    }
                </button>
                <div className="sm:flex lg:gap-10 gap-5 text-base font-medium items-center hidden">
                    <NavLink to="/favorite" className={({ isActive }) => `flex items-center gap-1 hover:border-b hover:border-b-[#072629] px-2 py-2 ${isActive ? "border-b border-b-[#072629]" : "text-[#072629]"}`} >
                        {({ isActive }) => (
                            <>
                                <Heart className={`lg:size-7 p-1 rounded-full border-2 text-[#072629ad] ${isActive ? "fill-[#072629ad]" : "fill-none"}`} />
                                favorite
                            </>
                        )}
                    </NavLink>
                    {!user && (<Link to="/login" className="rounded-full bg-amber-50 pt-2 pb-3 px-7 hover:bg-[#072629ad] hover:text-amber-50"> Login</Link>)}
                    {user && (
                        <div className="flex lg:gap-10 gap-5 items-center">
                            <NavLink to="/profile" className={({ isActive }) => `flex gap-1 items-center  hover:border-b hover:border-b-[#072629] px-2 py-2 ${isActive ? " border-b border-b-[#072629]" : "text-[#072629]"}`}>
                                {({ isActive }) => (
                                    <>
                                        <UserRound className={`lg:size-7  p-1 rounded-full text-[#072629ad] border-2  ${isActive ? "fill-[#072629ad]" : "fill-none"}`} strokeWidth={2} />
                                        My Account
                                    </>
                                )}
                            </NavLink>
                            <NavLink to="/myTrips" className={({ isActive }) => `flex gap-1 items-center  hover:border-b hover:border-b-[#072629] px-2 py-2 ${isActive ? " border-b border-b-[#072629]" : "text-[#072629]"}`}>
                                {({ isActive }) => (
                                    <>
                                        <UserRound className={`lg:size-7  p-1 rounded-full text-[#072629ad] border-2  ${isActive ? "fill-[#072629ad]" : "fill-none"}`} strokeWidth={2} />
                                        My Trips
                                    </>
                                )}
                            </NavLink>
                            <button onClick={handelLog} className="rounded-full bg-amber-50 sm:pt-1 sm:pb-2 sm:px-5  hover:bg-[#072629] hover:text-amber-50">Logout</button>
                        </div>)}
                </div>
            </div >
            {isOpen && (
                <div className="felx flex-col justify-self-end  bg-[#EBE6D4] absolute top-13 right-5 px-4 py-3 rounded-sm">
                    <Link to="/favorite" className=" flex  pb-2 justify-end">favorite</Link>
                    {!user && (<Link to="/login" className="rounded-full  pb-3 self-end"> Login</Link>)}
                    {user && (
                        <div className="flex flex-col items-end">
                            <Link to="/profile" className="flex pb-1 items-center hover:rounded-full ">Profile</Link>
                            <button onClick={handelLog} className="rounded-full sm:pt-1 sm:pb-2 sm:px-5">Logout</button>
                        </div>)}
                </div>
            )
            }

        </nav>
    )
}
export default Header;