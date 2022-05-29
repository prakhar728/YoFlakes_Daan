// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Treasury is Ownable {
    uint256 public totalFunds;

    constructor()  {
    }
    
    function getFunds() view external returns(uint256){
        return address(this).balance;
    }

    function releaseFunds(address _to,uint256 _amount) public onlyOwner {
        payable(_to).transfer(_amount);
    }
}
