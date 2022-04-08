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
        address payable _addressToDonate;
    }

    mapping (uint=>campaign) campaigns;

    constructor(){
        contractOwner=payable(msg.sender);
    }

    function createCampaign(string memory _IpfsURI,address _toDonate) external returns(uint){
        _campaignId.increment();
        campaigns[_campaignId.current()]=campaign(_IpfsURI,0,payable(_toDonate));
        return _campaignId.current();
    }
}