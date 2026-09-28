import { useEffect, useState } from "react";
import { Routes, Route } from "react-router"
import Home from "./pages/home";
import Weather from "./pages/weather";
import Login from "./pages/login";
import Profile from "./pages/profile";
import MyTrip from "./pages/mytrip";
import { CountryContext } from "./context/countrycontext";
import Header from "./components/header";
import Footer from "./components/footer";
import {AuthContext } from "./context/authcontect";
import MyTravels from "./pages/mytravels";

function App() {

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null
  })
  const [countries, setCountries] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || []
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites]);

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function getCountry() {
      setLoading(true)
      setError("")
      try { 
          const response = await fetch("https://countries.dev/countries?fields=name%2Ccapital%2Cflag&full=true&sort=population&limit=245&offset=0"); 
          // console.log(response)
          if (!response.ok) {
            throw new Error("Something went wrong")
          }
          const data = await response.json();
          console.log(data)
        

        setCountries(data)

      } catch (error) {
        setError("Something went wrong. Please try again.")
        setCountries([])
      } finally {
        setLoading(false)
      }

    }
    getCountry()

  }, []);

  if (loading) {
    return <h1 className="h-160 flex justify-center items-center"><span className="loading loading-spinner loading-xl"></span></h1>
  }

  if (error) {
    return <h1 className="text-3xl font-medium text-center pt-20 text-[#26141A]">{error}</h1>
  }
  return (
    <>
      <AuthContext value={{ user, setUser }}>
        <CountryContext value={{ countries, favorites, setFavorites }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/country/:id" element={<Weather />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorite" element={<MyTrip />} />
            <Route path="/myTrips" element={<MyTravels/>}/>
          </Routes>
        </CountryContext>
      </AuthContext>
        <Footer/>
    </>
  )
}



export default App;
