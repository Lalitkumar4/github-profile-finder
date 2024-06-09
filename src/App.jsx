import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import NotFound from "./pages/NotFound"
import { GithubProvider } from "./context/GithubContext"

function App() {
  return (
    <GithubProvider>
      <BrowserRouter>
        <div>
          <div className="flex flex-col h-screen">
            <Navbar />

            <div className="flex flex-col justify-between h-screen">
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
        </div>
      </BrowserRouter>
    </GithubProvider>
  )
}

export default App
