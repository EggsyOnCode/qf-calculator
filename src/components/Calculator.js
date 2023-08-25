import React, { useState } from "react";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { ethers } from "ethers";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import detectEthereumProvider from "@metamask/detect-provider";

import Swal, { SweetAlertUpdatableParameters } from "sweetalert2";
import {
  MF_CON_ABI,
  MF_CON_ADDR,
  QF_CON_ABI,
  QF_CON_ADDR,
} from "./../constants";
import {
  calcNetReception,
  getProjectFundings,
} from "../contractInteraction/readOnlyOp.mjs";

const Calculator = () => {
  //alert msgs
  const alertForProvider = () => {
    Swal.fire("Kindly connect to MetaMask first using the button!");
  };
  const alertForZerothItem = () => {
    Swal.fire("We need at least one grant/project");
  };
  //prompts to connect to metamask on opening up
  function randColorGenerator() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  const [provider, setProvider] = useState(null);
  const [metaMaskStatus, setMetaMaskStatus] = useState("Connect to MetaMask");
  const [contractQF, setContractQF] = useState(null);
  const [contractMF, setContractMF] = useState(null);
  const [fund, setFund] = useState();
  const [matched, setMatched] = useState();
  const [indexG, setIndexG] = useState(1);
  const [matchedPool, setMatchedPool] = useState(null);
  const [grant, setGrant] = useState([
    {
      color: randColorGenerator(),
      funded: "",
      matched: "",
      funds: [],
      indexG: "0",
    },
  ]);
  const [projects, setProjects] = useState(1);

  async function setupZerothProject(QFcontract) {
    await QFcontract.increaseProjectCounter({});
    await QFcontract.removeProject(0);
  }

  //metamask setup and contract setup
  async function metaMaskconnect() {
    if (window.ethereum) {
      if (metaMaskStatus !== "Connected!") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        setProvider(provider);
        setMetaMaskStatus("Connected!");
        const signer = provider.getSigner();
        const qf_contract_w = new ethers.Contract(
          QF_CON_ADDR,
          QF_CON_ABI,
          signer
        );
        await setupZerothProject(qf_contract_w);
        setContractQF(qf_contract_w);
        const mf_contract_w = new ethers.Contract(
          MF_CON_ADDR,
          MF_CON_ABI,
          signer
        );
        setContractMF(mf_contract_w);
      } else {
        Swal.fire("You are already connected to MetaMask!");
      }
    } else {
    }
  }

  const handleMFchange = (event) => {
    setMatched(event.target.value);
  };
  const handleFundchange = (event) => {
    setFund(event.target.value);
  };
  const clearFundInput = () => {
    setFund("");
  };
  const setMatchedFund = async () => {
    if (provider) {
      console.log("watiing to set matched pool amt");
      const tx = await contractMF.setFunds({
        value: ethers.utils.parseEther(matched),
      });
      Swal.fire({
        title: "Processing transaction..",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      tx.wait().then(() => {
        Swal.close();
      });
    } else {
      alertForProvider();
    }
  };

  const approveContribution = async (index, obj) => {
    //if succssful add a chip of the fund in the list
    if (provider) {
      const tx = await contractQF.donate(index, {
        value: ethers.utils.parseEther(fund),
      });
      Swal.fire({
        title: "Processing transaction..",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      tx.wait().then(() => {
        clearFundInput();
        obj.funds.push(fund.toString());
        Swal.close();
      });
    } else {
      alertForProvider();
    }
  };

  const removeGrant = async (index) => {
    if (provider) {
      if (index !== 0) {
        const newGrant = [...grant];
        newGrant.splice(index, 1);
        setGrant(newGrant);
        const tx = await contractQF.removeProject(index);
        Swal.fire({
          title: "removing project...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        tx.wait().then(() => {
          setProjects(projects - 1);
          Swal.close();
        });
      } else {
        alertForZerothItem();
      }
    } else {
      alertForProvider();
    }
  };

  async function addGrant() {
    if (provider) {
      setIndexG(indexG + 1);
      const prjCounterOnChain = Number(await contractQF.projectCounter());
      if (indexG <= prjCounterOnChain) {
        await contractQF.removeProject(indexG);
      } else {
        await contractQF.addProject();
      }
      const newGrant = {
        color: randColorGenerator(),
        funded: "",
        matched: "",
        funds: [],
        indexG: `${indexG}`,
      };

      var updatedGrant = [...grant, newGrant];
      setGrant(updatedGrant);
      setProjects(projects + 1);
    } else {
      alertForProvider();
    }
  }

  async function convertToUSD(ethAmt) {
    const usdAmt = await fetch(`http://localhost:4000/ethToUsd/${ethAmt}`).then(
      (res) => res.json()
    );
    console.log(usdAmt);
    return usdAmt;
  }

  async function calcResultsInUSD() {
    console.log("Waiting for the results");
    console.log(grant);
    const tempGrants = [...grant];

    Swal.fire({
      title: "calculating results...",
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();

        for (const obj of tempGrants) {
          const [, fundingAmt] = await getProjectFundings(obj.indexG);
          obj.funded = await convertToUSD(fundingAmt);
          console.log(obj.funded);

          const prjMF = await calcNetReception(obj.indexG);
          obj.matched = await convertToUSD(prjMF);
          console.log(obj.matched);
        }

        setGrant(tempGrants);
        Swal.close();
      },
    });
  }

  async function calcResultsInETH() {
    console.log("Waiting for the results");
    console.log(grant);
    const tempGrants = [...grant];

    Swal.fire({
      title: "calculating results...",
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();

        for (const obj of tempGrants) {
          const [, fundingAmt] = await getProjectFundings(obj.indexG);
          obj.funded = fundingAmt.toString();
          console.log(obj.funded);

          const prjMF = await calcNetReception(obj.indexG);
          obj.matched = prjMF.toString();
          console.log(obj.matched);
        }

        setGrant(tempGrants);
        Swal.close();
      },
    });
  }

  async function convertMatchedPolltoUSD() {
    if (matched != null) {
      const rand = await convertToUSD(matched);
      setMatchedPool(rand);
    }
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
        <div className="mt-5 bg-hero-gradient rounded-xl mr-10 w-[420px] h-[130px] matchingFunds flex flex-col items-center">
          <h1 className="text-center  font-brico font-bold text-[23px]">
            Matching Pool
          </h1>
          <div className="flex flex-row justify-center items-center">
            <div className="flex-col justify-center items-center">
              <input
                type="number"
                placeholder="0.02 (sepolia eth)"
                onChange={handleMFchange}
                className="rounded-lg mt-3 h-[30px] w-[150px]"
              />
              <div className="bg-yellow-200 rounded-xl p-1 mt-1">
                {matchedPool}
              </div>
            </div>

            <div className="flex">
              <div
                className="h-[50px] hover:cursor-pointer w-[80px] mt-2 ml-2 rounded-xl bg-green-300 flex flex-col items-center p-2"
                onClick={setMatchedFund}
              >
                <BsFillCheckCircleFill className="text-[30px]" />
                <h1 className="text-center  font-brico font-bold text-[10px]">
                  Set Amt
                </h1>
              </div>
              <button
                className="bg-yellow-200 rounded-xl ml-2 mr-1"
                onClick={convertMatchedPolltoUSD}
              >
                <b>In $</b>
              </button>
            </div>
          </div>
        </div>
        <div
          className="h-[100px] mt-5 rounded-xl bg-hero-gradient flex-grow bg-white flex flex-col items-center p-3 mr-8"
          onClick={addGrant}
        >
          <IoIosAddCircle
            className="text-[150px] hover:cursor-pointer"
            title="hello"
          />
          <h1 className="text-center  font-brico font-bold text-[23px]">
            Add Grant
          </h1>
        </div>
        <div
          className="h-[100px] mt-5 rounded-xl bg-hero-gradient flex-grow bg-white flex flex-col hover:cursor-pointer items-center p-3 mr-4"
          onClick={() => {
            metaMaskconnect();
          }}
        >
          <h1 className="text-center  font-brico font-bold text-[23px]">
            {metaMaskStatus}
          </h1>
        </div>
        <div
          className="h-[100px] mt-5 rounded-xl bg-hero-gradient flex-grow bg-white flex flex-col hover:cursor-pointer items-center p-3 mr-4"
          onClick={calcResultsInETH}
        >
          <h1 className="text-center  font-brico font-bold text-[23px]">
            See Results
          </h1>
        </div>
        <div className="mt-5 flex-grow bg-hero-gradient rounded-xl  w-fit h-[100px] matchingFunds flex flex-col items-center">
          <h1 className="text-center  font-brico  font-bold text-[20px]">
            Number of Grants
          </h1>
          <Chip
            label={projects}
            className="font-extrabold text-lg w-[100px]"
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
                  <span className="text-2xl">Grant #</span> <br /> {obj.indexG}{" "}
                </h1>
                <div className="flex ">
                  <div className="flex flex-col items-center bg-yellow-400 p-2 pb-0.5 rounded-md ml-32 mt-1.5">
                    <h1 className="text-center font-brico font-bold text-sm">
                      Funding Amount
                    </h1>
                    <div className="text-center font-brico font-semibold text-xs  bg-yellow-200 p-0.5 rounded-xl">
                      {obj.funded}
                    </div>
                    <h1 className="text-center font-brico font-bold text-sm">
                      Matched Amount
                    </h1>
                    <div className="text-center font-brico font-semibold text-xs bg-yellow-200 p-0.5 rounded-xl">
                      {obj.matched}
                    </div>
                  </div>
                  <button
                    className="rounded-xl bg-yellow-200 ml-1 mt-3 mb-2 mr-3 p-3"
                    onClick={calcResultsInUSD}
                  >
                    <b>In $</b>
                  </button>
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
                      type="number"
                      placeholder="Make Contribution"
                      class="p-1 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
                      onChange={handleFundchange}
                    />
                    <div class="absolute hidden group-hover:block bg-gray-200 p-2 rounded mt-2 shadow-md">
                      Enter Amt in sepolia testnet ETH
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center ml-5">
                  <div
                    className="h-[60px] w-[90px] hover:cursor-pointer rounded-xl bg-red-200 flex flex-col items-center p-2"
                    onClick={() => removeGrant(index)}
                  >
                    <IoIosRemoveCircle className="text-[30px]" />
                    <h1 className="text-center  font-brico font-bold text-[10px]">
                      Remove Grant
                    </h1>
                  </div>
                  <div
                    className="h-[60px] w-[90px] hover:cursor-pointer mt-2 rounded-xl bg-green-300 flex flex-col items-center p-2"
                    onClick={() => {
                      approveContribution(index, obj);
                    }}
                  >
                    <BsFillCheckCircleFill className="text-[25px]" />
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
