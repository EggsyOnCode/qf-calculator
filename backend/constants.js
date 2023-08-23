export const QF_CON_ADDR = "0xdFB5F50DDAcba2fd3973B74b953cB36Ef27760c8";
export const QF_CON_ABI = [
  {
    inputs: [],
    name: "addProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_projectId",
        type: "uint16",
      },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "funderID",
        type: "uint256",
      },
    ],
    name: "getFunderInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getProjectFunderCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getProjectTotalFunding",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "projectCounter",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "projects",
    outputs: [
      {
        internalType: "uint16",
        name: "id",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "totalFunding",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "matchedFunding",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalReception",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "fundCounter",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_id",
        type: "uint16",
      },
    ],
    name: "removeProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_id",
        type: "uint16",
      },
    ],
    name: "setPrjReception",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export const MF_CON_ADDR = "0xe44EFE4b72adb7A91cD5BB8ef873CFD33e597657";
export const MF_CON_ABI = [
  {
    inputs: [],
    name: "netFunds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "setFunds",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
