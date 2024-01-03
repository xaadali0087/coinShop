import React from 'react'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WagmiConfig } from 'wagmi'

import SettingsContextProvider from '@/contexts/SettingsContext'
import W3iContextProvider from '@/contexts/W3iContext'
import ConfiguredRoutes from '@/routes'
import { polyfill } from '@/utils/polyfill'
import { initSentry } from '@/utils/sentry'

import { Modals } from './Modals'

import './index.css'

polyfill()
initSentry()

const projectId = import.meta.env.VITE_PROJECT_ID
import {
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom,
  aurora,
  evmos,
  filecoin,
  base,
  celo,
  iotex,
  metis,
  moonbeam,
  moonriver,
  zora,
  zkSync,
  localhost,
} from 'wagmi/chains'



const chains = [mainnet, polygon, avalanche, arbitrum, bsc, optimism, gnosis, fantom, aurora, evmos, filecoin, base, celo,
  iotex, metis, moonbeam, moonriver, zora, zkSync, localhost]


const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME
const metadata = {
  name: PROJECT_NAME,
  description: 'Create Account',
  url: 'https://app.web3inbox.com',
  icons: ['https://app.web3inbox.com/connect-icon.png']
}
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({
  wagmiConfig,
  enableAnalytics: import.meta.env.PROD,
  chains,
  projectId,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-z-index': 9999
  }

})

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <SettingsContextProvider>
        <BrowserRouter>
          <W3iContextProvider>
            <ConfiguredRoutes />
            <Modals />
          </W3iContextProvider>
        </BrowserRouter>
      </SettingsContextProvider>
    </WagmiConfig>
  </React.StrictMode>
)
