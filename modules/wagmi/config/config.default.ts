import { createConfig, createStorage, http, noopStorage } from 'wagmi';
import { arbitrum, arbitrumSepolia, mainnet } from 'wagmi/chains';
import { SupportedChainId } from 'modules/web3/constants/chainID';
import { coinbaseWallet, metaMask, safe, walletConnect, injected } from 'wagmi/connectors';
import { createPublicClient } from 'viem';
import { createProxyTransport } from './proxyTransport';

const RPC_TENDERLY = `https://virtual.mainnet.rpc.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_RPC_KEY}`;
const RPC_ARBITRUM_TESTNET = process.env.NEXT_PUBLIC_RPC_ARBITRUM_TESTNET || '';

export const tenderly = {
  id: SupportedChainId.TENDERLY as const,
  name: 'mainnet_2025_apr_15_0',
  network: 'tenderly',
  iconUrl: 'tokens/weth.svg',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: { http: [RPC_TENDERLY] },
    default: { http: [RPC_TENDERLY] }
  },
  blockExplorers: {
    default: { name: '', url: '' }
  },
  contracts: mainnet.contracts
};

const httpBatchTransport = (url: string) =>
  http(url, {
    batch: { wait: 500 }
  });

const transports = {
  [mainnet.id]: createProxyTransport(mainnet.id),
  [tenderly.id]: httpBatchTransport(RPC_TENDERLY),
  [arbitrum.id]: createProxyTransport(arbitrum.id),
  [arbitrumSepolia.id]: httpBatchTransport(RPC_ARBITRUM_TESTNET)
};

const connectors = [
  metaMask(),
  walletConnect({
    name: 'Sky Governance Portal',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'd5c6af7c0680adbaad12f33744ee4413'
  }),
  coinbaseWallet(),
  safe()
];

export const wagmiConfigDev = createConfig({
  chains: [mainnet, tenderly],
  ssr: true,
  connectors,
  transports: {
    [mainnet.id]: transports[mainnet.id],
    [tenderly.id]: transports[tenderly.id]
  },
  multiInjectedProviderDiscovery: true,
  storage: createStorage({
    storage: typeof window !== 'undefined' && window.localStorage ? window.localStorage : noopStorage,
    key: 'wagmi-dev'
  })
});

export const wagmiConfigProd = createConfig({
  chains: [mainnet],
  ssr: true,
  connectors,
  transports: {
    [mainnet.id]: transports[mainnet.id]
  },
  multiInjectedProviderDiscovery: true
});

export const mainnetPublicClient = createPublicClient({
  chain: mainnet,
  transport: transports[mainnet.id],
  key: 'mainnet-public-client',
  name: 'Mainnet public client'
});

export const tenderlyPublicClient = createPublicClient({
  chain: tenderly,
  transport: transports[tenderly.id],
  key: 'tenderly-public-client',
  name: 'Tenderly public client'
});

export const arbitrumPublicClient = createPublicClient({
  chain: arbitrum,
  transport: transports[arbitrum.id],
  key: 'arbitrum-public-client',
  name: 'Arbitrum public client'
});

export const arbitrumTestnetPublicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: transports[arbitrumSepolia.id],
  key: 'arbitrum-testnet-public-client',
  name: 'Arbitrum Testnet public client'
});
