// SPDX-License-Identifier: MIT
pragma solidity ^0.8.33;

contract GenPortVault {
    address public immutable owner;
    address public executor;
    bool public paused;
    mapping(bytes32 => bool) public usedActionHashes;

    event Deposited(address indexed sender, uint256 amount);
    event ExecutorUpdated(address indexed executor);
    event Paused(bool paused);
    event Executed(bytes32 indexed actionHash, address indexed target, uint256 value, bytes data, bytes result);
    event Withdrawn(address indexed token, address indexed recipient, uint256 amount);

    error OnlyOwner();
    error OnlyExecutor();
    error PausedVault();
    error InvalidTarget();
    error ActionAlreadyUsed();
    error ExecutionFailed(bytes revertData);

    constructor(address initialOwner, address initialExecutor) {
        owner = initialOwner;
        executor = initialExecutor;
    }

    receive() external payable {
        emit Deposited(msg.sender, msg.value);
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert OnlyOwner();
        _;
    }

    modifier onlyExecutor() {
        if (msg.sender != executor) revert OnlyExecutor();
        _;
    }

    function setExecutor(address newExecutor) external onlyOwner {
        executor = newExecutor;
        emit ExecutorUpdated(newExecutor);
    }

    function setPaused(bool nextPaused) external onlyOwner {
        paused = nextPaused;
        emit Paused(nextPaused);
    }

    function executeApprovedAction(
        bytes32 actionHash,
        address target,
        uint256 value,
        bytes calldata data
    ) external onlyExecutor returns (bytes memory result) {
        if (paused) revert PausedVault();
        if (target == address(0)) revert InvalidTarget();
        if (usedActionHashes[actionHash]) revert ActionAlreadyUsed();

        usedActionHashes[actionHash] = true;
        (bool ok, bytes memory response) = target.call{value: value}(data);
        if (!ok) revert ExecutionFailed(response);

        emit Executed(actionHash, target, value, data, response);
        return response;
    }

    function withdrawNative(address payable recipient, uint256 amount) external onlyOwner {
        (bool ok, bytes memory response) = recipient.call{value: amount}("");
        if (!ok) revert ExecutionFailed(response);
        emit Withdrawn(address(0), recipient, amount);
    }
}
