import { defineConfig, loadEnv } from '@wagmi/cli';
import { etherscan } from '@wagmi/cli/plugins';
import { arbitrum, mainnet } from 'wagmi/chains';
import { contracts, arbitrumContracts } from './modules/contracts/contracts';
import { dsSpellAbi, voteDelegateAbi, voteProxyAbi } from './modules/contracts/ethers/abis';

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd()
  });

  return {
    out: 'modules/contracts/generated.ts',
    contracts: [
      {
        name: 'voteProxy',
        abi: voteProxyAbi
      },
      {
        name: 'voteDelegate',
        abi: voteDelegateAbi
      },
      {
        name: 'dsSpell',
        abi: dsSpellAbi
      }
    ],
    plugins: [
      // The etherscan plugin fetches ABIs for contracts which have a mainnet deployment
      etherscan({
        apiKey: env.ETHERSCAN_V2_API_KEY,
        chainId: mainnet.id,
        contracts: contracts
      }),
      // The etherscan plugin fetches ABIs for contracts which have an arbitrum deployment
      etherscan({
        apiKey: env.ETHERSCAN_V2_API_KEY,
        chainId: arbitrum.id,
        contracts: arbitrumContracts
      })
    ]
  };
});
