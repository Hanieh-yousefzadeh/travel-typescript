import { useContext } from "react";
import { AuthContext } from "../context/authcontect";
import { CircleUserRound } from "lucide-react"

function Profile() {
    const { user } = useContext(AuthContext)
    console.log(user);

    return (
        <section className="min-h-159 flex flex-col sm:pt-20 pt-10 items-center bg-[#e9f2e95e]">
            <h1 className="sm:text-2xl text-lg font-sans font-semibold text-[#072629] pb-10">Personal Information</h1>
            <div className="sm:flex-row flex flex-col lg:p-15 p-5 lg:gap-15 gap-7 bg-[#E9F2E9] rounded-2xl">
                <span className="sm:px-7 sm:pt-6 rounded-2xl bg-[#fffbebc0]"><CircleUserRound className="sm:size-55 size-40 text-[#072629ad] sm:pl-0 pl-7" strokeWidth={0.8} /></span>
                <div className="flex flex-col lg:gap-5 gap-3">
                    <div className="font-medium text-[#26141ad4] sm:text-base text-sm">First Name
                        <h3 className="font-normal text-sm bg-[#fffbebc0] sm:rounded-2xl rounded-lg pl-4 sm:pr-60 pr-10 sm:pt-3 pt-1 sm:pb-4 pb-2 mt-1">{user.name}</h3>
                    </div>
                    <div className="font-medium text-[#26141ad4] sm:text-base text-sm">Last Name
                        <h3 className="font-normal text-sm bg-[#fffbebc0] sm:rounded-2xl rounded-lg pl-4 sm:pr-60 pr-10 sm:pt-3 pt-1 sm:pb-4 pb-2 mt-1">{user.family}</h3>
                    </div>
                    <div className="font-medium text-[#26141ad4] sm:text-base text-sm">E-mail
                        <h3 className="font-normal text-sm bg-[#fffbebc0] sm:rounded-2xl rounded-lg pl-4 sm:pr-60 pr-10 sm:pt-3 pt-1 sm:pb-4 pb-2 mt-1">{user.email}</h3>
                    </div>
                </div>
            </div>
        </section>

    )
}
export default Profile;