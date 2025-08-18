import { Routes, Route, useNavigate } from "react-router-dom"
import Scene from "./components/Scene"
import Work1Detail from "./components/Work1Detail"
import Work2Detail from "./components/Work2Detail"
import Work3Detail from "./components/Work3Detail"

function App() {
  const navigate = useNavigate()

  const handleWork1More = () => navigate("/work1")
  const handleWork2More = () => navigate("/work2")
  const handleWork3More = () => navigate("/work3")

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Scene
            onWork1More={handleWork1More}
            onWork2More={handleWork2More}
            onWork3More={handleWork3More}
          />
        }
      />
      <Route path="/work1" element={<Work1Detail />} />
      <Route path="/work2" element={<Work2Detail />} />
      <Route path="/work3" element={<Work3Detail />} />
    </Routes>
  )
}

export default App
