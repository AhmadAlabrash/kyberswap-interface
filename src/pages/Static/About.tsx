import React from 'react'
import ReactPlayer from 'react-player/lazy'
import style from './about.module.scss'

import { Box, Flex, Image, Text } from 'rebass'
import { Link } from 'react-router-dom'

import { ButtonOutlined, ButtonPrimary } from 'components/Button'
import Loader from 'components/Loader'
import { ExternalLink } from 'theme'
import { useGlobalData } from 'state/about/hooks'
import { useActiveWeb3React } from 'hooks'
import { ChainId, ETHER } from 'libs/sdk/src'
import { DMM_ANALYTICS_URL, KNC } from '../../constants'
import AccessLiquidity from '../../assets/svg/access-liquidity.svg'
import Straightforward from '../../assets/svg/straightforward.svg'
import NoRisk from '../../assets/svg/no-risk.svg'
import { formatBigLiquidity } from 'utils/formatBalance'
import { convertToNativeTokenFromETH } from 'utils/dmm'

const getPoolsMenuLink = (chainId?: ChainId) => {
  switch (chainId) {
    case ChainId.MAINNET:
      return `/pools/${convertToNativeTokenFromETH(ETHER, chainId).symbol}/${KNC[chainId as ChainId].address}`
    case ChainId.ROPSTEN:
      return `/pools/${convertToNativeTokenFromETH(ETHER, chainId).symbol}/${KNC[chainId as ChainId].address}`
    case ChainId.MATIC:
      return `/pools/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/${KNC[chainId as ChainId].address}`
    case ChainId.MUMBAI:
      return `/pools/0x19395624C030A11f58e820C3AeFb1f5960d9742a/${KNC[chainId as ChainId].address}`
    default:
      return '/pools/ETH'
  }
}

export default function About() {
  const { chainId } = useActiveWeb3React()

  const poolsMenuLink = getPoolsMenuLink(chainId)
  const data = useGlobalData()

  const globalData = data && data.dmmFactories[0]

  return (
    <div className={style.wrapper}>
      <div className={style.image1}></div>
      <div className={style.image2}></div>
      <div className={style.image3} style={{ bottom: `0` }}></div>
      <Text fontSize={[24, 58]} mt={[35, 150]}>
        <Text fontWeight={300} color={'#ffffff'}>
          DeFi's First
        </Text>
        <Text fontWeight={700}>
          <Text color={'#1183b7'} display={'inline-block'}>
            Dynamic&nbsp;
          </Text>
          <Text color={'#08a1e7'} display={'inline-block'}>
            Market&nbsp;
          </Text>
          <Text color={'#78d5ff'} display={'inline-block'}>
            Maker&nbsp;
          </Text>
          <Text color={'#ffffff'} display={'inline-block'} fontWeight={300}>
            Protocol&nbsp;
          </Text>
        </Text>
      </Text>
      <Text px={4} mt={10} fontSize={[16, 21]} color={'#ffffff'}>
        Providing frictionless crypto liquidity with greater flexibility and extremely high capital efficiency
      </Text>

      <div className={style.section_number_container}>
        <div className={`${style.section_number} ${style.trading_volume_section}`}>
          <div>
            <Text fontSize={[24, 28]} fontWeight={[600, 700]} color="#FFFFFF">
              {globalData ? formatBigLiquidity(globalData.totalVolumeUSD, 2, true) : <Loader />}
            </Text>
            <Text fontSize={14} mt={2}>
              Total Trading Volume
            </Text>
          </div>
        </div>

        <div className={style.section_number}>
          <div className={style.liquidity_number}>
            <Text fontSize={[24, 28]} fontWeight={[600, 700]} color="#FFFFFF" mt={[0, 0]}>
              {globalData ? formatBigLiquidity(globalData.totalLiquidityUSD, 2, true) : <Loader />}
            </Text>
            <Text fontSize={14} mt={2}>
              Total Value Locked
            </Text>
          </div>
          <div className={style.line}></div>
          <div className={style.amp_liquidity_number}>
            <Text fontSize={[24, 28]} fontWeight={[600, 700]} color="#FFFFFF" mt={[0, 0]}>
              {globalData ? formatBigLiquidity(globalData.totalAmplifiedLiquidityUSD, 2, true) : <Loader />}
            </Text>
            <Text fontSize={14} mt={2}>
              Total AMP Liquitity
            </Text>
            <Text fontSize={10} fontStyle="italic" mt={2}>
              Equivalent TVL when compared to typical AMMs
            </Text>
          </div>
        </div>
      </div>

      <div className={style.panel0}>
        <ButtonPrimary padding="12px 10px" as={Link} to={poolsMenuLink}>
          Add Liquidity
        </ButtonPrimary>
        <ButtonOutlined
          padding="12px 10px"
          as={ExternalLink}
          href={`https://docs.dmm.exchange`}
          target="_blank"
          style={{ fontSize: '16px' }}
        >
          Documentation
        </ButtonOutlined>
      </div>
      <Text mt={[70, 100]} color={'#f4f4f4'} fontSize={[24, 40]}>
        <span>Amplified Liquidity Pools</span>
      </Text>
      <div className={style.section_curve_details}>
        <i>
          <Text mb={15}>Less tokens required for high liquidity</Text>
        </i>
        <div>
          Kyber DMM’s Programmable Pricing Curve enables liquidity pool creators to set a suitable pricing curve and
          create amplified pools in advance, achieving&nbsp;
          <b>much higher capital efficiency</b> for providers and <b>better slippage</b> for users compared to AMMs.
        </div>
      </div>
      <Text fontSize={[16, 24]} fontWeight={600} px={2}>
        DMM can be up to 100x more capital efficient than typical AMMs
      </Text>
      <div className={style.section_amp}>
        <div className={[style.box, style.box_1].join(' ')}>
          <div>Typical AMM</div>
          <div>&nbsp;</div>
          <div>~11%</div>
          <div>Slippage</div>
        </div>
        <div className={[style.box, style.box_1].join(' ')}>
          <div>DMM</div>
          <div>Capital Amp Factor = 5</div>
          <div>~2%</div>
          <div>Slippage</div>
        </div>
        <div className={[style.box, style.box_1].join(' ')}>
          <div>DMM</div>
          <div>Capital Amp Factor = 10</div>
          <div>~0.1%</div>
          <div>Slippage</div>
        </div>
      </div>
      <i>
        <Text fontSize={[12, 14]} px={2} color="#859aa5">
          *Slippage Incurred: Assuming liquidity of $1M for each token and a $100K trade
        </Text>
      </i>

      <Text fontSize={[24, 36]} fontWeight={500} mt={100} mb={56} color={'#f4f4f4'} style={{ position: 'relative' }}>
        <span>Dynamic Fees</span>
      </Text>

      <div className={style.section_fee}>
        <i>
          <Text mb={15}>Higher earnings potential for liquidity providers, reducing the impact of IL</Text>
        </i>
        <div>
          Kyber DMM trading fees are <b>adjusted dynamically</b> according to on-chain market conditions. In a volatile
          market (higher than usual volume), fees automatically increase to an optimal level, reducing the impact of
          impermanent loss. In periods of low volatility, fees decrease to encourage more trading.
        </div>
      </div>

      <div className={style.section_graph}>
        <div className={style.left}></div>
        <div className={style.right}>
          <div className={style.item}>
            <div className={[style.box, style.box_1].join(' ')}></div>
            <Text fontSize={[12, 14]} mt={[10, 25]}>
              Reduce the impact of IL
            </Text>
          </div>
          <div className={style.item}>
            <div className={[style.box, style.box_2].join(' ')}></div>
            <Text fontSize={[12, 14]} mt={[10, 25]}>
              Increase LP Profit
            </Text>
          </div>
          <div className={style.item}>
            <div className={[style.box, style.box_3].join(' ')}></div>
            <Text fontSize={[12, 14]} mt={[10, 25]}>
              Encourage trading
            </Text>
          </div>
        </div>
      </div>

      <Text fontSize={[24, 36]} color={'#f4f4f4'} mt={[50, 135]} px={2}>
        <span>Permissionless and Frictionless Liquidity for DeFi</span>
      </Text>
      <div style={{ padding: '0 24px' }}>
        <Box width={['100%', 780]} mx="auto">
          <img src={require('../../assets/svg/permissionless_frictionless.svg')} />
          <Text mt={[16, 20]} color="#c9d2d7" lineHeight="26px">
            Anyone can provide liquidity by depositing token inventory into various pools and any taker (e.g. Dapps,
            aggregators, end users) can source liquidity from the DMM.
          </Text>
        </Box>
      </div>

      <ButtonOutlined
        width="248px"
        padding="12px 18px"
        as={Link}
        to={poolsMenuLink}
        style={{ margin: '60px auto 100px auto', fontSize: '16px' }}
      >
        Explore pools
      </ButtonOutlined>

      <div className={style.youtube_video}>
        <ReactPlayer url="https://www.youtube.com/watch?v=2xgboyu7rss" />
      </div>

      <Text fontSize={[24, 36]} color={'#f4f4f4'} mt={[100, 200]} mb={45} maxWidth={'700px'} mx="auto">
        Access DMM Liquidity for your Blockchain Platform
      </Text>
      <Text fontSize={[16, 20]} maxWidth="700px" mx="auto">
        <Flex justifyContent="space-between">
          <div>
            <img src={AccessLiquidity} alt="icon" />
            <Text fontSize={[14, 18]} mt={[34]} mb={45} textAlign="center">
              Open Access to <br /> Liquidity
            </Text>
          </div>
          <div>
            <img src={Straightforward} alt="icon" />
            <Text fontSize={[14, 18]} mt={[34]} mb={45} textAlign="center">
              Fully On-chain; <br /> Straightforward Integration
            </Text>
          </div>
          <div>
            <img src={NoRisk} alt="icon" />
            <Text fontSize={[14, 18]} mt={[34]} mb={45} textAlign="center">
              No external and <br /> centralized oracle risk
            </Text>
          </div>
        </Flex>
        All the documentation and tools necessary for developers to connect their Dapps to frictionless liquidity to
        perform DeFi functions such token swaps, flash loans, on-chain liquidation, and portfolio rebalancing.
      </Text>
      <div className={style.panel}>
        <ButtonOutlined
          padding="12px 28px"
          as={ExternalLink}
          href={DMM_ANALYTICS_URL[chainId as ChainId]}
          style={{ width: 'auto', fontSize: '16px' }}
        >
          Analytics
        </ButtonOutlined>
        <ButtonOutlined
          padding="12px 28px"
          as={ExternalLink}
          href={`https://github.com/dynamic-amm`}
          style={{ width: 'auto', fontSize: '16px' }}
        >
          Github
        </ButtonOutlined>
        <ButtonOutlined
          padding="12px 28px"
          as={ExternalLink}
          href={`https://files.kyber.network/DMM-Feb21.pdf`}
          style={{ width: 'auto', fontSize: '16px' }}
        >
          Litepaper
        </ButtonOutlined>
        <ButtonOutlined
          padding="12px 28px"
          as={ExternalLink}
          href={`https://discord.com/invite/HdXWUb2pQM`}
          style={{ width: 'auto', fontSize: '16px' }}
        >
          Developer Support
        </ButtonOutlined>
      </div>

      <Text fontSize={[24, 36]} color={'#f4f4f4'} mt={[100, 200]} mb={45} px={2}>
        Committed to Security
      </Text>
      <div className={style.security}>
        <div>
          <Text fontSize={[12, 18]} fontWeight={500}>
            Code Audited
          </Text>
          <ExternalLink href="https://chainsecurity.com/wp-content/uploads/2021/04/ChainSecurity_KyberNetwork_DMM_Dynamic-Market-Making_Final.pdf">
            <img src={require('../../assets/svg/chainsecurity.svg')} />
          </ExternalLink>
        </div>
        <div>
          <Text fontSize={[12, 18]} fontWeight={500}>
            On-chain and Open Source
          </Text>
          <img src={require('../../assets/svg/about_icon_github.jpg')} />
        </div>
        <div>
          <Text fontSize={[12, 18]} fontWeight={500}>
            Bug Bounty
          </Text>
          <img src={require('../../assets/svg/about_icon_bug_bounty.svg')} />
        </div>
        <div>
          <Text fontSize={[12, 18]} fontWeight={500}>
            Insured by
          </Text>
          <img src={require('../../assets/svg/unslashed.svg')} />
        </div>
      </div>
      <div className={style.powered}>
        <div>
          <Text fontSize={[12, 18]} fontWeight={500} mb={4}>
            Powered by
          </Text>
          <img src={require('../../assets/svg/about_icon_kyber.svg')} />
        </div>
        <img src={require('../../assets/svg/about_icon_ethereum.png')} />
      </div>
      <div className={style.footer}>
        <div className={style.content}>
          <div className={style.left}>
            <Text>
              <ExternalLink href={`https://docs.dmm.exchange`}>DevPortal</ExternalLink>
            </Text>
            <Text>
              <ExternalLink href={`https://github.com/dynamic-amm`}>Github</ExternalLink>
            </Text>
            <Text>
              <ExternalLink href={`https://kyber.org`}>KyberDAO</ExternalLink>
            </Text>
            <Text>
              <a>Forum</a>
            </Text>
            <Text>
              <ExternalLink href={`https://files.kyber.network/DMM-Feb21.pdf`}>DMM Litepaper</ExternalLink>
            </Text>
            {/* <Text>
              <a>FAQ</a>
            </Text> */}
            <Text>
              <ExternalLink href={`http://files.dmm.exchange/privacy.pdf`}>Privacy</ExternalLink>
            </Text>
            <Text>
              <ExternalLink href={`http://files.dmm.exchange/tac.pdf`}>Terms</ExternalLink>
            </Text>
            <Text>
              <ExternalLink href={`https://kyber.network/`}>Kyber Network</ExternalLink>
            </Text>
          </div>
          <div className={style.right}>
            <ExternalLink href={`https://twitter.com/KyberNetwork/`}>
              <Image src={require('../../assets/svg/about_icon_twitter.svg')} />
            </ExternalLink>
            <ExternalLink href={`https://discord.gg/HdXWUb2pQM`}>
              <Image src={require('../../assets/svg/about_icon_discord.svg')} />
            </ExternalLink>
            <ExternalLink href={`https://blog.kyber.network`}>
              <Image src={require('../../assets/svg/about_icon_medium.svg')} />
            </ExternalLink>
            <Text fontSize={12} ml={['auto', 0]}>
              (c) dmm.exchange
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

{
  /* <div className={style.wrapper6}>
        <div>
          <div className={[style.box, style.box_1].join(' ')}></div>
          <div className={style.text_5}>Reduce the impact of IL</div>
          <div className={style.text_6}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sollicitudin ultricies. Nam viverra
            urna quis vulputate pulvinar. Curabitur aliquet id nisl et tempor.
          </div>
        </div>
        <div>
          <div className={[style.box, style.box_2].join(' ')}></div>
          <div className={style.text_5}>Increase LP Profit</div>
          <div className={style.text_6}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sollicitudin ultricies. Nam viverra
            urna quis vulputate pulvinar. Curabitur aliquet id nisl et tempor.
          </div>
        </div>
        <div>
          <div className={[style.box, style.box_3].join(' ')}></div>
          <div className={style.text_5}>Encourage trading</div>
          <div className={style.text_6}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sollicitudin ultricies. Nam viverra
            urna quis vulputate pulvinar. Curabitur aliquet id nisl et tempor.
          </div>
        </div>
      </div> */
}
