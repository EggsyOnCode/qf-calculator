import './App.css';
import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Learn from './components/Learn.js';
import Calculator from './components/Calculator.js';


function App() {
  return (
    <div className="bg-black w-full overflow-hidden">
      <NavBar></NavBar>
      <Hero></Hero>
      <Learn></Learn>
      <Calculator></Calculator>
    </div>
  );
}

export default App;
