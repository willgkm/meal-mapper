import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import Foods from './pages/food/foods';
import Meals from './pages/meal/meals';
import FoodForm from './pages/food/food-form/foods-form';

function App() {


  return ( 
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/food" element={<Foods />} />
          <Route path="/food/new" element={<FoodForm />} />
          <Route path="/food/:id" element={<FoodForm />} />

          <Route path="/meal" element={<Meals />} />
          <Route path="/meal/new" element={<FoodForm />} />
          <Route path="/meal/:id" element={<FoodForm />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
