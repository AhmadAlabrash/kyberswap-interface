export const MATIC_TOKEN_LIST = {
  name: 'DmmExchange Token List',
  keywords: ['dmmexchange'],
  timestamp: '2020-12-12T00:00:00+00:00',
  tokens: [
    {
      chainId: 137,
      address:
        process.env.REACT_APP_MAINNET_ENV === 'staging'
          ? '0x51E8D106C646cA58Caf32A47812e95887C071a62'
          : '0x1C954E8fe737F99f68Fa1CCda3e51ebDB291948C',
      symbol: 'KNC',
      name: 'Kyber Network Crystal',
      decimals: 18
    },
    {
      chainId: 137,
      address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18
    },
    {
      chainId: 137,
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      symbol: 'USDC',
      name: 'USDC',
      decimals: 6
    },
    {
      chainId: 137,
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      symbol: 'USDT',
      name: 'USDT',
      decimals: 6
    },
    {
      chainId: 137,
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      symbol: 'DAI',
      name: 'DAI',
      decimals: 18
    }
  ],
  version: {
    major: 0,
    minor: 0,
    patch: 0
  }
}
