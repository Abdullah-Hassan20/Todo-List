import Navbar from "./components/navbar"
import Title from "./components/Title"
import Context from "./components/Context"

function App(){
  return(
    <>
      <div className="bg-slate-950 text-white min-h-full">
        <Title/>
        <Navbar/>
        <Context/>
      </div>
    </>
  )
}

export default App
