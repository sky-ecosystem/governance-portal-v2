import { fallback, http, type Transport } from 'viem';

const PROXY_ORIGIN = process.env.NEXT_PUBLIC_PROXY_ORIGIN || 'https://staging-proxy.sky.money';

export function createProxyTransport(chainId: number): Transport {
  return fallback([
    http(`${PROXY_ORIGIN}/rpc/${chainId}`, { batch: { wait: 500 } }),
    http(`${PROXY_ORIGIN}/rpc-fallback/${chainId}`, { batch: { wait: 500 } })
  ]);
}
