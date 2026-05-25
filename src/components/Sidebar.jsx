export default function Sidebar({ activeCategory, setCategory }){
    return(
        <aside className="w-[240px] h-full space-y-3 m-5">
            <div className="border border-blue-400 rounded-md p-2">
                <h2 className="text-sm text-blue-400 font-semibold text-center">Economy</h2>
                <div className="grid grid-cols-2 gap-1.5">
                    <button 
                        onClick={() => setCategory("gdp")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "gdp" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        GDP (€)
                    </button>
                    <button 
                        onClick={() => setCategory("gdp_pc")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "gdp_pc" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        GDP pc (€)
                    </button>
                    {/* <button 
                        onClick={() => setCategory("ppp")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "ppp" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        PPP
                    </button>
                    <button 
                        onClick={() => setCategory("ppp_pc")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "ppp_pc" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        PPP pc
                    </button> */}
                </div>
            </div>
            <div className="border border-amber-400 rounded-md p-2">
                <h2 className="text-sm text-amber-400 font-semibold text-center">Population</h2>
                <div className="grid grid-cols-2 gap-1.5">
                    <button 
                        onClick={() => setCategory("population")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "population" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        Total
                    </button>
                    <button 
                        onClick={() => setCategory("fertility_rate")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "fertility_rate" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        Fertility rate
                    </button>
                    <button 
                        onClick={() => setCategory("foreign_born")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "foreign_born" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        Foreign born
                    </button>
                    <button 
                        onClick={() => setCategory("over_65")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "over_65" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        Over 65
                    </button>
                </div>
            </div>
            <div className="border border-red-700 rounded-md p-2">
                <h2 className="text-sm text-red-700 font-semibold text-center">Migration</h2>
                <div className="grid grid-cols-2 gap-1.5">
                    <button 
                        onClick={() => setCategory("immigration")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "immigration" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        Immigration
                    </button>
                    <button 
                        onClick={() => setCategory("emigration")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "emigration" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        Emigration
                    </button>
                    <button 
                        onClick={() => setCategory("net_migration")}
                        className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-medium ${
                        activeCategory === "net_migration" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-50 text-black"
                        }`}
                    >
                        Net migration
                    </button>
                </div>
            </div>
        </aside>
    )
}