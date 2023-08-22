// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract QFCalculator {
    struct Project{
        uint16 id;
        uint256 totalFunding;
        uint256 matchedFunding;
        uint256 totalReception;
        uint fundCounter;
        mapping (address => uint256) funders;
    }

    mapping(uint256 => Project) public projects;
    uint public projectCounter = 0; 


    function addProject(uint16 _id) public {
        Project storage project = projects[projectCounter++];
        project.id = _id;
        project.totalReception = 0;
        project.fundCounter = 0;
        project.matchedFunding = 0;
        project.totalFunding = 0;
    }

    function removeProject(uint16 _id) public {
        delete projects[_id];
    }

    //backend preprocessing will be done to convert usd to eth ; and using ether.js eth will be sent in wei
    function donate(uint16 _projectId) public payable  {
    projects[_projectId].funders[msg.sender] += msg.value;
    projects[_projectId].totalFunding += msg.value;
    projects[_projectId].fundCounter++;
    }

    //will be set to cal total evaluation of the funds given to project
    function setPrjReception(uint16 _id) public payable {
        projects[_id].totalReception = msg.value;
    }
    
}

    




