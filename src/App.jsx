import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MapComponent from './components/Map'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

function App() {
  const [activeCategory, setCategory] = useState("gdp")
  const [economieData, setEconomieData] = useState(null)
  const [migrationData, setMigrationData] = useState(null)
  const [populationData, setPopulationData] = useState(null)

  // Haal de JSON op uit de public map
  useEffect(() => {
    fetch("/economy.json")
      .then((res) => res.json())
      .then((data) => setEconomieData(data))
      .catch((err) => console.error("Kon economy.json niet laden:", err))
  }, [])

  useEffect(() => {
    fetch("/migration.json")
      .then((res) => res.json())
      .then((data) => setMigrationData(data))
      .catch((err) => console.error("Kon migration.json niet laden:", err))
  }, [])

  useEffect(() => {
    fetch("/population.json")
      .then((res) => res.json())
      .then((data) => setPopulationData(data))
      .catch((err) => console.error("Kon population.json niet laden:", err))
  }, [])

  const getGefilterdeData = () => {
    const resultaat = {}

    if (["gdp", "gdp_pc", "ppp", "ppp_pc"].includes(activeCategory) && economieData) {
      Object.keys(economieData).forEach((code) => {
        resultaat[code] = economieData[code][activeCategory]
      })
    } 


    if (["migration_total", "migration_last_year"].includes(activeCategory) && migrationData) {
      Object.keys(migrationData).forEach((code) => {
        resultaat[code] = migrationData[code][activeCategory]
      })
    } 

    if (["population_total", "population_growth"].includes(activeCategory) && populationData) {
      Object.keys(populationData).forEach((code) => {
        resultaat[code] = populationData[code][activeCategory]
      })
    } 
    return resultaat
  }

  const huidigeKaartData = getGefilterdeData()

  return (
    <div className="flex flex-col min-h-screen md:h-screen w-screen bg-white md:overflow-hidden">
      <Topbar></Topbar>

      <div className="flex flex-col md:flex-row flex-1 w-full h-auto md:h-[calc(100vh-120px)] p-5 gap-5">
        
        {/* 5. Geef de state en wissel-functie mee aan de Sidebar */}
        <div className="flex justify-center w-full">
          <Sidebar activeCategory={activeCategory} setCategory={setCategory} />
        </div>
        <div className="flex-1 h-[100vh] md:h-full relative rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          
          {/* 6. Geef de actieve categorie en de gefilterde data mee aan de Kaart */}
          <MapComponent activeCategory={activeCategory} currentData={huidigeKaartData} />
          
        </div>
      </div>
    </div>
  )
}

export default App
