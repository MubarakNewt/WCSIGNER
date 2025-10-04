// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {MessageBoard} from "../src/MessageBoard.sol";

contract DeployMessageBoard is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        MessageBoard messageBoard = new MessageBoard();

        vm.stopBroadcast();

        console.log("MessageBoard deployed to:", address(messageBoard));
    }
}
