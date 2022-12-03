// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
    constructor(
        uint256 minDelay, // How long you have to wait before executing
        address[] memory proposers, // a list of addresses that can propose (for us everyone can propose)
        address[] memory executors, // who can execute when a proposal passes.
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
