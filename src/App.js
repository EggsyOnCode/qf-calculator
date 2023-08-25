import './App.css';
import NavBar from './components/NavBar.js';
import Hero from './components/Hero.js';
import Learn from './components/Learn.js';
import Calculator from './components/Calculator.js';
import { useEffect } from 'react';
import Swal from 'sweetalert2';



function App() {
  useEffect(()=>{
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "warning",
      title: "Run this webpage on a chromium browser (Chrome,Brave etc) for Best experience!",
    });
  },[])
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
