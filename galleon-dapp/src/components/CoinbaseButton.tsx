import { useEffect, useRef, useState } from 'react'
import { initOnRamp } from '@coinbase/cbpay-js'
import { useEthers } from '@usedapp/core'
import coinbase from 'assets/coinbase-logo.png'
const CoinbaseButton = () => {
  const [isReady, setIsReady] = useState(false)
  const onrampInstance = useRef(null)
  const { account } = useEthers()
  useEffect(() => {
    initOnRamp({
      widgetParameters: {
        destinationWallets: [
          {
            address: account,
          },
        ],
      },
      host: 'https://*.galleon.community',
      appId: 'Galleon',
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
        console.log(event)
      },
      experienceLoggedIn: 'popup',
      experienceLoggedOut: 'popup',
      closeOnExit: true,
      closeOnSuccess: true,
    })

    return () => {
      onrampInstance.current?.destroy()
    }
  }, [])

  const handleClick = () => {
    onrampInstance.current?.open()
  }

  return (
    <button
      className="px-4 -ml-4 py-1.5"
      onClick={handleClick}
    >
      <img
        src={coinbase}
        className=" inline-flex -translate-y-0.5 mr-1.5 h-6 w-6 text-theme-white"
      ></img>
      Buy ETH
    </button>
  )
}

export default CoinbaseButton
