import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { networkConfig, MIN_DELAY } from "../helper-hardhat-config"
import { network } from "hardhat"

const deployTimeLock: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Deploying TimeLock...")
    const args = [MIN_DELAY, [], [], deployer]
    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
}

export default deployTimeLock
