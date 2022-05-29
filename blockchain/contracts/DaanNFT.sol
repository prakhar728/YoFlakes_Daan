// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DaanNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("DaaNFT", "DNT") {}

    function currentTokenId() external view returns(uint256){
        return _tokenIds.current();
    }
    
    function awardNFT(address _reciever, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newNFTID = _tokenIds.current();
        _mint(_reciever, newNFTID);
        _setTokenURI(newNFTID, tokenURI);

        _tokenIds.increment();
        return newNFTID;
    }
}