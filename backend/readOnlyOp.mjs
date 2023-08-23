import {
  QF_CON_ABI,
  QF_CON_ADDR,
  MF_CON_ADDR,
  MF_CON_ABI,
} from "./constants.mjs";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/F6-PF8iL4X7tFrdosp8bXA8xU5gsZmA-"
);
const qf_contract_r = new ethers.Contract(QF_CON_ADDR, QF_CON_ABI, provider);
const mf_contract_r = new ethers.Contract(MF_CON_ADDR, MF_CON_ABI, provider);

//read methods for QF
async function getProject(id) {
  return await qf_contract_r.projects(id);
}

async function getProjectFundings(id) {
  const BigCount = await qf_contract_r.getProjectFunderCount(id);
  const fundCount = Number(BigCount);
  let fundings = [];
  for (let index = 0; index < fundCount; index++) {
    const prjFunding = await qf_contract_r.getFunderInfo(id, index);
    const amt = ethers.utils.formatEther(prjFunding);
    fundings.push(amt);
  }
  return fundings;
}

async function calcVP(id) {
  const fundings = await getProjectFundings(id);
  let votingPower = 0;
  fundings.forEach((donation) => {
    let x = new BigNumber(donation);
    votingPower += x.squareRoot();
    // console.log(`sqrt of ${donation} is ${votingPower}`);
  });
  const vpSqaured = new BigNumber(votingPower).multipliedBy(votingPower);
  // console.log(`vp of ${id} is ${vpSqaured}`);
  return vpSqaured;
}

async function totalProjectsVP() {
  const prjCount = Number(await qf_contract_r.projectCounter());
  console.log(prjCount);
  let t_fundings = new BigNumber(0.0);
  for (let index = 0; index < prjCount; index++) {
    const amt = await calcVP(index);
    console.log(amt);
    t_fundings = amt.plus(t_fundings);
    console.log(t_fundings);
  }
  console.log(`total vp of all prj is ${t_fundings}`);
  return new BigNumber(t_fundings);
}

async function calcNetReception(id) {
  const vpOfPrj = await calcVP(id);

  console.log(`vp of chosen project is ${new BigNumber(vpOfPrj)}`);
  const totalVPofProjects = await totalProjectsVP();
  const totalMP = await getMFCount();

  const netShare = new BigNumber(vpOfPrj)
    .dividedBy(new BigNumber(totalVPofProjects))
    .multipliedBy(totalMP);
  console.log(`netshare after division is ${netShare}`);
  return netShare;
}

//read methods for MF
async function getMFCount() {
  const BigInt = await mf_contract_r.netFunds();
  const eth = ethers.utils.formatEther(BigInt);
  return new BigNumber(eth);
}

async function main() {
  console.log(await getProjectFundings(100));
  // console.log(await getMFCount())
  // await calcNetReception(0);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
