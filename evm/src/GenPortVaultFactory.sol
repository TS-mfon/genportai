// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "./GenPortVault.sol";

contract GenPortVaultFactory {
    event VaultCreated(address indexed owner, address indexed vault, address indexed executor);

    mapping(address => address[]) public vaultsByOwner;

    function createVault(address executor) external returns (address vault) {
        vault = address(new GenPortVault(msg.sender, executor));
        vaultsByOwner[msg.sender].push(vault);
        emit VaultCreated(msg.sender, vault, executor);
    }

    function getVaults(address owner) external view returns (address[] memory) {
        return vaultsByOwner[owner];
    }
}
