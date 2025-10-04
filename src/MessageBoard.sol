// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MessageBoard {
    event MessageStored(address indexed user, string message, uint256 timestamp);

    struct StoredMessage {
        address user;
        string message;
        uint256 timestamp;
    }

    StoredMessage[] public messages;

    function storeMessage(string calldata message) external {
        messages.push(StoredMessage(msg.sender, message, block.timestamp));
        emit MessageStored(msg.sender, message, block.timestamp);
    }

    function getMessages() external view returns (StoredMessage[] memory) {
        return messages;
    }

    function getMessageCount() external view returns (uint256) {
        return messages.length;
    }

    function getMessage(uint256 index) external view returns (StoredMessage memory) {
        require(index < messages.length, "Message does not exist");
        return messages[index];
    }
}
