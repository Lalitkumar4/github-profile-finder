import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
import User from "./pages/User"
import RepoList from "./components/repos/RepoList"
import Followers from "./components/followers/Followers"
import Following from "./components/following/Following"
import Gists from "./components/Gists/Gists"
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
                  <Route path="/user/:login" element={<User />} />
                  <Route path="/user/:login/repos" element={<RepoList />} />
                  <Route path="/notfound" element={<NotFound />} />
                  <Route
                    path="/user/:login/followers"
                    element={<Followers />}
                  />
                  <Route
                    path="/user/:login/following"
                    element={<Following />}
                  />
                  <Route path="/user/:login/gists" element={<Gists />} />
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
