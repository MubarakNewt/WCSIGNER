import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://dashboard.reown.com
// For development, you can use a test project ID or get one from the dashboard
const projectId = "a14a5096e588b25b36d5f2d2bb83075f"; // Replace with your actual project ID

// 2. Create a metadata object - optional
const metadata = {
  name: "Message Signer",
  description: "Sign messages with your wallet",
  url: "http://localhost:5173", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Set the networks
const networks = [mainnet, arbitrum];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </StrictMode>
);
