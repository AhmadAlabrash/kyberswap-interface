import React, { useState, useCallback, useMemo } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'

import { Currency } from 'libs/sdk/src'
import { ButtonOutlined, ButtonPrimary } from 'components/Button'
import PoolsCurrencyInputPanel from 'components/PoolsCurrencyInputPanel'
import Panel from 'components/Panel'
import PoolList from 'components/PoolList'
import Search from 'components/Search'
import LocalLoader from 'components/LocalLoader'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { useETHPrice } from 'state/application/hooks'
import { useDerivedPairInfo, usePairActionHandlers } from 'state/pair/hooks'
import { useUserLiquidityPositions, useBulkPoolData, useResetPools } from 'state/pools/hooks'
import { Field } from 'state/pair/actions'
import { currencyId } from 'utils/currencyId'
import { useGlobalData } from 'state/about/hooks'
import {
  PageWrapper,
  GlobalDataContainer,
  GlobalDataItem,
  GlobalDataItemTitle,
  GlobalDataItemValue,
  AddLiquidityInstructionContainer,
  AddLiquidityTitleContainer,
  AddLiquidityTitle,
  AddLiquidityInstructionText,
  ToolbarWrapper,
  CurrencyWrapper,
  SearchWrapper,
  SelectPairInstructionWrapper
} from './styleds'
import { formatBigLiquidity } from 'utils/formatBalance'
import Loader from 'components/Loader'
import AddLiquidityIcon from 'assets/svg/add-liquidity-icon.svg'

const Pools = ({
  match: {
    params: { currencyIdA, currencyIdB }
  },
  history
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) => {
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()
  const [searchValue, setSearchValue] = useState('')

  const above1400 = useMedia('(min-width: 1400px)')

  // Pool selection
  const { onCurrencySelection } = usePairActionHandlers()
  // const {
  //   [Field.CURRENCY_A]: { currencyId: currencyIdA },
  //   [Field.CURRENCY_B]: { currencyId: currencyIdB }
  // } = usePairState()

  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)
  const { currencies, pairs } = useDerivedPairInfo(currencyA ?? undefined, currencyB ?? undefined)

  const ethPrice = useETHPrice()

  const handleCurrencyASelect = useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = currencyId(currencyA, chainId)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/pools/${currencyIdB}/${currencyIdA}`)
      } else {
        history.push(`/pools/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, history, currencyIdA, chainId]
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB: Currency) => {
      const newCurrencyIdB = currencyId(currencyB, chainId)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/pools/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/pools/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/pools/${currencyIdA ? currencyIdA : 'ETH'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB, chainId]
  )

  const poolsList = useMemo(
    () =>
      pairs
        .map(([pairState, pair]) => pair)
        .filter(pair => pair !== null)
        .filter(pair => {
          if (searchValue) {
            return pair?.address.toLowerCase().includes(searchValue.toLowerCase())
          }

          return true
        }),
    [pairs, searchValue]
  )

  // format as array of addresses
  const formattedPools = useMemo(() => poolsList.map(pool => pool?.address.toLowerCase()), [poolsList])

  useResetPools(currencyA ?? undefined, currencyB ?? undefined)

  // get data for every pool in list
  const { loading: loadingPoolsData, error: errorPoolsData, data: poolsData } = useBulkPoolData(
    formattedPools,
    ethPrice.currentPrice
  )

  // const { loading: loadingUserLiquidityPositions, data: userLiquidityPositions } = useUserLiquidityPositions(account)
  const temp = useUserLiquidityPositions(account)
  const loadingUserLiquidityPositions = !account ? false : temp.loading
  const userLiquidityPositions = !account ? { liquidityPositions: [] } : temp.data

  const data = useGlobalData()

  const globalData = data && data.dmmFactories[0]

  return (
    <>
      <PageWrapper>
        <GlobalDataContainer>
          <GlobalDataItem>
            <GlobalDataItemTitle>Total Trading Volume:</GlobalDataItemTitle>
            <GlobalDataItemValue>
              {globalData ? formatBigLiquidity(globalData.totalVolumeUSD, 2, true) : <Loader />}
            </GlobalDataItemValue>
          </GlobalDataItem>
          <GlobalDataItem>
            <GlobalDataItemTitle>Total Value Locked:</GlobalDataItemTitle>
            <GlobalDataItemValue>
              {globalData ? formatBigLiquidity(globalData.totalLiquidityUSD, 2, true) : <Loader />}
            </GlobalDataItemValue>
          </GlobalDataItem>
          <GlobalDataItem>
            <GlobalDataItemTitle>Total AMP Liquidity:</GlobalDataItemTitle>
            <GlobalDataItemValue>
              {globalData ? formatBigLiquidity(globalData.totalAmplifiedLiquidityUSD, 2, true) : <Loader />}
            </GlobalDataItemValue>
          </GlobalDataItem>
        </GlobalDataContainer>

        <AddLiquidityInstructionContainer>
          <AddLiquidityTitleContainer>
            <span>
              <img src={AddLiquidityIcon} alt="Add liquidity icon" />
            </span>
            <AddLiquidityTitle>Add liquidity:</AddLiquidityTitle>
          </AddLiquidityTitleContainer>
          <AddLiquidityInstructionText>
            Receive liquidity pool tokens representing your position and earn fees proportional to your pool share. Fees
            are automatically claimed when you withdraw your liquidity.
          </AddLiquidityInstructionText>
        </AddLiquidityInstructionContainer>

        {above1400 ? (
          <>
            <div style={{ marginBottom: '16px' }}>{t('selectPair')}</div>
            <ToolbarWrapper>
              <CurrencyWrapper>
                <PoolsCurrencyInputPanel
                  onCurrencySelect={handleCurrencyASelect}
                  currency={currencies[Field.CURRENCY_A]}
                  otherCurrency={currencies[Field.CURRENCY_B]}
                  id="input-tokena"
                />
                <span style={{ margin: '0 8px' }}>/</span>
                <PoolsCurrencyInputPanel
                  onCurrencySelect={handleCurrencyBSelect}
                  currency={currencies[Field.CURRENCY_B]}
                  otherCurrency={currencies[Field.CURRENCY_A]}
                  id="input-tokenb"
                />

                <ButtonPrimary
                  padding="8px 28px"
                  as={Link}
                  to={`/swap?inputCurrency=${currencyId(
                    currencies[Field.CURRENCY_A] as Currency,
                    chainId
                  )}&outputCurrency=${currencyId(currencies[Field.CURRENCY_B] as Currency, chainId)}`}
                  width="fit-content"
                  style={{ marginLeft: '1rem', borderRadius: '8px' }}
                >
                  <span>Trade</span>
                </ButtonPrimary>
              </CurrencyWrapper>

              <SearchWrapper>
                <Search searchValue={searchValue} setSearchValue={setSearchValue} />
                <ButtonOutlined
                  width="148px"
                  padding="12px 18px"
                  as={Link}
                  to={`/create/${currencyIdA == '' ? undefined : currencyIdA}/${
                    currencyIdB == '' ? undefined : currencyIdB
                  }`}
                  style={{ float: 'right' }}
                >
                  {t('createNewPool')}
                </ButtonOutlined>
              </SearchWrapper>
            </ToolbarWrapper>
          </>
        ) : (
          <>
            <ToolbarWrapper>
              <div>{t('selectPair')}</div>
              <SearchWrapper>
                <ButtonOutlined
                  width="98px"
                  padding="10px 12px"
                  as={Link}
                  to={`/create/${currencyIdA == '' ? undefined : currencyIdA}/${
                    currencyIdB == '' ? undefined : currencyIdB
                  }`}
                  style={{ float: 'right' }}
                >
                  {t('newPool')}
                </ButtonOutlined>
              </SearchWrapper>
            </ToolbarWrapper>
            <CurrencyWrapper>
              <PoolsCurrencyInputPanel
                onCurrencySelect={handleCurrencyASelect}
                currency={currencies[Field.CURRENCY_A]}
                otherCurrency={currencies[Field.CURRENCY_B]}
                id="input-tokena"
              />
              <PoolsCurrencyInputPanel
                onCurrencySelect={handleCurrencyBSelect}
                currency={currencies[Field.CURRENCY_B]}
                otherCurrency={currencies[Field.CURRENCY_A]}
                id="input-tokenb"
              />
            </CurrencyWrapper>
          </>
        )}

        <Panel>
          {loadingUserLiquidityPositions || loadingPoolsData ? (
            <LocalLoader />
          ) : poolsList.length > 0 ? (
            <PoolList
              poolsList={poolsList}
              subgraphPoolsData={poolsData}
              userLiquidityPositions={userLiquidityPositions?.liquidityPositions}
              maxItems={3}
            />
          ) : (
            <SelectPairInstructionWrapper>
              <div style={{ marginBottom: '1rem' }}>{t('thereAreNoPools')}</div>
              <div>{t('thereAreNoPoolsInstruction')}</div>
            </SelectPairInstructionWrapper>
          )}
        </Panel>
      </PageWrapper>
    </>
  )
}

export default Pools
