import React, { useContext, useEffect } from 'react'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useLocation, useNavigate } from 'react-router-dom'

import Button from '@/components/general/Button'
import IntroWallet from '@/components/general/Icon/IntroWallet'
import IntroContent from '@/components/general/IntroContent'
import TransitionDiv from '@/components/general/TransitionDiv'
import Sidebar from '@/components/layout/Sidebar'
import W3iContext from '@/contexts/W3iContext/context'

import './Login.scss'

const Login: React.FC = () => {
  const { userPubkey, uiEnabled, notifyRegisteredKey } = useContext(W3iContext)
  const { search } = useLocation()
  const next = new URLSearchParams(search).get('next')
  const nav = useNavigate()

  const modal = useWeb3Modal()
  const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME
  useEffect(() => {
    const path = next ? decodeURIComponent(next) : '/'

    if (userPubkey) {
      const notifyConditionsPass = Boolean(
        (!uiEnabled.chat || uiEnabled.notify) && notifyRegisteredKey
      )

      if (notifyConditionsPass) {
        nav(path)
      }
    }
  }, [userPubkey, next, notifyRegisteredKey, uiEnabled])

  return (
    <TransitionDiv className="Login">
      <Sidebar isLoggedIn={false} />
      <main className="Main">
        <IntroContent
          title={`Welcome to ${PROJECT_NAME}`}
          subtitle={`Connect your wallet to start using ${PROJECT_NAME} today. `}
          scale={3}
          button={
            <Button
              className="Main__connect-button"
              onClick={() => {
                modal.open()
              }}
              size="small"
            >
              Create Account
            </Button>
          }
          icon={<IntroWallet />}
        />
      </main>
    </TransitionDiv>
  )
}

export default Login
