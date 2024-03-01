import React, {useMemo} from "react";
import * as web3 from '@solana/web3.js'
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import Ping from "./Ping";
require('@solana/wallet-adapter-react-ui/styles.css')

function App() {
  const endpoint = web3.clusterApiUrl("devnet")
  const wallets = useMemo(()=> [], [])
  return (
    <div className="App">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} >
      <WalletModalProvider >
        <Ping />
      </WalletModalProvider>
      </WalletProvider>
      </ConnectionProvider>
      
    </div>
  );
}

export default App;
