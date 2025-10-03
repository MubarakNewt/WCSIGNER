import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { recoverMessageAddress } from "viem";
import "./App.css";

function App() {
  const { address, isConnected } = useAccount();
  const { signMessage, data: signature, error, isPending } = useSignMessage();
  const [message, setMessage] = useState("");
  const [recoveredAddress, setRecoveredAddress] = useState("");

  const handleSignMessage = async () => {
    if (!message.trim()) {
      alert("Please enter a message to sign");
      return;
    }

    try {
      await signMessage({ message });
    } catch (err) {
      console.error("Error signing message:", err);
    }
  };

  const handleRecoverAddress = async () => {
    if (!signature || !message) {
      alert("Please sign a message first");
      return;
    }

    try {
      const recovered = await recoverMessageAddress({
        message,
        signature,
      });
      setRecoveredAddress(recovered);
    } catch (err) {
      console.error("Error recovering address:", err);
      alert("Error recovering address");
    }
  };

  const resetAll = () => {
    setMessage("");
    setRecoveredAddress("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Message Signer</h1>
        <p>
          Connect your wallet, type a message, and sign it to verify ownership
        </p>
      </header>

      <main className="app-main">
        {/* Wallet Connection */}
        <section className="wallet-section">
          <h2>1. Connect Wallet</h2>
          <appkit-button />
          {isConnected && (
            <div className="wallet-info">
              <p>✅ Connected: {address}</p>
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
              onClick={handleSignMessage}
              disabled={!isConnected || !message.trim() || isPending}
              className="sign-button"
            >
              {isPending ? "Signing..." : "Sign Message"}
            </button>
          </div>
        </section>

        {/* Signature Display */}
        {signature && (
          <section className="signature-section">
            <h2>3. Signature</h2>
            <div className="result-box">
              <p>
                <strong>Signature:</strong>
              </p>
              <code className="signature-display">{signature}</code>
            </div>
            <button onClick={handleRecoverAddress} className="recover-button">
              Recover Signer Address
            </button>
          </section>
        )}

        {/* Recovered Address Display */}
        {recoveredAddress && (
          <section className="recovery-section">
            <h2>4. Recovered Address</h2>
            <div className="result-box">
              <p>
                <strong>Recovered Address:</strong>
              </p>
              <code className="address-display">{recoveredAddress}</code>
              <p className="verification">
                {recoveredAddress.toLowerCase() === address?.toLowerCase()
                  ? "✅ Address matches connected wallet!"
                  : "❌ Address does not match connected wallet"}
              </p>
            </div>
          </section>
        )}

        {/* Error Display */}
        {error && (
          <section className="error-section">
            <h2>Error</h2>
            <div className="error-box">
              <p>{error.message}</p>
            </div>
          </section>
        )}

        {/* Reset Button */}
        {(signature || recoveredAddress) && (
          <button onClick={resetAll} className="reset-button">
            Reset All
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
