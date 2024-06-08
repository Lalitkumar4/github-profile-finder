import Footer from "./components/layout/Footer"
import Navbar from "./components/layout/Navbar"

function App() {
  return (
    <div className="bg-[#0D1117]">
      <div className="flex flex-col justify-between h-screen">
        <Navbar />

        <main>Content</main>

        <Footer />
      </div>
    </div>
  )
}

export default App
