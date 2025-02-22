// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title MyToken - A Custom ERC-20 Token
/// @dev This contract extends OpenZeppelin's ERC-20 implementation and includes minting and burning functionality.
contract MyToken is ERC20, Ownable {
    /// @notice Constructor that initializes the token with a name, symbol, and initial supply.
    /// @param name The name of the token.
    /// @param symbol The symbol of the token.
    /// @param initialSupply The initial supply of tokens to mint.
    constructor(string memory name, string memory symbol, uint256 initialSupply) 
        ERC20(name, symbol) Ownable(msg.sender) 
    {
        // Mint the initial supply to the contract deployer (owner)
        _mint(msg.sender, initialSupply);
    }

    /// @notice Function to mint new tokens, only callable by the owner.
    /// @dev Uses OpenZeppelin's _mint function. Minting is restricted to the contract owner.
    /// @param amount The amount of tokens to mint.
    function mint(uint256 amount) public onlyOwner {
        _mint(msg.sender, amount);
    }

    /// @notice Function to burn tokens from the caller's balance.
    /// @dev Uses OpenZeppelin's _burn function to reduce total supply.
    /// @param amount The amount of tokens to burn.
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}
