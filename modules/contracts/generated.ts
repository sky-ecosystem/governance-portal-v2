//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// chief
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0a3f6849f78076aefaDf113F5BED87720274dDC0)
 */
export const chiefAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [
      { name: 'GOV', internalType: 'contract DSToken', type: 'address' },
      { name: 'IOU', internalType: 'contract DSToken', type: 'address' },
      { name: 'MAX_YAYS', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'slate',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true
      }
    ],
    name: 'Etch'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'guy', internalType: 'address', type: 'address', indexed: true },
      { name: 'foo', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'bar', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'fax', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'authority',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'LogSetAuthority'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'LogSetOwner'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'GOV',
    outputs: [{ name: '', internalType: 'contract DSToken', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'IOU',
    outputs: [{ name: '', internalType: 'contract DSToken', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'MAX_YAYS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'approvals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', internalType: 'contract DSAuthority', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'code', internalType: 'address', type: 'address' },
      { name: 'sig', internalType: 'bytes4', type: 'bytes4' }
    ],
    name: 'canCall',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'deposits',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'yays', internalType: 'address[]', type: 'address[]' }],
    name: 'etch',
    outputs: [{ name: 'slate', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'free',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'code', internalType: 'address', type: 'address' },
      { name: 'sig', internalType: 'bytes4', type: 'bytes4' }
    ],
    name: 'getCapabilityRoles',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'who', internalType: 'address', type: 'address' }],
    name: 'getUserRoles',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'who', internalType: 'address', type: 'address' },
      { name: 'role', internalType: 'uint8', type: 'uint8' }
    ],
    name: 'hasUserRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'hat',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'code', internalType: 'address', type: 'address' },
      { name: 'sig', internalType: 'bytes4', type: 'bytes4' }
    ],
    name: 'isCapabilityPublic',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'who', internalType: 'address', type: 'address' }],
    name: 'isUserRoot',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'last',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'launch',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'whom', internalType: 'address', type: 'address' }],
    name: 'lift',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'live',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'lock',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      {
        name: 'authority_',
        internalType: 'contract DSAuthority',
        type: 'address'
      }
    ],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'owner_', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'code', internalType: 'address', type: 'address' },
      { name: 'sig', internalType: 'bytes4', type: 'bytes4' },
      { name: 'enabled', internalType: 'bool', type: 'bool' }
    ],
    name: 'setPublicCapability',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'uint8', type: 'uint8' },
      { name: 'code', internalType: 'address', type: 'address' },
      { name: 'sig', internalType: 'bytes4', type: 'bytes4' },
      { name: 'enabled', internalType: 'bool', type: 'bool' }
    ],
    name: 'setRoleCapability',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'who', internalType: 'address', type: 'address' },
      { name: 'enabled', internalType: 'bool', type: 'bool' }
    ],
    name: 'setRootUser',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'who', internalType: 'address', type: 'address' },
      { name: 'role', internalType: 'uint8', type: 'uint8' },
      { name: 'enabled', internalType: 'bool', type: 'bool' }
    ],
    name: 'setUserRole',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'slates',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'slate', internalType: 'bytes32', type: 'bytes32' }],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'yays', internalType: 'address[]', type: 'address[]' }],
    name: 'vote',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'votes',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0a3f6849f78076aefaDf113F5BED87720274dDC0)
 */
export const chiefAddress = {
  1: '0x0a3f6849f78076aefaDf113F5BED87720274dDC0',
  314310: '0x0a3f6849f78076aefaDf113F5BED87720274dDC0'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0a3f6849f78076aefaDf113F5BED87720274dDC0)
 */
export const chiefConfig = { address: chiefAddress, abi: chiefAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// chiefOld
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9eF05f7F6deB616fd37aC3c959a2dDD25A54E4F5)
 */
export const chiefOldAbi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'IOU',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'who', type: 'address' }],
    name: 'getUserRoles',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'owner_', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'GOV',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'code', type: 'address' },
      { name: 'sig', type: 'bytes4' }
    ],
    name: 'getCapabilityRoles',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'code', type: 'address' },
      { name: 'sig', type: 'bytes4' }
    ],
    name: 'isCapabilityPublic',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'MAX_YAYS',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'whom', type: 'address' }],
    name: 'lift',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'yays', type: 'address[]' }],
    name: 'etch',
    outputs: [{ name: 'slate', type: 'bytes32' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'approvals',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'who', type: 'address' },
      { name: 'role', type: 'uint8' },
      { name: 'enabled', type: 'bool' }
    ],
    name: 'setUserRole',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'authority_', type: 'address' }],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'role', type: 'uint8' },
      { name: 'code', type: 'address' },
      { name: 'sig', type: 'bytes4' },
      { name: 'enabled', type: 'bool' }
    ],
    name: 'setRoleCapability',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'who', type: 'address' },
      { name: 'role', type: 'uint8' }
    ],
    name: 'hasUserRole',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'slate', type: 'bytes32' }],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'caller', type: 'address' },
      { name: 'code', type: 'address' },
      { name: 'sig', type: 'bytes4' }
    ],
    name: 'canCall',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', type: 'bytes32' },
      { name: '', type: 'uint256' }
    ],
    name: 'slates',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'code', type: 'address' },
      { name: 'sig', type: 'bytes4' },
      { name: 'enabled', type: 'bool' }
    ],
    name: 'setPublicCapability',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'who', type: 'address' },
      { name: 'enabled', type: 'bool' }
    ],
    name: 'setRootUser',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'votes',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'free',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'lock',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'yays', type: 'address[]' }],
    name: 'vote',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'who', type: 'address' }],
    name: 'isUserRoot',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'deposits',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'hat',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [
      { name: 'GOV', type: 'address' },
      { name: 'IOU', type: 'address' },
      { name: 'MAX_YAYS', type: 'uint256' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'slate', type: 'bytes32', indexed: true }],
    name: 'Etch'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', type: 'bytes4', indexed: true },
      { name: 'guy', type: 'address', indexed: true },
      { name: 'foo', type: 'bytes32', indexed: true },
      { name: 'bar', type: 'bytes32', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false },
      { name: 'fax', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'authority', type: 'address', indexed: true }],
    name: 'LogSetAuthority'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', type: 'address', indexed: true }],
    name: 'LogSetOwner'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9eF05f7F6deB616fd37aC3c959a2dDD25A54E4F5)
 */
export const chiefOldAddress = {
  1: '0x9eF05f7F6deB616fd37aC3c959a2dDD25A54E4F5',
  314310: '0x9eF05f7F6deB616fd37aC3c959a2dDD25A54E4F5'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9eF05f7F6deB616fd37aC3c959a2dDD25A54E4F5)
 */
export const chiefOldConfig = {
  address: chiefOldAddress,
  abi: chiefOldAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// dai
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 */
export const daiAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'chainId_', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', internalType: 'address', type: 'address', indexed: true },
      { name: 'guy', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'arg1', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg2', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', internalType: 'address', type: 'address', indexed: true },
      { name: 'dst', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'holder', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'allowed', internalType: 'bool', type: 'bool' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'pull',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'push',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 */
export const daiAddress = {
  1: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  314310: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f)
 */
export const daiConfig = { address: daiAddress, abi: daiAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// dssSpell
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6f076E9eB81828fa83d9c3E0aa3E088AD24Ee20B)
 */
export const dssSpellAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'action',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'cast',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'description',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'done',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'eta',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'expiration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'log',
    outputs: [{ name: '', internalType: 'contract Changelog', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextCastTime',
    outputs: [{ name: 'castTime', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'officeHours',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [{ name: '', internalType: 'contract PauseAbstract', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'schedule',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'sig',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'tag',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6f076E9eB81828fa83d9c3E0aa3E088AD24Ee20B)
 */
export const dssSpellAddress = {
  1: '0x6f076E9eB81828fa83d9c3E0aa3E088AD24Ee20B',
  314310: '0x6f076E9eB81828fa83d9c3E0aa3E088AD24Ee20B'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6f076E9eB81828fa83d9c3E0aa3E088AD24Ee20B)
 */
export const dssSpellConfig = {
  address: dssSpellAddress,
  abi: dssSpellAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// end
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28)
 */
export const endAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  { type: 'event', anonymous: false, inputs: [], name: 'Cage' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32', indexed: true }],
    name: 'Cage'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Cash'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'data',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'File'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'data',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'File'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32', indexed: true }],
    name: 'Flow'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'ink', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Free'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Pack'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'urn', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'art', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Skim'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'tab', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'lot', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'art', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Skip'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'tab', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'lot', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'art', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Snip'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Thaw' },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'Art',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'bag',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'cage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32' }],
    name: 'cage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'cash',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'cat',
    outputs: [{ name: '', internalType: 'contract CatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'cure',
    outputs: [{ name: '', internalType: 'contract CureLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'debt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'dog',
    outputs: [{ name: '', internalType: 'contract DogLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'address', type: 'address' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'fix',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32' }],
    name: 'flow',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32' }],
    name: 'free',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'gap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'live',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'out',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'pack',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'pot',
    outputs: [{ name: '', internalType: 'contract PotLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'urn', internalType: 'address', type: 'address' }
    ],
    name: 'skim',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'id', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'skip',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'id', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'snip',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'spot',
    outputs: [{ name: '', internalType: 'contract SpotLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'tag',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'thaw',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'vat',
    outputs: [{ name: '', internalType: 'contract VatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'vow',
    outputs: [{ name: '', internalType: 'contract VowLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'wait',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'when',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28)
 */
export const endAddress = {
  1: '0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28',
  314310: '0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x0e2e8F1D1326A4B9633D96222Ce399c708B19c28)
 */
export const endConfig = { address: endAddress, abi: endAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// esm
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x09e05fF6142F2f9de8B6B65855A1d56B6cfE4c58)
 */
export const esmAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'gem_', internalType: 'address', type: 'address' },
      { name: 'end_', internalType: 'address', type: 'address' },
      { name: 'proxy_', internalType: 'address', type: 'address' },
      { name: 'min_', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Deny'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'base', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'pause',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'DenyProxy'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'data',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'File'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'data',
        internalType: 'address',
        type: 'address',
        indexed: false
      }
    ],
    name: 'File'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Fire' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Join'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'usr', internalType: 'address', type: 'address', indexed: true }],
    name: 'Rely'
  },
  {
    type: 'function',
    inputs: [],
    name: 'Sum',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'cage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'denyProxy',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'end',
    outputs: [{ name: '', internalType: 'contract EndLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'address', type: 'address' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'fire',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'gem',
    outputs: [{ name: '', internalType: 'contract GemLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'join',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'live',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'min',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokesGovernanceAccess',
    outputs: [{ name: 'ret', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'sum',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x09e05fF6142F2f9de8B6B65855A1d56B6cfE4c58)
 */
export const esmAddress = {
  1: '0x09e05fF6142F2f9de8B6B65855A1d56B6cfE4c58',
  314310: '0x09e05fF6142F2f9de8B6B65855A1d56B6cfE4c58'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x09e05fF6142F2f9de8B6B65855A1d56B6cfE4c58)
 */
export const esmConfig = { address: esmAddress, abi: esmAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// iou
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa618e54de493ec29432ebd2ca7f14efbf6ac17f7)
 */
export const iouAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'symbol_', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', internalType: 'address', type: 'address', indexed: true },
      { name: 'guy', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guy', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Burn'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'authority',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'LogSetAuthority'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'LogSetOwner'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guy', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Mint'
  },
  { type: 'event', anonymous: false, inputs: [], name: 'Start' },
  { type: 'event', anonymous: false, inputs: [], name: 'Stop' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', internalType: 'address', type: 'address', indexed: true },
      { name: 'dst', internalType: 'address', type: 'address', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', internalType: 'contract DSAuthority', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'pull',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'push',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      {
        name: 'authority_',
        internalType: 'contract DSAuthority',
        type: 'address'
      }
    ],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'name_', internalType: 'bytes32', type: 'bytes32' }],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'owner_', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'start',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'stop',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'stopped',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa618e54de493ec29432ebd2ca7f14efbf6ac17f7)
 */
export const iouAddress = {
  1: '0xA618E54de493ec29432EbD2CA7f14eFbF6Ac17F7',
  314310: '0xA618E54de493ec29432EbD2CA7f14eFbF6Ac17F7'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa618e54de493ec29432ebd2ca7f14efbf6ac17f7)
 */
export const iouConfig = { address: iouAddress, abi: iouAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// iouOld
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x496C67A4CEd9C453A60F3166AB4B329870c8E355)
 */
export const iouOldAbi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'stop',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'owner_', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'name_', type: 'bytes32' }],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'src', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'stopped',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'authority_', type: 'address' }],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'push',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'start',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', type: 'address' }],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'guy', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'pull',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'symbol_', type: 'bytes32' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guy', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Mint'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guy', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Burn'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'authority', type: 'address', indexed: true }],
    name: 'LogSetAuthority'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', type: 'address', indexed: true }],
    name: 'LogSetOwner'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', type: 'bytes4', indexed: true },
      { name: 'guy', type: 'address', indexed: true },
      { name: 'foo', type: 'bytes32', indexed: true },
      { name: 'bar', type: 'bytes32', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false },
      { name: 'fax', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', type: 'address', indexed: true },
      { name: 'guy', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'src', type: 'address', indexed: true },
      { name: 'dst', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x496C67A4CEd9C453A60F3166AB4B329870c8E355)
 */
export const iouOldAddress = {
  1: '0x496C67A4CEd9C453A60F3166AB4B329870c8E355',
  314310: '0x496C67A4CEd9C453A60F3166AB4B329870c8E355'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x496C67A4CEd9C453A60F3166AB4B329870c8E355)
 */
export const iouOldConfig = { address: iouOldAddress, abi: iouOldAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mkr
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const mkrAbi = [
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'stop',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'owner_', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'name_', type: 'bytes32' }],
    name: 'setName',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'src', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'stopped',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'authority_', type: 'address' }],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'push',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'start',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', type: 'address' }],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'guy', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'pull',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'symbol_', type: 'bytes32' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guy', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Mint'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'guy', type: 'address', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false }
    ],
    name: 'Burn'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'authority', type: 'address', indexed: true }],
    name: 'LogSetAuthority'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', type: 'address', indexed: true }],
    name: 'LogSetOwner'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', type: 'bytes4', indexed: true },
      { name: 'guy', type: 'address', indexed: true },
      { name: 'foo', type: 'bytes32', indexed: true },
      { name: 'bar', type: 'bytes32', indexed: true },
      { name: 'wad', type: 'uint256', indexed: false },
      { name: 'fax', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    name: 'Transfer'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false }
    ],
    name: 'Approval'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const mkrAddress = {
  1: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
  314310: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2)
 */
export const mkrConfig = { address: mkrAddress, abi: mkrAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pause
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbe286431454714f511008713973d3b053a2d38f3)
 */
export const pauseAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [
      { name: 'delay_', internalType: 'uint256', type: 'uint256' },
      { name: 'owner_', internalType: 'address', type: 'address' },
      {
        name: 'authority_',
        internalType: 'contract DSAuthority',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'guy', internalType: 'address', type: 'address', indexed: true },
      { name: 'foo', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'bar', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'wad', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'fax', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'authority',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'LogSetAuthority'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'LogSetOwner'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'authority',
    outputs: [{ name: '', internalType: 'contract DSAuthority', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'delay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
      { name: 'fax', internalType: 'bytes', type: 'bytes' },
      { name: 'eta', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'drop',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
      { name: 'fax', internalType: 'bytes', type: 'bytes' },
      { name: 'eta', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'exec',
    outputs: [{ name: 'out', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'plans',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
      { name: 'fax', internalType: 'bytes', type: 'bytes' },
      { name: 'eta', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'plot',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'proxy',
    outputs: [{ name: '', internalType: 'contract DSPauseProxy', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      {
        name: 'authority_',
        internalType: 'contract DSAuthority',
        type: 'address'
      }
    ],
    name: 'setAuthority',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'delay_', internalType: 'uint256', type: 'uint256' }],
    name: 'setDelay',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'owner_', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbe286431454714f511008713973d3b053a2d38f3)
 */
export const pauseAddress = {
  1: '0xbE286431454714F511008713973d3B053A2d38f3',
  314310: '0xbE286431454714F511008713973d3B053A2d38f3'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xbe286431454714f511008713973d3b053a2d38f3)
 */
export const pauseConfig = { address: pauseAddress, abi: pauseAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pauseProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB)
 */
export const pauseProxyAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'fax', internalType: 'bytes', type: 'bytes' }
    ],
    name: 'exec',
    outputs: [{ name: 'out', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB)
 */
export const pauseProxyAddress = {
  1: '0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB',
  314310: '0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xBE8E3e3618f7474F8cB1d074A26afFef007E98FB)
 */
export const pauseProxyConfig = {
  address: pauseProxyAddress,
  abi: pauseProxyAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// polling
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD3A9FE267852281a1e6307a1C37CDfD76d39b133)
 */
export const pollingAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'blockCreated',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'startDate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'endDate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'multiHash',
        internalType: 'string',
        type: 'string',
        indexed: false
      },
      { name: 'url', internalType: 'string', type: 'string', indexed: false }
    ],
    name: 'PollCreated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'blockWithdrawn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'PollWithdrawn'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'optionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'Voted'
  },
  {
    type: 'function',
    inputs: [
      { name: 'startDate', internalType: 'uint256', type: 'uint256' },
      { name: 'endDate', internalType: 'uint256', type: 'uint256' },
      { name: 'multiHash', internalType: 'string', type: 'string' },
      { name: 'url', internalType: 'string', type: 'string' }
    ],
    name: 'createPoll',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'npoll',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'pollIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'optionIds', internalType: 'uint256[]', type: 'uint256[]' }
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'pollId', internalType: 'uint256', type: 'uint256' },
      { name: 'optionId', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'pollId', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawPoll',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'pollIds', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'withdrawPoll',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD3A9FE267852281a1e6307a1C37CDfD76d39b133)
 */
export const pollingAddress = {
  1: '0xD3A9FE267852281a1e6307a1C37CDfD76d39b133',
  314310: '0xD3A9FE267852281a1e6307a1C37CDfD76d39b133'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD3A9FE267852281a1e6307a1C37CDfD76d39b133)
 */
export const pollingConfig = {
  address: pollingAddress,
  abi: pollingAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pollingArbitrum
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x4f4e551b4920a5417F8d4e7f8f099660dAdadcEC)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xE63329692fA90B3efd5eB675c601abeDB2DF715a)
 */
export const pollingArbitrumAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'blockCreated',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'startDate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'endDate',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'multiHash',
        internalType: 'string',
        type: 'string',
        indexed: false
      },
      { name: 'url', internalType: 'string', type: 'string', indexed: false }
    ],
    name: 'PollCreated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'blockWithdrawn',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      },
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false
      }
    ],
    name: 'PollWithdrawn'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'pollId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      },
      {
        name: 'optionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true
      }
    ],
    name: 'Voted'
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'VOTE_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'chainId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'startDate', internalType: 'uint256', type: 'uint256' },
      { name: 'endDate', internalType: 'uint256', type: 'uint256' },
      { name: 'multiHash', internalType: 'string', type: 'string' },
      { name: 'url', internalType: 'string', type: 'string' }
    ],
    name: 'createPoll',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'npoll',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'version',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [
      { name: 'voter', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
      { name: 'expiry', internalType: 'uint256', type: 'uint256' },
      { name: 'pollIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'optionIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' }
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [
      { name: 'pollIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'optionIds', internalType: 'uint256[]', type: 'uint256[]' }
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'pollId', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawPoll',
    outputs: [],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x4f4e551b4920a5417F8d4e7f8f099660dAdadcEC)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xE63329692fA90B3efd5eB675c601abeDB2DF715a)
 */
export const pollingArbitrumAddress = {
  42161: '0x4f4e551b4920a5417F8d4e7f8f099660dAdadcEC',
  421614: '0xE63329692fA90B3efd5eB675c601abeDB2DF715a'
} as const;

/**
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x4f4e551b4920a5417F8d4e7f8f099660dAdadcEC)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xE63329692fA90B3efd5eB675c601abeDB2DF715a)
 */
export const pollingArbitrumConfig = {
  address: pollingArbitrumAddress,
  abi: pollingArbitrumAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pollingOld
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D)
 */
export const pollingOldAbi = [
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'pollId', type: 'uint256' }],
    name: 'withdrawPoll',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'pollId', type: 'uint256' },
      { name: 'optionId', type: 'uint256' }
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'npoll',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'startDate', type: 'uint256' },
      { name: 'endDate', type: 'uint256' },
      { name: 'multiHash', type: 'string' },
      { name: 'url', type: 'string' }
    ],
    name: 'createPoll',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'creator', type: 'address', indexed: true },
      { name: 'blockCreated', type: 'uint256', indexed: false },
      { name: 'pollId', type: 'uint256', indexed: true },
      { name: 'startDate', type: 'uint256', indexed: false },
      { name: 'endDate', type: 'uint256', indexed: false },
      { name: 'multiHash', type: 'string', indexed: false },
      { name: 'url', type: 'string', indexed: false }
    ],
    name: 'PollCreated'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'creator', type: 'address', indexed: true },
      { name: 'blockWithdrawn', type: 'uint256', indexed: false },
      { name: 'pollId', type: 'uint256', indexed: false }
    ],
    name: 'PollWithdrawn'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'voter', type: 'address', indexed: true },
      { name: 'pollId', type: 'uint256', indexed: true },
      { name: 'optionId', type: 'uint256', indexed: true }
    ],
    name: 'Voted'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D)
 */
export const pollingOldAddress = {
  1: '0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D',
  314310: '0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xF9be8F0945acDdeeDaA64DFCA5Fe9629D0CF8E5D)
 */
export const pollingOldConfig = {
  address: pollingOldAddress,
  abi: pollingOldAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// pot
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const potAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'vat_', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'arg1', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg2', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'Pie',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'cage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'chi',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'drip',
    outputs: [{ name: 'tmp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'dsr',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'exit',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'addr', internalType: 'address', type: 'address' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'wad', internalType: 'uint256', type: 'uint256' }],
    name: 'join',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'live',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'pie',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'rho',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vat',
    outputs: [{ name: '', internalType: 'contract VatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vow',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const potAddress = {
  1: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7',
  314310: '0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7)
 */
export const potConfig = { address: potAddress, abi: potAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// vat
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B)
 */
export const vatAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'arg1', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg2', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg3', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'Line',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'cage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'can',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'dai',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'debt',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'flux',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'i', internalType: 'bytes32', type: 'bytes32' },
      { name: 'u', internalType: 'address', type: 'address' },
      { name: 'rate', internalType: 'int256', type: 'int256' }
    ],
    name: 'fold',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'dink', internalType: 'int256', type: 'int256' },
      { name: 'dart', internalType: 'int256', type: 'int256' }
    ],
    name: 'fork',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'i', internalType: 'bytes32', type: 'bytes32' },
      { name: 'u', internalType: 'address', type: 'address' },
      { name: 'v', internalType: 'address', type: 'address' },
      { name: 'w', internalType: 'address', type: 'address' },
      { name: 'dink', internalType: 'int256', type: 'int256' },
      { name: 'dart', internalType: 'int256', type: 'int256' }
    ],
    name: 'frob',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'gem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'i', internalType: 'bytes32', type: 'bytes32' },
      { name: 'u', internalType: 'address', type: 'address' },
      { name: 'v', internalType: 'address', type: 'address' },
      { name: 'w', internalType: 'address', type: 'address' },
      { name: 'dink', internalType: 'int256', type: 'int256' },
      { name: 'dart', internalType: 'int256', type: 'int256' }
    ],
    name: 'grab',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'rad', internalType: 'uint256', type: 'uint256' }],
    name: 'heal',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'hope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ilks',
    outputs: [
      { name: 'Art', internalType: 'uint256', type: 'uint256' },
      { name: 'rate', internalType: 'uint256', type: 'uint256' },
      { name: 'spot', internalType: 'uint256', type: 'uint256' },
      { name: 'line', internalType: 'uint256', type: 'uint256' },
      { name: 'dust', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'ilk', internalType: 'bytes32', type: 'bytes32' }],
    name: 'init',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'live',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'src', internalType: 'address', type: 'address' },
      { name: 'dst', internalType: 'address', type: 'address' },
      { name: 'rad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'move',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'nope',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'sin',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'ilk', internalType: 'bytes32', type: 'bytes32' },
      { name: 'usr', internalType: 'address', type: 'address' },
      { name: 'wad', internalType: 'int256', type: 'int256' }
    ],
    name: 'slip',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'u', internalType: 'address', type: 'address' },
      { name: 'v', internalType: 'address', type: 'address' },
      { name: 'rad', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'suck',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32' },
      { name: '', internalType: 'address', type: 'address' }
    ],
    name: 'urns',
    outputs: [
      { name: 'ink', internalType: 'uint256', type: 'uint256' },
      { name: 'art', internalType: 'uint256', type: 'uint256' }
    ],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B)
 */
export const vatAddress = {
  1: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B',
  314310: '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B)
 */
export const vatConfig = { address: vatAddress, abi: vatAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// voteDelegateFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC3D809E87A2C9da4F6d98fECea9135d834d6F5A0)
 */
export const voteDelegateFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_chief', internalType: 'address', type: 'address' },
      { name: '_polling', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'voteDelegate',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'CreateVoteDelegate'
  },
  {
    type: 'function',
    inputs: [],
    name: 'chief',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'create',
    outputs: [{ name: 'voteDelegate', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: 'voteDelegate', internalType: 'address', type: 'address' }],
    name: 'created',
    outputs: [{ name: 'created', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'delegates',
    outputs: [{ name: 'voteDelegate', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'isDelegate',
    outputs: [{ name: 'ok', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'polling',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC3D809E87A2C9da4F6d98fECea9135d834d6F5A0)
 */
export const voteDelegateFactoryAddress = {
  1: '0xC3D809E87A2C9da4F6d98fECea9135d834d6F5A0',
  314310: '0x093D305366218D6d09bA10448922F10814b031dd'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xC3D809E87A2C9da4F6d98fECea9135d834d6F5A0)
 */
export const voteDelegateFactoryConfig = {
  address: voteDelegateFactoryAddress,
  abi: voteDelegateFactoryAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// voteDelegateFactoryOld
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD897F108670903D1d6070fcf818f9db3615AF272)
 */
export const voteDelegateFactoryOldAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_chief', internalType: 'address', type: 'address' },
      { name: '_polling', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'delegate',
        internalType: 'address',
        type: 'address',
        indexed: true
      },
      {
        name: 'voteDelegate',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'CreateVoteDelegate'
  },
  {
    type: 'function',
    inputs: [],
    name: 'chief',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'create',
    outputs: [{ name: 'voteDelegate', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'delegates',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'isDelegate',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    inputs: [],
    name: 'polling',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD897F108670903D1d6070fcf818f9db3615AF272)
 */
export const voteDelegateFactoryOldAddress = {
  1: '0xD897F108670903D1d6070fcf818f9db3615AF272',
  314310: '0xD897F108670903D1d6070fcf818f9db3615AF272'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xD897F108670903D1d6070fcf818f9db3615AF272)
 */
export const voteDelegateFactoryOldConfig = {
  address: voteDelegateFactoryOldAddress,
  abi: voteDelegateFactoryOldAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// voteProxyFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6FCD258af181B3221073A96dD90D1f7AE7eEc408)
 */
export const voteProxyFactoryAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'chief_', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'cold', internalType: 'address', type: 'address', indexed: true },
      { name: 'hot', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'voteProxy',
        internalType: 'address',
        type: 'address',
        indexed: true
      }
    ],
    name: 'LinkConfirmed'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'cold', internalType: 'address', type: 'address', indexed: true },
      { name: 'hot', internalType: 'address', type: 'address', indexed: true }
    ],
    name: 'LinkRequested'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'cold', internalType: 'address', type: 'address' }],
    name: 'approveLink',
    outputs: [
      {
        name: 'voteProxy',
        internalType: 'contract VoteProxy',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'breakLink',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'chief',
    outputs: [{ name: '', internalType: 'contract ChiefLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'coldMap',
    outputs: [{ name: '', internalType: 'contract VoteProxy', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', internalType: 'address', type: 'address' }],
    name: 'hasProxy',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'hotMap',
    outputs: [{ name: '', internalType: 'contract VoteProxy', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'hot', internalType: 'address', type: 'address' }],
    name: 'initiateLink',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'linkRequests',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'linkSelf',
    outputs: [
      {
        name: 'voteProxy',
        internalType: 'contract VoteProxy',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6FCD258af181B3221073A96dD90D1f7AE7eEc408)
 */
export const voteProxyFactoryAddress = {
  1: '0x6FCD258af181B3221073A96dD90D1f7AE7eEc408',
  314310: '0x6FCD258af181B3221073A96dD90D1f7AE7eEc408'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x6FCD258af181B3221073A96dD90D1f7AE7eEc408)
 */
export const voteProxyFactoryConfig = {
  address: voteProxyFactoryAddress,
  abi: voteProxyFactoryAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// voteProxyFactoryOld
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa63E145309cadaa6A903a19993868Ef7E85058BE)
 */
export const voteProxyFactoryOldAbi = [
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'linkSelf',
    outputs: [{ name: 'voteProxy', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'hot', type: 'address' }],
    name: 'initiateLink',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: 'guy', type: 'address' }],
    name: 'hasProxy',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'hotMap',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'linkRequests',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'breakLink',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', type: 'address' }],
    name: 'coldMap',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'cold', type: 'address' }],
    name: 'approveLink',
    outputs: [{ name: 'voteProxy', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'chief',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view'
  },
  {
    payable: false,
    type: 'constructor',
    inputs: [{ name: 'chief_', type: 'address' }],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'cold', type: 'address', indexed: true },
      { name: 'hot', type: 'address', indexed: true }
    ],
    name: 'LinkRequested'
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'cold', type: 'address', indexed: true },
      { name: 'hot', type: 'address', indexed: true },
      { name: 'voteProxy', type: 'address', indexed: true }
    ],
    name: 'LinkConfirmed'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa63E145309cadaa6A903a19993868Ef7E85058BE)
 */
export const voteProxyFactoryOldAddress = {
  1: '0xa63E145309cadaa6A903a19993868Ef7E85058BE',
  314310: '0xa63E145309cadaa6A903a19993868Ef7E85058BE'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xa63E145309cadaa6A903a19993868Ef7E85058BE)
 */
export const voteProxyFactoryOldConfig = {
  address: voteProxyFactoryOldAddress,
  abi: voteProxyFactoryOldAbi
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// vow
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA950524441892A31ebddF91d3cEEFa04Bf454466)
 */
export const vowAbi = [
  {
    payable: false,
    type: 'constructor',
    inputs: [
      { name: 'vat_', internalType: 'address', type: 'address' },
      { name: 'flapper_', internalType: 'address', type: 'address' },
      { name: 'flopper_', internalType: 'address', type: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    anonymous: true,
    inputs: [
      { name: 'sig', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'usr', internalType: 'address', type: 'address', indexed: true },
      { name: 'arg1', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'arg2', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false }
    ],
    name: 'LogNote'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'Ash',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'Sin',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'bump',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'cage',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'deny',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'dump',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'tab', internalType: 'uint256', type: 'uint256' }],
    name: 'fess',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'uint256', type: 'uint256' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [
      { name: 'what', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'address', type: 'address' }
    ],
    name: 'file',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'flap',
    outputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'flapper',
    outputs: [{ name: '', internalType: 'contract FlapLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'era', internalType: 'uint256', type: 'uint256' }],
    name: 'flog',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'flop',
    outputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'flopper',
    outputs: [{ name: '', internalType: 'contract FlopLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'rad', internalType: 'uint256', type: 'uint256' }],
    name: 'heal',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'hump',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'rad', internalType: 'uint256', type: 'uint256' }],
    name: 'kiss',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'live',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: false,
    payable: false,
    type: 'function',
    inputs: [{ name: 'usr', internalType: 'address', type: 'address' }],
    name: 'rely',
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'sin',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'sump',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'vat',
    outputs: [{ name: '', internalType: 'contract VatLike', type: 'address' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [],
    name: 'wait',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  },
  {
    constant: true,
    payable: false,
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'wards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA950524441892A31ebddF91d3cEEFa04Bf454466)
 */
export const vowAddress = {
  1: '0xA950524441892A31ebddF91d3cEEFa04Bf454466',
  314310: '0xA950524441892A31ebddF91d3cEEFa04Bf454466'
} as const;

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xA950524441892A31ebddF91d3cEEFa04Bf454466)
 */
export const vowConfig = { address: vowAddress, abi: vowAbi } as const;
