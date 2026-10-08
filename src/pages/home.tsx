import { useState } from "react";
import { Link } from "react-router";
import {useCountryContext ,type Country} from "../context/countrycontext";
import Hero from "../components/hero";
import { Search, X } from "lucide-react"

function Home() {
    const { countries } = useCountryContext()
    const [search, setSearch] = useState("")
    const [result, setResult] = useState<Country[]>([])

    function handleSearch(e:React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setSearch(value)
        const searchedCountries = countries.filter((country) => (
            country.name.toLowerCase().includes(value.toLowerCase())
        ))
        setResult(searchedCountries)
    }

    function deleteSearch() {
        setSearch("")
    }
    return (
        <div>
            <Hero />
            <section className="sm:pt-18 pt-9 flex flex-col sm:px-10 px-5 bg-[#f1eee277]">
                <h3 className="sm:text-3xl font-sans font-bold text-[#072629] sm:pb-19 pb-9 text-center pt-5  px-1">Search By Countries Find Dream</h3>
                <div className=" border rounded-full sm:px-4 px-2 sm:w-150 border-[#26141A] flex self-center items-center justify-between">
                    <div className=" flex items-center">
                        <Search className="size-5.5 text-[#26141A] " />
                        <input type="text" value={search} onChange={handleSearch} placeholder="Where to go?" className=" sm:py-4 py-2.5 pl-2 outline-none sm:pr-35 sm:placeholder:text-lg" />
                    </div>
                    {search && (<button onClick={deleteSearch} className="pl-3"><X /></button>)}
                </div>

                {search && (
                    <div>
                        <h3 className="sm:text-xl font-bold text-[#26141ab3] sm:pt-0 pt-5">Search results</h3>
                        <div className="flex flex-wrap sm:max-h-900 mah-h-450  sm:gap-y-4 gap-x-7 sm:pb-10 pb-5 sm:pt-15 pt-6 border-b border-b-[#26141A]">
                            {result.length > 0 ? (result.map((country) => (
                                <Link key={country.numericCode} to={`/country/${country.numericCode}`} className="flex items-center gap-2  hover:border hover:border-[#e2e0d7] py-3 pl-3 rounded-3xl pb-4 hover:bg-[#F1EEE2] ">
                                    {country.flags.png !== "" && (<img src={country.flags.png} className="w-8 h-5 rounded-sm" />)}
                                    <h1 className="text-base w-45 font-semibold line-clamp-1 ">{country.name}</h1>
                                </Link>
                            )
                            )
                            ) : (<p className="sm:text-3xl font-bold sm:pb-16 pb-7 text-[#26141A]">{`Sorry, We Couden't find "${search}"`}</p>)}
                        </div>
                    </div>


                )}

                <div>
                    <h3 className="sm:text-3xl font-sans font-bold text-[#072629] sm:pb-12 pb-6 sm:pt-30 pt-15 px-1">Popular Destinations</h3>
                    <div className="grid grid-cols-2 sm:gap-x-7 gap-x-2 sm:h-80 h-40">
                        <div className="bg-[url(/assets/palm-tree-street-los-angeles-pc-ryan-herron-getty.webp)] rounded-xl flex  bg-cover bg-center sm:pb-3 sm:pl-3"><p className="sm:text-3xl font-sans font-bold text-[#FFFBEB] backdrop-blur-xs sm:px-4 px-2 sm:pt-2 pt-1 sm:pb-3 pb-2 rounded-xl self-end">California</p></div>
                        <div className="bg-[url(/assets/images.jpg)] rounded-xl flex bg-cover bg-center sm:pb-3 sm:pl-3"><p className="sm:text-3xl font-sans font-bold text-amber-50 backdrop-blur-xs sm:px-4 px-2 sm:pt-2 pt-1 sm:pb-3 pb-2 rounded-xl self-end">New York</p></div>
                    </div>
                    <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-x-7 sm:gap-y-0 gap-y-2 gap-x-2 sm:h-80  sm:mt-7 mt-2">
                        <div className="bg-[url(/assets/8qSJvU2.jpg)] rounded-xl flex bg-cover bg-center  sm:pb-3 sm:pl-3 h-40 sm:h-80"><p className="sm:text-3xl font-sans font-bold text-[#FFFBEB] backdrop-blur-xs sm:px-4 px-2 sm:pt-2 pt-1 sm:pb-3 pb-2 rounded-xl self-end">Paris</p></div>
                        <div className="bg-[url(/assets/717538-1920x1080-desktop-1080p-tokyo-japan-background-photo.jpg)] rounded-xl flex bg-cover bg-center  sm:pb-3 sm:pl-3"><p className="sm:text-3xl font-sans font-bold text-[#FFFBEB] backdrop-blur-xs sm:px-4 px-2 sm:pt-2 pt-1 sm:pb-3 pb-2 rounded-xl self-end">Tokyo</p></div>
                        <div className="bg-[url(/assets/ima.jpg)] rounded-xl flex bg-cover bg-center  sm:pb-3 sm:pl-3 h-40 sm:h-80 sm:w-auto w-70"><p className="sm:text-3xl font-sans font-bold text-[#FFFBEB] backdrop-blur-sm sm:px-4 px-2 sm:pt-2 pt-1 sm:pb-3 pb-2 rounded-xl self-end">Singapore</p></div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h2 className="sm:text-3xl font-sans font-bold text-[#072629] text-center sm:mb-15 mb-7 sm:mt-25 mt-12 self-center sm:w-80 w-40 border-b border-b-[#26141a8d] pb-5 ">Destinations</h2>
                    <div className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2 md:gap-y-7 md:gap-x-8 pb-5 xl:max-h-90 md:max-h-50 max-h-40 overflow-x-auto scroll-smooth scrollbar-thumb-[#26141ac4] scrollbar-track-[#FFFBEB] sm:mb-10 mb-5 ">
                        {countries.map((country) => (
                            <Link key={country.numericCode} to={`/country/${country.numericCode}`} className="flex items-center gap-2 hover:border hover:border-[#e2e0d7] py-3 pl-3 pr-2 rounded-3xl  hover:bg-[#F1EEE2] ">
                                {country.flags.png !== "" && (<img src={country.flags.png} className="sm:w-17 w-7 h-4 sm:h-11 rounded-sm " />)}
                                <h1 className="sm:text-sm text-xs sm:w-50  w-25 text-[#140c0ffa] font-medium line-clamp-1">{country.name}</h1>
                            </Link>
                        )
                        )}
                    </div>
                </div>
            </section>
            <div className="flex flex-col gap-4 xl:px-35 lg:px-22 sm:px-15 px-5 bg-[#F1EEE2] sm:pb-15 pb-7">
                <h3 className="sm:text-3xl font-sans font-bold text-[#072629] text-center sm:pb-20 pb-10 sm:pt-18 pt-9 ">Frequently Asked Questions</h3>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title font-semibold text-[#26141A] text-sm sm:text-base">How do I create an account?</div>
                    <div className="collapse-content sm:text-sm text-xs">Click the "Log in" button in the top right corner and follow the registration process.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold text-[#26141A] text-sm sm:text-base">I forgot my password. What should I do?</div>
                    <div className="collapse-content sm:text-sm text-xs">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold text-[#26141A] text-sm sm:text-base">How do I update my profile information?</div>
                    <div className="collapse-content sm:text-sm text-xs">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold text-[#26141A] text-sm sm:text-base">Do you offer discount for group booking?</div> 
                    <div className="collapse-content sm:text-sm text-xs">Yes, We have discount for it.</div>
                </div>
                <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title font-semibold text-[#26141A] text-sm sm:text-base">can I cancel or reschedule my trip?</div>
                    <div className="collapse-content sm:text-sm text-xs">Go to "My Account" settings and select "My Trip" to make changes.</div>
                </div>
            </div>

        </div>
    )
} export default Home;