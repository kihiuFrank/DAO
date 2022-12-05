import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import verify from "../helper-functions"

const deployGovernanceToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Deploying Governance Token...")
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`Deployed governance token to address ${governanceToken.address}`)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(governanceToken.address, [])
    }
}

export default deployGovernanceToken
