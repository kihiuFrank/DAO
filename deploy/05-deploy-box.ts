import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/dist/types"
import { networkConfig, MIN_DELAY } from "../helper-hardhat-config"
import { ethers, network } from "hardhat"

const deployBox: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("Deploying Box...")
    const args = []
    const box = await deploy("Box", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    const timeLock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContract("Box")
    const transferOwnerTx = await boxContract.transferOwnership(timeLock.address)
    await transferOwnerTx.wait(1)
    log("YOU DUN IT!")
}

export default deployBox
