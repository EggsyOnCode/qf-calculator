// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract MatchingFund{
    uint256 public netFunds;
    function setFunds() public payable {
        netFunds = msg.value;
    }
    function getFunds() public view returns(uint256){
        return netFunds;
    }
}