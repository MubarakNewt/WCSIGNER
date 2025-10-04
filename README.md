# Message Signer App with On-Chain Storage

A React application that allows users to connect their wallet via WalletConnect, type a message, sign it with their wallet, and store it on Base blockchain as proof.

## Features

- 🔗 **WalletConnect Integration**: Connect using various wallets through Reown AppKit
- ✍️ **Message Signing**: Type and sign messages with your connected wallet
- 🔍 **Address Recovery**: Verify signatures by recovering the signer address
- 🏗️ **On-Chain Storage**: Store signed messages on Base blockchain as proof
- 🎨 **Modern UI**: Beautiful, responsive interface with gradient backgrounds
- ✅ **Verification**: Automatic verification that recovered address matches connected wallet

## Tech Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Reown AppKit** - WalletConnect integration
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **TanStack Query** - Data fetching and caching
- **Foundry** - Smart contract development and deployment
- **Solidity** - Smart contract language
- **Base** - Layer 2 blockchain for storage

## Smart Contract

The `MessageBoard.sol` contract stores messages on Base blockchain:

```solidity
contract MessageBoard {
    struct StoredMessage {
        address user;
        string message;
        uint256 timestamp;
    }

    function storeMessage(string calldata message) external;
    function getMessages() external view returns (StoredMessage[] memory);
    function getMessageCount() external view returns (uint256);
}
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Project ID

- Visit [Reown Dashboard](https://dashboard.reown.com)
- Create a new project
- Copy your Project ID

### 3. Configure Project ID

- Open `src/main.jsx`
- Replace `'YOUR_PROJECT_ID'` with your actual Project ID

### 4. Deploy Smart Contract

Follow the deployment guide in `DEPLOYMENT.md`:

1. Get Base Sepolia ETH from [Base Faucets](https://docs.base.org/learn/faucets)
2. Get BaseScan API key from [BaseScan](https://basescan.org)
3. Update `.env` file with your API key
4. Deploy contract using Foundry
5. Update contract address in `src/App.jsx`

### 5. Start Development Server

```bash
npm run dev
```

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button and select your preferred wallet
2. **Enter Message**: Type your message in the text area
3. **Sign Message**: Click "Sign Message" to sign with your wallet
4. **Recover Address**: Click "Recover Signer Address" to verify the signature
5. **Store on Base**: Click "Store on Base" to save the message on blockchain

## Deployment Commands

### Deploy to Base Sepolia

```bash
# Set up wallet
cast wallet import deployer --interactive

# Deploy contract
forge create ./src/MessageBoard.sol:MessageBoard --rpc-url $BASE_SEPOLIA_RPC --account deployer

# Verify contract
forge verify-contract <DEPLOYED_ADDRESS> ./src/MessageBoard.sol:MessageBoard --chain 84532 --watch
```

## Supported Networks

- Ethereum Mainnet
- Arbitrum
- Base (Mainnet & Sepolia)

## Supported Wallets

Any wallet that supports WalletConnect, including:

- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow
- Trust Wallet
- And many more...

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `forge build` - Compile smart contracts
- `forge test` - Run smart contract tests
- `forge script` - Run deployment scripts

## License

MIT
