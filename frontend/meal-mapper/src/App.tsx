import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/food/foods';
import Meals from './pages/meal/meals';

function App() {

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/food" element={<Foods />} />
          <Route path="/meal" element={<Meals />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
