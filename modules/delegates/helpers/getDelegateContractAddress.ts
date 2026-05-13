/*

SPDX-FileCopyrightText: © 2023 Dai Foundation <www.daifoundation.org>

SPDX-License-Identifier: AGPL-3.0-or-later

*/

import {
  voteDelegateFactoryAbi,
  voteDelegateFactoryAddress,
  voteDelegateFactoryOldAbi,
  voteDelegateFactoryOldAddress
} from 'modules/contracts/generated';
import { ZERO_ADDRESS } from 'modules/web3/constants/addresses';
import { getPublicClient } from 'modules/web3/helpers/getPublicClient';

export async function getDelegateContractAddress(
  address: string,
  chainId: number
): Promise<string | undefined> {
  const publicClient = getPublicClient(chainId);

  const [{ result: voteDelegateAddress }, { result: voteDelegateAddressOld }] = await publicClient.multicall({
    contracts: [
      {
        address: voteDelegateFactoryAddress[chainId],
        abi: voteDelegateFactoryAbi,
        functionName: 'delegates',
        args: [address as `0x${string}`]
      },
      {
        address: voteDelegateFactoryOldAddress[chainId],
        abi: voteDelegateFactoryOldAbi,
        functionName: 'delegates',
        args: [address as `0x${string}`]
      }
    ]
  });

  return voteDelegateAddressOld !== ZERO_ADDRESS
    ? voteDelegateAddressOld
    : voteDelegateAddress !== ZERO_ADDRESS
    ? voteDelegateAddress
    : undefined;
}
