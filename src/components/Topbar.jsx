import siteLogo from '../assets/logomap3.png'

export default function Topbar(){
    return(
        <nav className="h-16 w-full bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50 shadow-sm">
            <div className="flex items-center space-x-3">
                <img 
                src={siteLogo} 
                alt="EuroMaps Logo" 
                className="h-6 w-auto object-contain select-none"
                />
                {/* <span className="font-semibold text-gray-800 tracking-tight">GeoData App</span> */}
            </div>

            <div className="flex space-x-1">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg cursor-pointer">
                Map
                </button>
                {/* <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all cursor-pointer">
                Tables
                </button> */}
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all cursor-pointer">
                Predictions
                </button>
            </div>
        </nav>
    )
}