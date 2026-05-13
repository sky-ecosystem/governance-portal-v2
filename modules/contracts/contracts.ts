import { SupportedChainId } from 'modules/web3/constants/chainID';
import { arbitrum, mainnet } from 'wagmi/chains';

const TENDERLY_CHAIN_ID = SupportedChainId.TENDERLY as const;
const ARBITRUM_TENDERLY_CHAIN_ID = SupportedChainId.ARBITRUMTESTNET as const;

type ChainId = typeof mainnet.id | typeof TENDERLY_CHAIN_ID;
type ArbitrumChainId = typeof arbitrum.id | typeof ARBITRUM_TENDERLY_CHAIN_ID;

export const contracts: { name: string; address: Record<ChainId, `0x${string}`> }[] = [
  {
    name: 'chief',
    address: {
      [mainnet.id]: '0x0a3f6849f78076aefaDf113F5BED87720274dDC0',
      [TENDERLY_CHAIN_ID]: '0x0a3f6849f78076aefaDf113F5BED87720274dDC0'
    }
  },
  {
    name: 'chiefOld',
    address: {
      [mainnet.id]: '0x9eF05f7F6deB616fd37aC3c959a2dDD25A54E4F5',
      [TENDERLY_CHAIN_ID]: '0x9eF05f7F6deB616fd37aC3c959a2dDD25A54E4F5'
    }
  },
  {
    name: 'dai',
    address: {
      [mainnet.id]: '0x6b175474e89094c44da98b954eedeac495271d0f',
      [TENDERLY_CHAIN_ID]: '0x6b175474e89094c44da98b954eedeac495271d0f'
    }
  },
  {
    name: 'dssSpell',
    address: {
      // This is an arbitrary spell address that must be changed with each implementation
      [mainnet.id]: '0x6f076E9eB81828fa83d9c3E0aa3E088AD24Ee20B',
      [TENDERLY_CHAIN_ID]: '0x6f076E9eB81828fa83d9c3E0aa3E088AD24Ee20B'
    }
  },
  {
    name: 'end',
    address: {
      [mainnet.id]: '0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28',
      [TENDERLY_CHAIN_ID]: '0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28'
    }
  },
  {
    name: 'esm',
    address: {
      [mainnet.id]: '0x09e05fF6142F2f9de8B6B65855A1d56B6cfE4c58',
      [TENDERLY_CHAIN_ID]: '0x09e05fF6142F2f9de8B6B65855A1d56B6cfE4c58'
    }
  },
  {
    name: 'iou',
    address: {
      [mainnet.id]: '0xa618e54de493ec29432ebd2ca7f14efbf6ac17f7',
      [TENDERLY_CHAIN_ID]: '0xa618e54de493ec29432ebd2ca7f14efbf6ac17f7'
    }
  },
  {
    name: 'iouOld',
    address: {
      [mainnet.id]: '0x496C67A4CEd9C453A60F3166AB4B329870c8E355',
      [TENDERLY_CHAIN_ID]: '0x496C67A4CEd9C453A60F3166AB4B329870c8E355'
    }
  },
  {
    name: 'mkr',
    address: {
      [mainnet.id]: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
      [TENDERLY_CHAIN_ID]: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
    }
  },
  {
    name: 'pause',
    address: {
      [mainnet.id]: '0xbe286431454714f511008713973d3b053a2d38f3',
      [TENDERLY_CHAIN_ID]: '0xbe286431454714f511008713973d3b053a2d38f3'
    }
  },
  {
    name: 'pauseProxy',
    address: {
      [mainnet.id]: '0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB',
      [TENDERLY_CHAIN_ID]: '0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB'
    }
  },
  {
    name: 'polling',
    address: {
      [mainnet.id]: '0xD3A9FE267852281a1e6307a1C37CDfD76d39b133',
      [TENDERLY_CHAIN_ID]: '0xD3A9FE267852281a1e6307a1C37CDfD76d39b133'
    }
  },
  {
    name: 'pollingOld',
    address: {
      [mainnet.id]: '0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D',
      [TENDERLY_CHAIN_ID]: '0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D'
    }
  },
  {
    name: 'pot',
    address: {
      [mainnet.id]: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7',
      [TENDERLY_CHAIN_ID]: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7'
    }
  },
  {
    name: 'vat',
    address: {
      [mainnet.id]: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B',
      [TENDERLY_CHAIN_ID]: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B'
    }
  },
  {
    name: 'voteDelegateFactory',
    address: {
      [mainnet.id]: '0xC3D809E87A2C9da4F6d98fECea9135d834d6F5A0',
      [TENDERLY_CHAIN_ID]: '0x093d305366218d6d09ba10448922f10814b031dd'
    }
  },
  {
    name: 'voteDelegateFactoryOld',
    address: {
      [mainnet.id]: '0xD897F108670903D1d6070fcf818f9db3615AF272',
      [TENDERLY_CHAIN_ID]: '0xD897F108670903D1d6070fcf818f9db3615AF272'
    }
  },
  {
    name: 'voteProxyFactory',
    address: {
      [mainnet.id]: '0x6FCD258af181B3221073A96dD90D1f7AE7eEc408',
      [TENDERLY_CHAIN_ID]: '0x6FCD258af181B3221073A96dD90D1f7AE7eEc408'
    }
  },
  {
    name: 'voteProxyFactoryOld',
    address: {
      [mainnet.id]: '0xa63E145309cadaa6A903a19993868Ef7E85058BE',
      [TENDERLY_CHAIN_ID]: '0xa63E145309cadaa6A903a19993868Ef7E85058BE'
    }
  },
  {
    name: 'vow',
    address: {
      [mainnet.id]: '0xA950524441892A31ebddF91d3cEEFa04Bf454466',
      [TENDERLY_CHAIN_ID]: '0xA950524441892A31ebddF91d3cEEFa04Bf454466'
    }
  }
];

export const arbitrumContracts: { name: string; address: Record<ArbitrumChainId, `0x${string}`> }[] = [
  {
    name: 'pollingArbitrum',
    address: {
      [arbitrum.id]: '0x4f4e551b4920a5417F8d4e7f8f099660dAdadcEC',
      [ARBITRUM_TENDERLY_CHAIN_ID]: '0xE63329692fA90B3efd5eB675c601abeDB2DF715a'
    }
  }
];
