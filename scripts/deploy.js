const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory('Token')

  // Deploy Token 1
  let cgd = await Token.deploy('CGDev Token', 'CGD', '1000000') // 1 million tokens
  await cgd.deployed()
  console.log(`CGD Token deployed to: ${cgd.address}\n`)

  // Deploy Token 2
  const usd = await Token.deploy('USD Token', 'USD', '1000000') // 1 million tokens
  await usd.deployed()
  console.log(`USD Token deployed to: ${usd.address}\n`)

  // Deploy AMM
  const AMM = await hre.ethers.getContractFactory('AMM')
  const amm = await AMM.deploy(cgd.address, usd.address)

  console.log(`AMM contract deployed to: ${amm.address}\n`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
