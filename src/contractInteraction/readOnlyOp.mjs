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

export async function getProjectFundings(id) {
  const BigCount = await qf_contract_r.getProjectFunderCount(id);
  const fundCount = Number(BigCount);
  let fundingAmt = new BigNumber(0.0);
  let fundings = [];
  for (let index = 0; index < fundCount; index++) {
    const prjFunding = await qf_contract_r.getFunderInfo(id, index);
    const amt = ethers.utils.formatEther(prjFunding);
    fundings.push(amt);
    fundingAmt = fundingAmt.plus(new BigNumber(amt));
  }
  return [fundings, parseFloat(fundingAmt).toFixed(8)];
}

async function calcVP(id) {
  const [fundings] = await getProjectFundings(id);
  let votingPower = new BigNumber(0.0);
  fundings.forEach((donation) => {
    let x = new BigNumber(donation);
    // console.log(`Big number is ${x}`);
    votingPower = votingPower.plus(x.squareRoot());
    // console.log(`VP now is ${votingPower}`);
    // console.log(`sqrt of ${donation} is ${votingPower}`);
  });
  const vpSqaured = votingPower.multipliedBy(votingPower);
  // console.log(`vp of ${id} is ${vpSqaured}`);
  return parseFloat(vpSqaured).toFixed(8);
}

async function totalProjectsVP() {
  const prjCount = Number(await qf_contract_r.projectCounter());
  let t_fundings = new BigNumber(0.0);
  for (let index = 0; index < prjCount; index++) {
    const amt = new BigNumber(await calcVP(index));
    t_fundings = t_fundings.plus(amt);
  }
  // console.log(`total vp of all prj is ${t_fundings}`);
  return new BigNumber(t_fundings);
}

export async function calcNetReception(id) {
  const vpOfPrj = await calcVP(id);

  // console.log(`vp of chosen project is ${vpOfPrj}`);
  const totalVPofProjects = await totalProjectsVP();
  const totalMP = await getMFCount();

  const netShare = new BigNumber(vpOfPrj)
    .dividedBy(new BigNumber(totalVPofProjects))
    .multipliedBy(totalMP);
  const finalAmt = parseFloat(netShare).toFixed(9);
  // console.log(`netshare after division is ${finalAmt}`);
  return finalAmt;
}

//read methods for MF
async function getMFCount() {
  const BigInt = await mf_contract_r.netFunds();
  const eth = ethers.utils.formatEther(BigInt);
  return new BigNumber(eth);
}


async function main(){
  console.log(await calcNetReception(1));
}

main()