import { useState} from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/authcontect";
import { TriangleAlert } from "lucide-react"


function Login() {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [family, setFamily] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [rememberMe, setRememberMe] = useState(false)

    const [error, setError] = useState("")

    const { setUser } = useAuthContext();

    const correctEmail = "royaltrip@gmail.com"
    const correctPassword = "14725869"



    function handelSubmit(e: React.SubmitEvent<HTMLFormElement>) {

        e.preventDefault();

        if (name.trim() === "") {
            setError("please enter name");
            return
        }
        if (family.trim() === "") {
            setError("please enter family");
            return
        }
        if (email.trim() === "") {
            setError("please enter email");
            return
        }
        if (email !== correctEmail) {
            setError("email invalid");
            return
        }
        if (password.trim() === "") {
            setError("please enter password");
            return
        }
        if (password !== correctPassword) {
            setError("password invalid");
            return
        }
        if (confirmPassword.trim() === "") {
            setError("please enter confirmPassword");
            return
        }

        if (confirmPassword !== password) {
            setError("passwords do not match");
            return
        }

        setError("");

        setUser({
            name: name,
            family: family,
            email: email
        })
        if (rememberMe) {
            localStorage.setItem("user", JSON.stringify({ name: name, family: family, email: email }));
        }

        navigate("/")
    }

    function handelName(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setName(value)
    }

    function handelFamily(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setFamily(e.target.value)
    }

    function handelEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setEmail(value)
    }

    function handelPassword(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setPassword(value)
    }
    function handelConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setConfirmPassword(value)
    }

    function handleRemember(e: React.ChangeEvent<HTMLInputElement>) {
        const checked = e.target.checked
        setRememberMe(checked)
    }



    return (
        <section className="flex xl:px-50 sm:px-10 px-5  sm:py-10 py-5 ">
            <div className="sm:bg-[url(/assets/images/1525279728795.webp)] sm:h-138 h-70 bg-cover bg-center w-[50%] sm:rounded-tl-4xl sm:rounded-bl-4xl rounded-tl-2xl rounded-bl-2xl bg-none"></div>
            <div className="flex flex-col sm:w-[50%] w-full bg-[#E9F2E9] sm:rounded-tr-4xl sm:rounded-br-4xl sm:rounded-tl-none sm:rounded-bl-none rounded-2xl px-5">
                <h1 className="sm:text-4xl font-bold text-[#00251C] text-center pt-6 sm:pb-10 pb-5 ">Welcome</h1>
                <form onSubmit={handelSubmit} className="flex flex-col flex-1 pb-5">
                    {error && (<p className="flex gap-2 items-center self-center text-red-700"><TriangleAlert className="size-5 text-red-700" />{error}</p>)}

                    <label className="flex flex-col self-center gap-2 sm:pb-8 pb-6">
                        <input type="text" value={name} placeholder="Name" onChange={handelName} className="border-b-2 border-[#0726293f] pb-1 lg:w-90 sm:w-72 w-60 outline-none placeholder:text-[#00251C] placeholder:font-medium sm:placeholder:text-base placeholder:text-sm" />
                    </label>


                    <label className="flex flex-col self-center gap-2 sm:pb-8 pb-6">
                        <input type="text" value={family} placeholder="Family" onChange={handelFamily} className="border-b-2 border-[#0726293f] pb-1 lg:w-90 sm:w-72 w-60 outline-none placeholder:text-[#00251C] placeholder:font-medium sm:placeholder:text-base placeholder:text-sm" />
                    </label>


                    <label className="flex flex-col self-center gap-2 sm:pb-8 pb-6">
                        <input type="email" value={email} placeholder="E-mail" onChange={handelEmail} className="border-b-2 border-[#0726293f] pb-1 lg:w-90 sm:w-72 w-60 outline-none placeholder:text-[#00251C] placeholder:font-medium sm:placeholder:text-base placeholder:text-sm" />
                    </label>

                    <label className="flex flex-col self-center gap-2 sm:pb-8 pb-6">
                        <input type="password" value={password} placeholder="Password" onChange={handelPassword} className="border-b-2 border-[#0726293f] pb-1 lg:w-90 sm:w-72 w-60 outline-none placeholder:text-[#00251C] placeholder:font-medium sm:placeholder:text-base placeholder:text-sm" />
                    </label>

                    <label className="flex flex-col self-center gap-2 sm:pb-4 pb-3 ">
                        <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={handelConfirmPassword} className="border-b-2 border-[#0726293f] pb-1 lg:w-90 sm:w-72 w-60 outline-none placeholder:text-[#00251C] placeholder:font-medium sm:placeholder:text-base placeholder:text-sm" />
                    </label>

                    <label className="xl:pl-20 pl-1 lg:pl-8 font-medium flex gap-1.5 pb-1.5 text-[#00251C] text-xs">
                        <input type="checkbox" checked={rememberMe} onChange={handleRemember} className="checkbox checked:text-[#00251C] bg-[#EBE6D4] rounded-sm h-4.5 w-4.5 border-[#0726293f] border" /> Remember Me
                    </label>

                    <button type="submit" className="text-[#26141A] sm:text-xl self-center font-bold rounded-full bg-amber-50 pt-2 pb-3 lg:px-40 sm:px-30 px-25 hover:bg-[#072629ad] hover:text-amber-50 sm:mt-10 mt-7">Login</button>

                </form>
            </div>

        </section>
    )
}
export default Login;