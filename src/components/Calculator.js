import React, { useState } from "react";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import {BsFillCheckCircleFill} from "react-icons/bs"
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Calculator = () => {
  function randColorGenerator() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  const [fund,setFund] = useState();
  const [matched,setMatched] = useState();
  const [funds,setFunds] = useState();
  const [indexG,setIndexG] = useState(1);
  const [grant, setGrant] = useState([{color:randColorGenerator(),funded: '', matched: '', funds: [], indexG: '0'}]);
  const [projects,setProjects] = useState(1)

  function approveContribution() {}

  const removeGrant = (index) =>{
    const newGrant = [...grant];
    newGrant.splice(index, 1);
    setGrant(newGrant);
    setProjects(projects - 1);
  }

  function addGrant() {
    setIndexG(indexG +1);
    const newGrant = {
      color: randColorGenerator(),
      funded: "",
      matched: "",
      funds: [],
      indexG: `${indexG}`
    };

    
    var updatedGrant = [...grant, newGrant];
    setGrant(updatedGrant);
    setProjects(projects + 1)
  }

  return (
    <section
      id="Calculator"
      className="bg-black p-3 w-full h-screen flex flex-col items-center overflow-y-scroll"
    >
      <div className="w-full max-w-4xl rounded-xl bg-hero-gradient p-8">
        <p className="mt-16 ml-28 text-black font-bold font-brico text-[40px]">
          Quadratic Funding Calculator{" "}
        </p>
        <p className="mt-4 text-black font-brico text-lg">
          <h1 className="font-sans font-bold text-center text-[25px]">
            Algorithm
          </h1>{" "}
          <br /> A matching pool (funds raised from the investors) is raised,
          then crowdfunding from the public is undertaken and these received
          funds are matched against the QF algorithm and allocated to each of
          the enlisted projects
        </p>
      </div>
      <div className="mt-5 flex justify-between  items-center w-4/6">
        <div className="mt-5 flex-grow bg-hero-gradient rounded-xl mr-12 w-[300px] h-[100px] matchingFunds flex flex-col items-center">
          <h1 className="text-center  font-brico font-bold text-[23px]">
            Matching Pool
          </h1>
          <div className="flex flex-row justify-center items-center">
            <input
              type="number"
              placeholder="$1500"
              className="rounded-lg mt-3 h-[30px]"
            />
            <div className="h-[50px] hover:cursor-pointer w-[80px] mt-2 ml-2 rounded-xl bg-green-300 flex flex-col items-center p-2">
              <BsFillCheckCircleFill
                className="text-[30px]"
                onClick={approveContribution}
              />
              <h1 className="text-center  font-brico font-bold text-[10px]">
                Set Amt
              </h1>
            </div>
          </div>
        </div>
        <div className="h-[100px] mt-5 rounded-xl bg-hero-gradient flex-grow bg-white flex flex-col items-center p-3 mr-12" onClick={addGrant}>
          <IoIosAddCircle
            className="text-[150px] hover:cursor-pointer"
            title="hello"
          />
          <h1 className="text-center  font-brico font-bold text-[23px]">
            Add Grant
          </h1>
        </div>
        <div className="mt-5 flex-grow bg-hero-gradient rounded-xl  w-fit h-[100px] matchingFunds flex flex-col items-center">
          <h1 className="text-center  font-brico  font-bold text-[23px]">
            Number of Projects/Grants
          </h1>
          <Chip
            label={projects}
            className="mt-2 font-extrabold text-lg w-[100px]"
            sx={{ fontSize: "30px" }}
          ></Chip>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5 bg-[#A9C639] rounded-xl relative w-4/6 p-5 h-fit ">
        {grant.map((obj, index) => {
          return (
            <div className="bg-hero-gradient rounded-xl h-fit p-3 m-3 flex flex-col items-center outline-dotted outline-blue-900">
              <div className="bg-zinc-400 flex-grow rounded-xl flex flex-col items-center relative w-5/6 h-[100px]">
                <h1 className=" font-brico font-bold text-5xl absolute left-4">
                  <span className="text-2xl">Grant #</span> <br /> {obj.indexG}
                </h1>
                <div className="flex flex-col items-center bg-yellow-400 p-2 rounded-md absolute right-3 top-6">
                  <h1 className="text-center font-brico font-bold text-sm">
                    Funding Amount
                  </h1>
                  <h1 className="text-center font-brico font-semibold text-xs">
                    {obj.funded}
                  </h1>
                  <h1 className="text-center font-brico font-bold text-sm">
                    Matched Amount
                  </h1>
                  <h1 className="text-center font-brico font-semibold text-xs">
                    {obj.matched}
                  </h1>
                </div>
              </div>

              <h1 className="text-center mt-2 font-brico font-bold text-[23px]">
                Contributions
              </h1>

              <div className="flex flex-row justify-center items-center p-3">
                <div className="flex flex-col bg-zinc-400 items-center p-2 mr-2 rounded-2xl">
                  <h1 className="text-center m-1 font-brico font-bold text-[12px]">
                    Funds Received
                  </h1>
                  <Stack
                    direction="row"
                    spacing={1}
                    className="p-2 rounded-2xl overflow-scroll bg-yellow-100 w-[200px] h-fit"
                  >
                    {obj.funds.map((contrib, index) => {
                      return <Chip label={contrib} variant="outlined"></Chip>;
                    })}
                  </Stack>

                  <h1 className="text-center m-1 font-brico font-bold text-[12px]">
                    Add Funds
                  </h1>

                  <div class="group relative">
                    <input
                      type="text"
                      placeholder="Make Contribution"
                      class="p-1 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <div class="absolute hidden group-hover:block bg-gray-200 p-2 rounded mt-2 shadow-md">
                      Enter Amt in USD and Transaction will be made in
                      equivalent TESTNET ETH
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center ml-5">
                  <div className="h-[60px] w-[90px] hover:cursor-pointer rounded-xl bg-red-200 flex flex-col items-center p-2" onClick={()=>removeGrant(index)}>
                    <IoIosRemoveCircle
                      className="text-[30px]"
                    />
                    <h1 className="text-center  font-brico font-bold text-[10px]">
                      Remove Grant
                    </h1>
                  </div>
                  <div className="h-[60px] w-[90px] hover:cursor-pointer mt-2 rounded-xl bg-green-300 flex flex-col items-center p-2">
                    <BsFillCheckCircleFill
                      className="text-[25px]"
                      onClick={approveContribution}
                    />
                    <h1 className="text-center  font-brico font-bold text-[10px]">
                      Add Contribution
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Calculator;
