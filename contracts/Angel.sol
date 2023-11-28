// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Angel is ERC721 {
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("Angel", "ANG") {}

    function mintToken(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) external {
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        _tokenURIs[tokenId] = uri;
    }

    function getTokenMetadata(
        uint256 tokenId
    ) public view returns (string memory) {
        return _tokenURIs[tokenId];
    }
}
