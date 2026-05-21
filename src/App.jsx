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
  const [activeYear, setActiveYear] = useState("2024")
  const [economieData, setEconomieData] = useState(null)
  const [migrationData, setMigrationData] = useState(null)
  const [populationData, setPopulationData] = useState(null)

  // Haal de JSON op uit de public map
  // useEffect(() => {
  //   fetch("/gdp_nominaal_gecombineerd.json")
  //     .then((res) => res.json())
  //     .then((data) => setEconomieData(data))
  //     .catch((err) => console.error("Kon economy.json niet laden:", err))
  // }, [])

  // useEffect(() => {
  //   fetch("/migratie_gecombineerd.json")
  //     .then((res) => res.json())
  //     .then((data) => setMigrationData(data))
  //     .catch((err) => console.error("Kon migration.json niet laden:", err))
  // }, [])

  // useEffect(() => {
  //   fetch("/demografie_gecombineerd.json")
  //     .then((res) => res.json())
  //     .then((data) => setPopulationData(data))
  //     .catch((err) => console.error("Kon population.json niet laden:", err))
  // }, [])

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}gdp_nominaal_gecombineerd.json`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Server gaf status ${res.status} op ${url}`);
        return res.json();
      })
      .then((data) => setEconomieData(data))
      .catch((err) => console.error("Fout bij laden gdp JSON:", err))
  }, [])

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}migratie_gecombineerd.json`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Server gaf status ${res.status} op ${url}`);
        return res.json();
      })
      .then((data) => setMigrationData(data))
      .catch((err) => console.error("Fout bij laden migratie JSON:", err))
  }, [])

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}demografie_gecombineerd.json`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Server gaf status ${res.status} op ${url}`);
        return res.json();
      })
      .then((data) => setPopulationData(data))
      .catch((err) => console.error("Fout bij laden demografie JSON:", err))
  }, [])

  const getGefilterdeData = () => {
    const resultaat = {}

    if (["gdp", "gdp_pc"].includes(activeCategory) && economieData) {
      console.log(economieData)
      const jsonKey = activeCategory === "gdp" ? "gdp_nominal_millions" : "gdp_per_capita_nominal"

      Object.keys(economieData).forEach((code) => {
        const landData = economieData[code]
        
        if (landData && landData[activeYear]) {
          resultaat[code] = landData[activeYear][jsonKey]
        } else {
          resultaat[code] = null
        }
      })
    }


    if (["immigration", "emigration", "net_migration"].includes(activeCategory) && migrationData) {
      console.log(migrationData)
      Object.keys(migrationData).forEach((code) => {
        const landData = migrationData[code]
        
        if (landData && landData[activeYear]) {
          const jaarData = landData[activeYear]
          
          resultaat[code] = jaarData[activeCategory] ?? jaarData[`${activeCategory}_total`] ?? null
        } else {
          resultaat[code] = null
        }
      })
    }

    if (["population", "fertility_rate", "foreign_born", "over_65"].includes(activeCategory) && populationData) {
      console.log(populationData)
      Object.keys(populationData).forEach((code) => {
        const landData = populationData[code]
        
        if (landData && landData[activeYear]) {
          const jaarData = landData[activeYear]
          
          resultaat[code] = jaarData[activeCategory] ?? jaarData[`${activeCategory}_total`] ?? null
        } else {
          resultaat[code] = null
        }
      })
    }
    return resultaat
  }

  const huidigeKaartData = getGefilterdeData()

  return (
    <div className="flex flex-col min-h-screen md:h-screen w-screen bg-white md:overflow-hidden">
      <Topbar></Topbar>

      <div className="z-20 bg-white py-3 flex flex-col items-center gap-0.5 ">
        <div className="flex items-center bg-slate-100 p-0.5 overflow-x-auto max-w-full rounded-xl border border-slate-200/60">
          {["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"].map((jaar) => (
            <button
              key={jaar}
              onClick={() => setActiveYear(jaar)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
                activeYear === jaar
                  ? "bg-white text-slate-800 shadow-sm border border-slate-200/50 scale-105 font-bold"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/40"
              }`}
            >
              {jaar}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col-reverse md:flex-row flex-1 w-full h-auto md:h-[calc(100vh-120px)] p-2 gap-5">
        {/* 5. Geef de state en wissel-functie mee aan de Sidebar */}
        <div className="flex justify-center md:block md:h-full">
          <Sidebar activeCategory={activeCategory} setCategory={setCategory} />
        </div>

        <div className="flex-1 h-[100vh] md:h-full relative rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-slate-50">
          {/* 6. Geef de actieve categorie en de gefilterde data mee aan de Kaart */}
          <MapComponent activeCategory={activeCategory} currentData={huidigeKaartData} />
        </div>
      </div>
    </div>
  )
}

export default App
