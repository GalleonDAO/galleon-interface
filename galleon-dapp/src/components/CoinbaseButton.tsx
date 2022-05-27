import { useEffect, useRef, useState } from 'react'
import { initOnRamp } from '@coinbase/cbpay-js'
import { useEthers } from '@usedapp/core'
import coinbase from 'assets/coinbase-logo.png'
const CoinbaseButton = () => {
  const [isReady, setIsReady] = useState(false)
  const [cb, setCb] = useState(null)
  const { account } = useEthers()
  useEffect(() => {
    setCb(
      initOnRamp({
        widgetParameters: {
          destinationWallets: [
            {
              address: account,
            },
          ],
        },
        // host: 'https://app.galleon.community',
        appId: process.env.REACT_APP_COINBASE_APP_ID,
        onReady: () => {
          setIsReady(true)
        },
        onSuccess: () => {
          console.log('success')
        },
        onExit: () => {
          console.log('exit')
        },
        onEvent: (event) => {
          console.log('ON RAMP EVENT: ', event)
        },
        experienceLoggedIn: 'popup',
        experienceLoggedOut: 'popup',
        closeOnExit: true,
        closeOnSuccess: true,
      }),
    )

    return () => {
      // @ts-ignore
      if (cb) {
        console.log('Destroy CB On Ramp: ', cb)
        cb.destroy()
      }
    }
  }, [account])

  const handleClick = () => {
    // @ts-ignore
    console.log('Open CB On Ramp: ', cb)
    cb.open()
  }

  return (
    isReady && (
      <button className="px-4 -ml-4 py-1.5" onClick={handleClick}>
        <img
          src={coinbase}
          className=" inline-flex -translate-y-0.5 mr-1.5 h-6 w-6 text-theme-white"
        ></img>
        Buy ETH
      </button>
    )
  )
}

export default CoinbaseButton
