import './App.css';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Learn from './components/Learn';
import Calculator from './components/Calculator';


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
