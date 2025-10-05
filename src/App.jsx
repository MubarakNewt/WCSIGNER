import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";

import "./App.css";
// update
// Contract configuration
const MESSAGE_BOARD_ADDRESS = "0xDD4014AabE02BC60dBaDcc43b45aF7c2E4d69356"; // Deployed on Base Mainnet
const MESSAGE_BOARD_ABI = [
  {
    type: "function",
    name: "storeMessage",
    inputs: [
      {
        name: "message",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getMessages",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct MessageBoard.StoredMessage[]",
        components: [
          {
            name: "user",
            type: "address",
            internalType: "address",
          },
          {
            name: "message",
            type: "string",
            internalType: "string",
          },
          {
            name: "timestamp",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMessageCount",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMessage",
    inputs: [
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct MessageBoard.StoredMessage",
        components: [
          {
            name: "user",
            type: "address",
            internalType: "address",
          },
          {
            name: "message",
            type: "string",
            internalType: "string",
          },
          {
            name: "timestamp",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "MessageStored",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "message",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];

function App() {
  const { address, isConnected, chainId } = useAccount();
  const {
    writeContract: storeMessage,
    isPending: isStoring,
    error: writeError,
    data: writeData,
  } = useWriteContract();
  const [message, setMessage] = useState("");
  const [isStored, setIsStored] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");

  // Read all messages from the contract
  const {
    data: allMessages,
    refetch: refetchMessages,
    error: readError,
  } = useReadContract({
    address: MESSAGE_BOARD_ADDRESS,
    abi: MESSAGE_BOARD_ABI,
    functionName: "getMessages",
  });

  // Debug logging
  useEffect(() => {
    console.log("All messages from contract:", allMessages);
    console.log("Read error:", readError);
  }, [allMessages, readError]);

  // Debug write contract hook
  useEffect(() => {
    console.log("Write contract state:", {
      isStoring,
      writeError,
      writeData,
      storeMessage: typeof storeMessage,
    });
  }, [isStoring, writeError, writeData, storeMessage]);

  // Refetch messages when a new one is stored
  useEffect(() => {
    if (isStored) {
      refetchMessages();
    }
  }, [isStored, refetchMessages]);

  // Monitor write contract transaction completion
  useEffect(() => {
    if (writeData) {
      console.log("Transaction confirmed:", writeData);
      setIsStored(true);
      refetchMessages();
    }
  }, [writeData, refetchMessages]);

  // Monitor write contract errors
  useEffect(() => {
    if (writeError) {
      console.error("Write contract error:", writeError);
      alert(`Transaction failed: ${writeError.message}`);
    }
  }, [writeError]);

  const handleStoreMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message to store");
      return;
    }

    try {
      console.log("Attempting to store message on Base...");
      console.log("Contract address:", MESSAGE_BOARD_ADDRESS);
      console.log("Message:", message);
      console.log("Current chain ID:", chainId);
      console.log("Is connected:", isConnected);

      // Check if we're on the right network (Base = 8453)
      if (chainId !== 8453) {
        console.warn("Not on Base network! Current chain:", chainId);
        alert("Please switch to Base network to store messages on-chain");
        return;
      }

      console.log("Calling storeMessage function...");

      // The writeContract function doesn't return a promise, it triggers the transaction
      storeMessage({
        address: MESSAGE_BOARD_ADDRESS,
        abi: MESSAGE_BOARD_ABI,
        functionName: "storeMessage",
        args: [message],
      });

      console.log("storeMessage function called, waiting for transaction...");
    } catch (storeErr) {
      console.error("Error storing message on Base:", storeErr);
      alert(`Failed to store on Base: ${storeErr.message}`);
    }
  };

  const resetAll = () => {
    setMessage("");
    setIsStored(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Message Board</h1>
        <p>Connect your wallet and store messages on Base blockchain</p>
      </header>

      <main className="app-main">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "store" ? "active" : ""}`}
            onClick={() => setActiveTab("store")}
          >
            Store Message
          </button>
          <button
            className={`tab-button ${activeTab === "messages" ? "active" : ""}`}
            onClick={() => setActiveTab("messages")}
          >
            View Messages ({allMessages?.length || 0})
          </button>
        </div>

        {/* Store Message Tab */}
        {activeTab === "store" && (
          <>
            {/* Wallet Connection */}
            <section className="wallet-section">
              <h2>1. Connect Wallet</h2>
              <appkit-button />
              {isConnected && (
                <div className="wallet-info">
                  <p>✅ Connected: {address}</p>
                  <p>
                    🌐 Network:{" "}
                    {chainId === 8453
                      ? "Base"
                      : chainId === 1
                      ? "Ethereum"
                      : chainId === 42161
                      ? "Arbitrum"
                      : `Chain ${chainId}`}
                  </p>
                  {chainId !== 8453 && (
                    <p className="network-warning">
                      ⚠️ Switch to Base network to store messages on-chain
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Message Input */}
            <section className="message-section">
              <h2>2. Enter Message</h2>
              <div className="input-group">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="message-input"
                  rows={4}
                  disabled={!isConnected}
                />
                <button
                  onClick={handleStoreMessage}
                  disabled={!isConnected || !message.trim() || isStoring}
                  className="sign-button"
                >
                  {isStoring ? "Storing on Base..." : "Store Message"}
                </button>
              </div>
            </section>

            {/* Storage Status */}
            {isStored && (
              <section className="storage-section">
                <h2>3. Storage Status</h2>
                <div className="result-box">
                  <p className="success-message">
                    🎉 Message stored on Base blockchain!
                    <br />
                    <small>Contract: {MESSAGE_BOARD_ADDRESS}</small>
                  </p>
                </div>
              </section>
            )}

            {/* Error Display */}
            {writeError && (
              <section className="error-section">
                <h2>Error</h2>
                <div className="error-box">
                  <p>{writeError.message}</p>
                </div>
              </section>
            )}

            {/* Reset Button */}
            {message && (
              <button onClick={resetAll} className="reset-button">
                Clear Message
              </button>
            )}
          </>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <section className="messages-section">
            <h2>Messages Stored on Base</h2>
            <div className="messages-container">
              {allMessages && allMessages.length > 0 ? (
                <div className="messages-list">
                  {allMessages.map((msg, index) => (
                    <div key={index} className="message-item">
                      <div className="message-header">
                        <span className="message-index">#{index + 1}</span>
                        <span className="message-address">
                          {msg.user.slice(0, 6)}...{msg.user.slice(-4)}
                        </span>
                        <span className="message-timestamp">
                          {new Date(
                            Number(msg.timestamp) * 1000
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="message-content">{msg.message}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-messages">
                  <p>No messages stored on Base yet.</p>
                  <p>Sign and store a message to see it here!</p>
                </div>
              )}
            </div>
            <button
              onClick={() => refetchMessages()}
              className="refresh-button"
            >
              🔄 Refresh Messages
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
