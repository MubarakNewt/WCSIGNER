# Message Signer App

A React application that allows users to connect their wallet via WalletConnect, type a message, sign it with their wallet, and display the signed message along with the recovered signer address.

## Features

- 🔗 **WalletConnect Integration**: Connect using various wallets through Reown AppKit
- ✍️ **Message Signing**: Type and sign messages with your connected wallet
- 🔍 **Address Recovery**: Verify signatures by recovering the signer address
- 🎨 **Modern UI**: Beautiful, responsive interface with gradient backgrounds
- ✅ **Verification**: Automatic verification that recovered address matches connected wallet

## Tech Stack

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Reown AppKit** - WalletConnect integration
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **TanStack Query** - Data fetching and caching

## Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Get a Project ID**:

   - Visit [Reown Dashboard](https://dashboard.reown.com)
   - Create a new project
   - Copy your Project ID

3. **Configure Project ID**:

   - Open `src/main.jsx`
   - Replace `'YOUR_PROJECT_ID'` with your actual Project ID

4. **Start development server**:
   ```bash
   npm run dev
   ```

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button and select your preferred wallet
2. **Enter Message**: Type your message in the text area
3. **Sign Message**: Click "Sign Message" to sign with your wallet
4. **Recover Address**: Click "Recover Signer Address" to verify the signature
5. **Verify**: The app will show if the recovered address matches your connected wallet

## Supported Networks

- Ethereum Mainnet
- Arbitrum

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

## License

MIT
