// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Distars is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;

    uint256 public maxSupply;

    Counters.Counter public _tokenIdCounter;

    mapping(uint256 => uint256) public tokenSeedsByTokenId;

    constructor(uint256 _maxSupply) ERC721("Distars", "DST") {
        maxSupply = _maxSupply;
    }

    function mint() public {
        uint256 current = _tokenIdCounter.current();
        require(current < maxSupply, "All tokens have been minted");

        uint256 tokenId = current + 1;
        _safeMint(msg.sender, tokenId);
        _tokenIdCounter.increment();
        uint256 seed = _determineSeed(msg.sender);
        tokenSeedsByTokenId[tokenId] = seed;
    }

    // utils functions

    function _baseURI() internal pure override returns (string memory) {
        return "https://avatars.dicebear.com/api/avataaars/";
    }

    function _determineSeed(address _address) internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        _address,
                        block.timestamp,
                        block.difficulty
                    )
                )
            );
    }

    function _uint2str(uint256 _i) internal pure returns (string memory str) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + (j % 10)));
            j /= 10;
        }
        str = string(bstr);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = _baseURI();
        string memory seed = _uint2str(tokenSeedsByTokenId[tokenId]);

        return string(abi.encodePacked(baseURI, seed, ".svg"));
    }

    function getMaxSupply() public view returns (uint256) {
        return maxSupply;
    }

    // overrides the default ERC721
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
