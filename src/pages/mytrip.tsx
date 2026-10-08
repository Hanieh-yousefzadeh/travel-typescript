import { useCountryContext } from "../context/countrycontext";
import { Link } from "react-router";

function MyTrip() {
    const { favorites } = useCountryContext()
    console.log(favorites);
    return (
        <section className="flex justify-center min-h-180 bg-[#cee1cd71]">
            {favorites.length === 0 ? (<h3 className="sm:text-2xl font-sans font-semibold text-[#072629] text-center pt-20">You Have No Favorite Lists</h3>) : (
                <div>

                    <table className="" >
                        <caption className=" caption-top sm:text-2xl text-lg sm:pr-22 font-semibold pt-15 text-[#072629] pb-18">My Favorite Trip</caption>
                        <thead className="">
                            <tr className="border-b border-[#26141a53] text-[#072629] sm:text-lg text-sm">
                                <th className=" lg:px-0 sm:pl-6 pr-10 pb-5">City</th>
                                <th className="pr-15 lg:px-0 sm:pl-10 pb-5">Country</th>
                            </tr>
                        </thead>
                        <tbody className="">

                            {favorites.map((country) => (

                                <tr key={country.numericCode} className=" text-[#5A392D] hover:bg-[#FFFBEB] hover:font-semibold">
                                    <td className="sm:pl-15  py-5 border-b border-[#26141a53] text-sm sm:text-lg" >
                                        <Link to={`/country/${country.numericCode}`}>{country.capital ? (country.capital) : "DownTown"}</Link>
                                    </td>
                                    <td className="sm:pl-38 pl-10  py-5 border-b border-[#26141a53] text-sm sm:text-lg">
                                        <Link to={`/country/${country.numericCode}`}>{country.name}</Link>
                                    </td>
                                </tr >
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </section>

    )
}
export default MyTrip;