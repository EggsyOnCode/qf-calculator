import React from "react";
import { background, formula, logo } from "../assets";

const Hero = () => {
  return (
    <section
      id="Home"
      className="bg-black flex justify-around items-center p-6 relative min-h-screen"
    >
      <img
        src={background}
        alt="background-hero"
        className="absolute inset-0 object-cover"
      />
      <img src={logo} alt="logo" className="relative mb-20" />
      <div className="bg-hero-gradient w-[700px] p-8 h-fit relative mb-10 flex-col rounded-xl shadow-md">
        <p className="text-blue-950 font-brico text-center text-[20px]">
          Quadratic Funding is the mathematically optimal way to fund public
          goods in a democratic community.
        </p>
        <br />
        <img src={formula} alt="qf-formula" className="rounded-lg h-auto" />
      </div>
    </section>
  );
};

export default Hero;
