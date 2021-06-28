import React, { Suspense } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { ApolloProvider } from '@apollo/client'

import { defaultExchangeClient, exchangeCient } from 'apollo/client'
import Header from '../components/Header'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import Utilities from 'components/Footer/Utilities'
import PoweredBy from 'components/Footer/PoweredBy'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Pool from './Pool'
import Migration from './Pool/lp'
import Pools from './Pools'
import Farms from './Farms'
import PoolFinder from './PoolFinder'
import PoolFinderExternal from './PoolFinder/PoolFinderExternal'
import RemoveLiquidity from './RemoveLiquidity'
import MigrateLiquidityUNI from './RemoveLiquidity/migrate_uni'
import MigrateLiquiditySUSHI from './RemoveLiquidity/migrate_sushi'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import About from './Static/About'
import { BLACKLIST_WALLETS } from '../constants'
import { useActiveWeb3React } from 'hooks'
import Vesting from './Farms/vesting'
import { ChainId } from 'libs/sdk/src'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div<{ isAboutpage?: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  padding-top: 32px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme, isAboutpage }) => theme.mediaWidth.upToSmall`
    ${isAboutpage ? `` : `padding: 16px;`}
    padding-top: 2rem;
  `};
  z-index: 1;
`

const UtilitiesWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  top: 0;
  right: 0;
  opacity: 0.8;
  transition: opacity 0.25s ease;
  :hover {
    opacity: 1;
  }

  ${({ theme }) => theme.mediaWidth.upToLarge`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    position: fixed;
    top: auto;
    bottom: 5.5rem;
    left: 0;
    right: auto;
    height: fit-content;
    z-index: 99;
  `}
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  const { account, chainId } = useActiveWeb3React()
  const aboutPage = useRouteMatch('/about')
  const apolloClient = exchangeCient[chainId as ChainId]

  return (
    <>
      {(!account || !BLACKLIST_WALLETS.includes(account)) && (
        <ApolloProvider client={apolloClient || defaultExchangeClient}>
          <Suspense fallback={null}>
            <Route component={DarkModeQueryParamReader} />
            <AppWrapper>
              <URLWarning />
              <HeaderWrapper>
                <Header />
              </HeaderWrapper>
              <BodyWrapper isAboutpage={aboutPage?.isExact}>
                <Popups />
                <UtilitiesWrapper>
                  <Utilities />
                  <PoweredBy />
                </UtilitiesWrapper>
                <Web3ReactManager>
                  <Switch>
                    <Route exact strict path="/swap" component={Swap} />
                    <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                    <Route exact strict path="/find" component={PoolFinder} />
                    <Route exact strict path="/findExternal" component={PoolFinderExternal} />
                    <Route exact strict path="/pools" component={Pools} />
                    <Route exact strict path="/pools/:currencyIdA" component={Pools} />
                    <Route exact strict path="/pools/:currencyIdA/:currencyIdB" component={Pools} />
                    <Route exact strict path="/farms" component={Farms} />
                    <Route exact strict path="/farms/:lp" component={Vesting} />
                    <Route exact strict path="/myPools" component={Pool} />
                    <Route exact strict path="/migration" component={Migration} />
                    <Route exact path="/add" component={AddLiquidity} />
                    <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                    <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                    <Route
                      exact
                      path="/add/:currencyIdA/:currencyIdB/:pairAddress"
                      component={RedirectDuplicateTokenIds}
                    />
                    <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                    <Route
                      exact
                      strict
                      path="/remove/:currencyIdA/:currencyIdB/:pairAddress"
                      component={RemoveLiquidity}
                    />
                    <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                    <Route exact path="/create" component={AddLiquidity} />
                    <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                    <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                    <Route
                      exact
                      path="/add/:currencyIdA/:currencyIdB/:pairAddress"
                      component={RedirectDuplicateTokenIds}
                    />
                    <Route
                      exact
                      strict
                      path="/migrateSushi/:currencyIdA/:currencyIdB"
                      component={MigrateLiquiditySUSHI}
                    />
                    <Route exact strict path="/migrate/:currencyIdA/:currencyIdB" component={MigrateLiquidityUNI} />
                    <Route exact path="/about" component={About} />
                    <Route component={RedirectPathToSwapOnly} />
                  </Switch>
                </Web3ReactManager>
                <Marginer />
              </BodyWrapper>
            </AppWrapper>
          </Suspense>
        </ApolloProvider>
      )}
    </>
  )
}
