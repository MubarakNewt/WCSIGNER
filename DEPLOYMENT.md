# MessageBoard Contract Deployment Guide

## Prerequisites

1. **Get Base Sepolia ETH**: Visit [Base Network Faucets](https://docs.base.org/learn/faucets) to get testnet ETH
2. **Get BaseScan API Key**: Sign up at [BaseScan](https://basescan.org) and get your API key
3. **Update .env file**: Replace `YOUR_BASESCAN_API_KEY` with your actual API key

## Deployment Steps

### 1. Set up your wallet in Foundry

e66a18d81b5b19dc87727fa384b227265b164b2e45e78f5a03986fd3000e82ce

```bash
# Import your private key (you'll be prompted for the key and a password)
cast wallet import deployer --interactive

# Verify the wallet is imported
cast wallet list
```

### 2. Deploy to Base Sepolia

```bash
# Load environment variables
source .env

# Deploy the contract
forge create ./src/MessageBoard.sol:MessageBoard --rpc-url $BASE_MAINNET_RPC --account deployer
```

### 3. Verify the contract

```bash
# Replace <DEPLOYED_ADDRESS> with the address from step 2
forge verify-contract <DEPLOYED_ADDRESS> ./src/MessageBoard.sol:MessageBoard --chain 84532 --watch
```
```bash
source .env && forge create ./src/MessageBoard.sol:MessageBoard --rpc-url $BASE_MAINNET_RPC --account deployer --broadcast```
### 4. Update your React app

After deployment, update the contract address in your React app:

1. Copy the deployed contract address
2. Update `src/App.jsx` with the contract address
3. The contract ABI will be automatically generated in `out/MessageBoard.sol/MessageBoard.json`

## Contract Functions

- `storeMessage(string message)` - Store a message on-chain
- `getMessages()` - Get all stored messages
- `getMessageCount()` - Get total number of messages
- `getMessage(uint256 index)` - Get a specific message by index

## Events

- `MessageStored(address indexed user, string message, uint256 timestamp)` - Emitted when a message is stored
