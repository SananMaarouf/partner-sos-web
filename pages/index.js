import Image from "next/image";
import { Inter } from "next/font/google";
import mapboxGl from "mapbox-gl";
import Map from "./map";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="text-center py-16 bg-blue-500 text-white">
        <h1 className="text-4xl font-bold mb-4">PartnerSOS</h1>
        <p className="mb-8">For when you are feeling unsafe </p>
        <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold">Tell me more</button>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-blue-500 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <ul className="list-disc list-inside text-left md:text-center">
          <li>Easy Share Location - Share your location with just a tap, making it easier than ever to let your friends and family know where you are.</li>
          <li>Sends Alert via SMS - In case the partner has data shut off, the app can send alerts via SMS to ensure they are always reachable.</li>
        </ul>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-blue-500">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="max-w-md mx-auto">
          <p className="italic text-center">Coming soon...</p>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center py-16 bg-blue-700">
        <h2 className="text-3xl font-bold mb-4">Coming Soon to Android Play store</h2>        
      </div>
    </div>
  );
}
