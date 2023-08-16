import React from "react";
import { background, formula, logo } from "../assets";

const Hero = () => {
  return (
    <section
      id="Home"
      className="bg-black overflow-hidden flex justify-around items-center p-6 relative min-h-screen"
    >
      <img
        src={background}
        alt="background-hero"
        className="absolute inset-0 object-cover"
      />
      <img src={logo} alt="logo" className="relative mb-20" />
      <div className="bg-hero-gradient w-[700px] p-8 h-fit relative mb-10 flex-col items-center rounded-xl shadow-md">
        <p className="text-blue-950 font-brico text-center text-[20px]">
          Quadratic Funding is the mathematically optimal way to fund public
          goods in a democratic community.
        </p>
        <br />
        <div className="flex items-center justify-center">
          <img src={formula} alt="qf-formula" className="rounded-lg h-20" />
        </div>
        <h1 className="text-center mt-4 font-sans font-semibold text-[30px]">
          Highlights
        </h1>
        <ul className="list-disc font-brico mt-4 font-semibold">
          <li>Number of Contributors matter more than Amount Funded</li>
          <li>
            This pushes power to the edges, away from whales & other central
            power brokers
          </li>
          <li>
            This creates more democracy in public goods funding decisions! 🦄
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Hero;
