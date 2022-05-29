// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FundRaiser is ReentrancyGuard{
    using Counters for Counters.Counter;
    Counters.Counter public _campaignId;
    address payable public immutable contractOwner;
    address payable public tokenAddress;

    struct Campaign{
        string _ipfsURI;
        uint _amountRaised;
    }

    event RasiedCampaign(address indexed startedBy, uint256 campaignId);
    event DonatedToCompaign(address  _philanthropist, uint256 indexed campaignId,uint256 amount);

    mapping (uint=>Campaign) public _campaigns;

    constructor(address _tokenAddress){
        contractOwner=payable(msg.sender);
        tokenAddress= payable(_tokenAddress);
    }

    
    function makeDonation(uint id,uint amount) external{
        _campaigns[id]._amountRaised+=amount;
        emit DonatedToCompaign(msg.sender,id,amount);
    }

    function campaignIDReturn() external view returns(uint){
        return _campaignId.current();
    }

    function createCampaign(string memory _IpfsURI) external returns(uint){
        _campaignId.increment();
        _campaigns[_campaignId.current()]=Campaign(_IpfsURI,0);
        emit RasiedCampaign(msg.sender,_campaignId.current());
        return _campaignId.current();
    }

}