import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Footer from "./components/layout/Footer"
import Navbar from "./components/layout/Navbar"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#0D1117]">
        <div className="flex flex-col justify-between h-screen">
          <Navbar />

          <main className="container px-3 pb-12 mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
