import React from 'react'
import styled from 'styled-components'
import PoweredByIconLight from 'components/Icons/PoweredByIconLight'
import PoweredByIconDark from 'components/Icons/PoweredByIconDark'
import { ExternalLink } from '../../theme'
import { useDarkModeManager } from 'state/user/hooks'

const StyledPoweredBy = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  bottom: 0;
  padding: 1rem;
  opacity: 0.7;
  transition: opacity 0.25s ease;
  :hover {
    opacity: 1;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: auto;
    bottom: 4.5rem;
  `}
`

export default function PoweredBy() {
  const [darkMode] = useDarkModeManager()

  return (
    <ExternalLink href="https://kyber.network/">
      <StyledPoweredBy>{darkMode ? <PoweredByIconDark /> : <PoweredByIconLight />}</StyledPoweredBy>
    </ExternalLink>
  )
}
