const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens
const shares = ether

describe('AMM', () => {
  let accounts,
      deployer,
      liquidityProvider,
      investor1,
      investor2

  let token1,
      token2,
      amm

  beforeEach(async () => {
    // Setup Accounts
    accounts = await ethers.getSigners()
    deployer = accounts[0]

    // Deploy Token
    const Token = await ethers.getContractFactory('Token')
    token1 = await Token.deploy('Dapp University', 'DAPP', '1000000') // 1 Million Tokens
    token2 = await Token.deploy('USD Token', 'USD', '1000000') // 1 Million Tokens

    // Deploy AMM
    const AMM = await ethers.getContractFactory('AMM')
    amm = await AMM.deploy(token1.address, token2.address)

  })

  describe('Deployment', () => {

    it('has an address', async () => {
        expect(amm.address).to.not.equal(0x0)
    })

    it('tracks token1', async () => {
      expect(await amm.token1()).to.equal(token1.address)
    })

    it('tracks token2', async () => {
      expect(await amm.token2()).to.equal(token2.address)
    })
  })


})