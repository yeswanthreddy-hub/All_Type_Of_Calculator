import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CalculatorRoute from './pages/CalculatorRoute'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="calculator/:id" element={<CalculatorRoute />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
