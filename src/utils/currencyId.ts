import { ChainId, Currency, ETHER, Token, WETH } from 'libs/sdk/src'
import { convertToNativeTokenFromETH } from './dmm'

export function currencyId(currency: Currency, chainId?: ChainId): string {
  if (currency === ETHER && !!chainId) return convertToNativeTokenFromETH(currency, chainId).symbol as string
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export function currencyIdFromAddress(address: string, chainId?: ChainId): string {
  if (
    (chainId === ChainId.MAINNET || chainId === ChainId.ROPSTEN) &&
    WETH[chainId].address.toLowerCase() === address.toLowerCase()
  ) {
    return 'ETH'
  }

  if (
    (chainId === ChainId.MATIC || chainId === ChainId.MUMBAI) &&
    WETH[chainId].address.toLowerCase() === address.toLowerCase()
  ) {
    return 'MATIC'
  }

  return address
}
