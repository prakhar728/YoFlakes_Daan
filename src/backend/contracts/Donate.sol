// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Organise is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter public _campaignId;
    address payable public immutable contractOwner;

    struct campaign{
        string _ipfsURI;
        uint _amountRaised;
    }

    mapping (uint=>campaign) public campaigns;

    constructor(){
        contractOwner=payable(msg.sender);
    }

    function campaignIDReturn() external view returns(uint){
        return _campaignId.current();
    }
    function createCampaign(string memory _IpfsURI) external returns(uint){
        _campaignId.increment();
        campaigns[_campaignId.current()]=campaign(_IpfsURI,0);
        return _campaignId.current();
    }
}