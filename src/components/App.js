import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap'

// Components

import {
  loadAccount,
  loadProvider,
  loadNetwork
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
  await loadNetwork(provider, dispatch)

  // Fetch accounts
  await loadAccount(dispatch)

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
