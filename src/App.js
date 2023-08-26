import "./App.css";
import NavBar from "./components/NavBar.js";
import Hero from "./components/Hero.js";
import Learn from "./components/Learn.js";
import Calculator from "./components/Calculator.js";
import { useEffect, useState } from "react";
import SlidingPanel from "react-sliding-side-panel";
import Swal from "sweetalert2";
import { InfoRounded } from "@mui/icons-material";

function App() {
  const [openPanel, setOpenPanel] = useState(false);
  useEffect(() => {
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
      title:
        "Run this webpage on a chromium browser (Chrome,Brave etc) for Best experience!",
    });
  }, []);

  return (
    <div className="bg-black w-full overflow-hidden">
      <NavBar></NavBar>
      <Hero></Hero>
      <div
        className="fixed bg-pink-200  bottom-1/2 right-0  p-4 mb-0 rounded-2xl -rotate-90 font-sans font-bold hover:cursor-pointer"
        onClick={() => {
          setOpenPanel(true);
        }}
      >
        <InfoRounded className="mr-2"></InfoRounded>
        Learn How to Use
      </div>
      <div
        className={`${
          openPanel ? "fixed inset-0 bg-slate-950 z-20 w-1/2 flex" : "hidden"
        }`}
        onClick={() => {
          setOpenPanel(false);
        }}
      >
        <SlidingPanel type={"left"} isOpen={openPanel} size={40}>
          <div className="flex justify-center items-center h-screen pl-44 overflow-y-scroll">
            <div className="p-3 pl-10 text-white mt-28 font-brico">
              <h1 className="text-center mb-4 text-2xl font-bold">
                How to Use the Calculator
              </h1>
              <ul className="list-disc list-inside">
                <li className="mb-2">
                  Install MetaMask as a browser extension.
                </li>
                <li className="mb-2">
                  Connect to{" "}
                  <a
                    href="https://www.alchemy.com/overviews/sepolia-testnet"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sepolia Testnet
                  </a>{" "}
                  and switch your account to Sepolia testnet. Watch the guide{" "}
                  <a
                    href="https://support.metamask.io/hc/en-us/articles/13946422437147-How-to-view-testnets-in-MetaMask"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </a>
                  .
                </li>
                <li className="mb-2">
                  Get Sepolia Testnet ETH from{" "}
                  <a
                    href="https://sepoliafaucet.com/"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Sepolia Faucet
                  </a>
                  .
                </li>
                <h1 className="text-center mb-4 text-lg font-bold">
                  Small Bugs you need to beware of! <br />
                  (I am actively working on resolving them)
                </h1>
                <li className="mb-2">
                  When Connecting to Metamask you should receive 2 popups; they
                  are there to initialzie the state of the smart contract on
                  blockchain
                  <br />
                  <br />
                  Kindly wait for them to complete; you can check their status
                  clicking the metamask extension
                </li>
                <li className="mb-2">
                  Do the same thing when "Adding Grant", after having clicked
                  the button, monitor the transaction in the metamask extension
                  and resume when its completed
                </li>

                <div>
                  <h1 className="text-center text-lg font-bold">NOTE!</h1>
                  <p className="text-center">
                    The calculations esp after conversion to USD can be OFF by
                    some degrees; that's because JS is BAD at MATH!
                  </p>
                  <p className="text-center">
                    You can use eth-usd calculator{" "}
                    <a
                      href="https://www.coinbase.com/converter/eth/usd"
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      HERE
                    </a>
                  </p>
                </div>

                <li className="mb-2 mt-2 font-bold">
                  Enjoy using the calculator!
                </li>
              </ul>

              <button
                className="bg-yellow-500 text-black p-3 mt-2 ml-28 rounded-lg"
                onClick={() => {
                  setTimeout(() => {
                    setOpenPanel(false);
                  }, 500); // 500 milliseconds (0.5 seconds) delay
                }}
              >
                Close the Guide
              </button>
            </div>
          </div>
        </SlidingPanel>
      </div>

      <Learn></Learn>
      <Calculator></Calculator>
    </div>
  );
}

export default App;
