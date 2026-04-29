// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

import "../src/GenPortVault.sol";

contract GenPortVaultTest {
    GenPortVault vault;
    address executor = address(0xBEEF);

    function setUp() public {
        vault = new GenPortVault(address(this), executor);
    }

    function testOwnerCanPause() public {
        vault.setPaused(true);
        assert(vault.paused());
    }
}
