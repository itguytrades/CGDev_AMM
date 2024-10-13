import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'

// Components

import {
  loadAccount,
  loadProvider,
  loadNetwork,
  loadTokens,
  loadAMM
} from '../store/interactions'



import Navigation from './Navigation';


// ABIs: Import your contract ABIs here
// import TOKEN_ABI from '../abis/Token.json'

// Config: Import your network config here
// import config from '../config.json';


function App() {

  const dispatch = useDispatch()

  const loadBlockchainData = async () => {
    // Initiate provider
    const provider = await loadProvider(dispatch)

    // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
    const chainId = await loadNetwork(provider, dispatch)

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload()
    })

    // Fetch current account from Metamask when changed
    window.ethereum.on('accountsChanged', async () => {
      await loadAccount(dispatch)
    })

    // Initiate contracts
    await loadTokens(provider, chainId, dispatch)
    await loadAMM(provider, chainId, dispatch)
  }

  useEffect(() => {
    loadBlockchainData()
  }, []);

  return(
    <Container>
      <Navigation account={"0x00"} />

      <h1 className='my-4 text-center'>React Hardhat Template</h1>

        <>
          <p className='text-center'><strong>Your ETH Balance:</strong> 0 ETH</p>
          <p className='text-center'>Edit App.js to add your code here.</p>
        </>
    </Container>
  )
}

export default App;
