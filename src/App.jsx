import Navbar from "./components/layout/Navbar"

function App() {
  return (
    <div>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />
      </div>

      <main>Content</main>
    </div>
  )
}

export default App
