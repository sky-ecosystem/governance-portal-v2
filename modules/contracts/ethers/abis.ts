export const voteProxyAbi = [
  {
    constant: true,
    inputs: [],
    name: 'gov',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'cold',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'freeAll',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'iou',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'slate', type: 'bytes32' }],
    name: 'vote',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'free',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'lock',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'hot',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'yays', type: 'address[]' }],
    name: 'vote',
    outputs: [{ name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'chief',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: '_chief', type: 'address' },
      { name: '_cold', type: 'address' },
      { name: '_hot', type: 'address' }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  }
] as const;

export const voteDelegateAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_chief',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_polling',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_delegate',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'usr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256'
      }
    ],
    name: 'Free',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'usr',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256'
      }
    ],
    name: 'Lock',
    type: 'event'
  },
  {
    inputs: [],
    name: 'chief',
    outputs: [
      {
        internalType: 'contract ChiefLike',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'delegate',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'expiration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256'
      }
    ],
    name: 'free',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: false
  },
  {
    inputs: [],
    name: 'gov',
    outputs: [
      {
        internalType: 'contract TokenLike',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [],
    name: 'iou',
    outputs: [
      {
        internalType: 'contract TokenLike',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wad',
        type: 'uint256'
      }
    ],
    name: 'lock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: false
  },
  {
    inputs: [],
    name: 'polling',
    outputs: [
      {
        internalType: 'contract PollingLike',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'stake',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'slate',
        type: 'bytes32'
      }
    ],
    name: 'vote',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: false
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'yays',
        type: 'address[]'
      }
    ],
    name: 'vote',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'result',
        type: 'bytes32'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: false
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'pollIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: 'optionIds',
        type: 'uint256[]'
      }
    ],
    name: 'votePoll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: false
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pollId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'optionId',
        type: 'uint256'
      }
    ],
    name: 'votePoll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: false
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pollId',
        type: 'uint256'
      }
    ],
    name: 'withdrawPoll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: false
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'pollIds',
        type: 'uint256[]'
      }
    ],
    name: 'withdrawPoll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
    constant: false
  }
] as const;

export const dsSpellAbi = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    constant: true,
    name: 'action',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'cast',
    constant: false,
    payable: false,
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'description',
    payable: false,
    constant: true,
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'done',
    constant: true,
    payable: false,
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'eta',
    constant: true,
    payable: false,
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'expiration',
    constant: true,
    payable: false,
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'log',
    constant: true,
    payable: false,
    outputs: [
      {
        internalType: 'contract Changelog',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    constant: true,
    name: 'nextCastTime',
    outputs: [
      {
        internalType: 'uint256',
        name: 'castTime',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    constant: true,
    name: 'officeHours',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    constant: true,
    name: 'pause',
    outputs: [
      {
        internalType: 'contract PauseAbstract',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    constant: false,
    name: 'schedule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sig',
    payable: false,
    constant: true,
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'tag',
    payable: false,
    constant: true,
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;
