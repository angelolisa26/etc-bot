import { DiscordBot } from './src/discord.js'
import { sleep } from './src/utils.js'
import { BlockListener } from './src/BlockListener.js'
import { getBlockNumber } from './src/etherscan.js'

const POOL_WALLET = '0x2daa35962a6d43eb54c48367b33d0b379c930e5e'

var Pool2mineBlockListener

const initConfiguration = async () => {
  try {
    console.log('Setando a configuração inicial')
    await DiscordBot.login()
    const blockNumber = await getBlockNumber()
    Pool2mineBlockListener = new BlockListener(blockNumber, POOL_WALLET)
  } catch (error) {
    console.error('Erro ao obter a configuração inicial')
    throw error
  }
}

export const service = async () => {
  try {
    console.log('Iniciando serviço')
    await initConfiguration()
    while (true) {
      await Pool2mineBlockListener.checkNextBlock()
      await sleep(1000)
    }
  } catch (error) {
    console.error('Erro no serviço', error)
  }
}

service()
