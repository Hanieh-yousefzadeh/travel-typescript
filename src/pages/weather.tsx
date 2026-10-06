import { useEffect, useState } from "react";
import { Heart, Thermometer, Wind, Droplet } from "lucide-react"
import { useParams } from "react-router";
import { useCountryContext } from "../context/countrycontext";
import { useAuthContext } from "../context/authcontect";

function Weather() {

    const { id } = useParams();
    const { countries, favorites, setFavorites } = useCountryContext()
    const { user } = useAuthContext()
    // console.log(id)
    const country = countries.find((country) => country.numericCode === id);

    const isFavorite = country ? favorites.some((favorite) => favorite.numericCode === country.numericCode) : false;

    // console.log(country)
    // const latitude = country.capitals[0].coordinates.lat;
    // const longitude = country.capitals[0].coordinates.lng;
    // console.log(latitude);
    // console.log(longitude);

    type Weather = {
        current: {
            temperature_2m: number;
            wind_speed_10m: number;
            relative_humidity_2m: number;
        }
    }
    const [weather, setWeather] = useState<Weather | null>(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        if (!country || !country.latlng) {
            setError("Weather information is not available for this country");
            return;
        }
        const latitude = country.latlng[0];
        const longitude = country.latlng[1]

        async function getWeather() {
            setLoading(true)
            setError("")
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`)

                if (!response.ok) {
                    throw new Error("")
                }

                const data = await response.json()
                // console.log(data)
                setWeather(data)
            } catch (error) {
                setError("Something went wrong. Please try again.")
                setWeather(null)
            } finally {
                setLoading(false)
            }
        }; getWeather()
    }, [country])

    if (!country) {
        return <h1 className="h-160 flex justify-center items-center text-xl gap-3"><span className="loading loading-spinner loading-xl"></span></h1>
    }

    if (loading) {
        return <h1 className="h-160 flex justify-center items-center text-xl gap-3"><span className="loading loading-spinner loading-xl"></span></h1>
    }

    if (error) {
        return <h1 className="h-160 flex justify-center items-center text-xl gap-3"><span className="loading loading-spinner loading-xl"></span>{error}</h1>
    }

    if (!weather) {
        return <h1 className="h-160 flex justify-center items-center text-xl gap-3"><span className="loading loading-spinner loading-xl"></span></h1>
    }
    function handleLike() {

        if (!user) {
            setShowModal(true)
            return
        }
        if (!country) {
            return;
        }
        if (isFavorite) {
            const newFavorites = favorites.filter((favorite) => (favorite.numericCode !== country.numericCode))
            setFavorites(newFavorites);
        } else {
            setFavorites([...favorites, country])
        }
    }

    function handleModal() {
        setShowModal(false)
    }


    return (
        <section className=" sm:flex-row flex flex-col lg:gap-15 sm:gap-5 px-5 sm:px-0 bg-[#FEFBEE]">
            <div className="bg-[url(/assets/images/explore-diverse-forests-towering-mountain-ranges-creative-world-map-depicting-unique-landscapes-geography-generative-376782108.webp)] bg-cover lg:h-160 bg-center sm:w-[50%] lg:mr-10"></div>
            <div className="flex flex-col sm:pt-25 pt-10 gap-7 relative">
                <h1 className="lg:text-3xl text-lg font-sans font-bold text-[#072629] line-clamp-2">{country.name}</h1>
                <div className="flex justify-between">
                    {country.capital ? (
                        <div>
                            <h2 className="lg:text-lg text-xs font-medium lg:pt-7 pt-5 pb-3.5 pl-1 text-[#26141A] ">Capital </h2>
                            <span className="pl-3 pr-10 pb-3.5 pt-2.5 rounded-4xl bg-[#95a86b5c] text-[#072629] lg:text-base text-xs">{country.capital}</span>
                        </div>
                    ) : (
                        <div>
                            <h2 className="lg:text-lg text-sm font-medium lg:pt-15 pt-7 pb-3.5 pl-1 text-[#26141A]">Name </h2>
                            <span className="pl-3 pr-10 pb-3.5 pt-2.5 rounded-4xl bg-[#95a86b5c] text-[#072629] lg:text-base text-xs">{country.name}</span>
                        </div>)}
                    <button onClick={handleLike} className="lg:mt-16 sm:mt-12  mt-10 text-[#072629] bg-[#95a86b5c] rounded-full h-10 w-10 sm:mr-0 flex items-center justify-center lg:text-base text-xs"><Heart className={isFavorite ? "text-red-900" : ""} fill={isFavorite ? "currentColor" : "none"} /></button>
                </div>

                <div className="flex xl:gap-15 sm:gap-8 gap-4 pt-5 lg:pt-10 pb-0 sm:pb-10">
                    <div>
                        <h3 className="lg:text-lg text-xs font-medium pb-2 pl-1 text-[#26141A]"> Temperature</h3>
                        <span className="flex items-center lg:pl-3 pl-2 lg:pr-14 sm:pb-3 sm:pt-2 pb-2.5 pt-1.5 rounded-4xl bg-[#95a86b5c] text-[#072629] lg:text-base text-xs"><Thermometer className="sm:size-5.5 size-4" />{weather.current.temperature_2m} °C</span>
                    </div>
                    <div>
                        <h3 className="lg:text-lg text-xs font-medium pb-2 pl-1 text-[#26141A]">wind</h3>
                        <span className="flex items-center lg:pl-3 pl-2 lg:pr-6 pr-2 pb-2.5 pt-1.5 rounded-4xl bg-[#95a86b5c] text-[#072629] lg:text-base text-xs"><Wind className="sm:pr-1.5 pr-0.5 sm:size-7.5 size-5" />{weather.current.wind_speed_10m} km/h</span>
                    </div>
                    <div>
                        <h3 className="lg:text-lg text-xs font-medium pb-2 pl-1 text-[#26141A]">Humidity</h3>
                        <span className="flex items-center lg:pl-3 pl-1 lg:pr-15 pr-7 sm:pb-3 sm:pt-2 pb-2.5 pt-1.5 rounded-4xl bg-[#95a86b5c] text-[#072629] lg:text-base text-xs"><Droplet className="pr-0.5 sm:size-6.5 size-5 " />{weather.current.relative_humidity_2m} %</span>
                    </div>
                </div>

                {showModal && (
                    <div className="bg-[#3A5D62] w-100 p-5 rounded-xl absolute top-52 left-42">
                        <p className="flex justify-between text-xl font-semibold text-[#EBE6D4]">Hello! <button onClick={handleModal}>x</button></p>
                        <h5 className="pt-10 text-lg text-[#FEFBEE]">First Login, and you can add to favorite lists</h5>
                    </div>
                )}
            </div>
            <div className="bg-[url(/assets/images/explore-diverse-forests-towering-mountain-ranges-creative-world-map-depicting-unique-landscapes-geography-generative-376782108.webp)] bg-cover bg-center sm:w-[50%] h-50 w-full sm:hidden mb-10"></div>
        </section>
    )

}

export default Weather;