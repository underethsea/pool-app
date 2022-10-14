// import PoolSwapsQuickswap from './components/transactions/poolSwapsQuickswap.jsx'
// import UsdcDeposits from './components/transactions/usdcDeposits.jsx'
// import UsdcClaims from './components/transactions/usdcClaims.jsx'
// import PoolSwapsUniswap from './components/transactions/poolSwapsUniswap.jsx'


import Poolers from "./components/poolers.jsx"

import { MyConnect } from "./components/myConnect.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import '@rainbow-me/rainbowkit/dist/index.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { ConnectButton } from '@rainbow-me/rainbowkit';

/* adding gnosis network */
const avalancheChain = {
  id: 43114,
  name: 'Avalanche',
  network: 'Avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'AVAX',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc',
  },
  blockExplorers: {
    default: { name: 'Snowtrace', url: 'https://snowtrace.io/' },
  },
  iconUrls: ["https://cryptologos.cc/logos/avalanche-avax-logo.png"],
  testnet: false,
}

function App() {


  const { chains, provider } = configureChains(
    [chain.mainnet, chain.polygon, chain.optimism, avalancheChain],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_KEY }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (

    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} modalSize="compact" >

        <Router>
          <Navbar bg="light" expand="lg">
            {/* <Container> */}
            <Navbar.Brand href="#home" className="navbarbrand">
              <img
                src="./images/poolerson.png"
                width="36"
                height="36"
                alt="explore"
              ></img><span className="header-text hidden-mobile">
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</span>
              &nbsp;&nbsp;&nbsp;

              <MyConnect label="Sign in" showBalance={{
                smallScreen: false,
                largeScreen: true,
              }} accountStatus={{
                smallScreen: 'avatar',
                largeScreen: 'full',
              }} />&nbsp;&nbsp;
            </Navbar.Brand>

            {/* </Container> */}
          </Navbar>

          <Poolers />
          <span className="github boticon">
            <a href="https://github.com/underethsea/pool-app" target="_blank">
            <img src="./images/github.png"></img></a>
          </span>
          <span className="discord boticon">
            <a href="https://pooltogether.com/discord" target="_blank">
            <img src="./images/discord.png"></img></a>
          </span>

        </Router>
      </RainbowKitProvider>
    </WagmiConfig>

  );
}

export default App;