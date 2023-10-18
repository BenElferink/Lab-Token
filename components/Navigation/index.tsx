import Script from 'next/script'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import SingleLink from './SingleLink'
import { RIICOO_STAKE_KEY } from '@/constants'

const Navigation = () => {
  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const giveawaysSdkRef = useRef(null)
  const pollsSdkRef = useRef(null)

  return (
    <nav className='flex items-center'>
      <Script
        src='https://labs.badfoxmc.com/sdk.min.js'
        onReady={() => {
          // @ts-ignore
          const giveawaysSdk = new BadLabsSDK({ product: 'giveaways', creatorStakeKey: RIICOO_STAKE_KEY })
          giveawaysSdkRef.current = giveawaysSdk

          // @ts-ignore
          const pollsSdk = new BadLabsSDK({ product: 'polls', creatorStakeKey: RIICOO_STAKE_KEY })
          pollsSdkRef.current = pollsSdk
        }}
      />

      <button
        type='button'
        onClick={() => setIsNavOpen((prev) => !prev)}
        className='lg:hidden flex items-center p-1 mx-1 rounded-lg text-sm hover:bg-zinc-700 focus:outline-none focus:ring-zinc-600 focus:ring-2'
      >
        <Bars3Icon className='w-7 h-7' />
      </button>

      <div className={(isNavOpen ? 'block' : 'hidden') + ' lg:block'}>
        <ul className='flex flex-col lg:flex-row absolute right-0 lg:static overflow-auto lg:overflow-visible max-h-[80vh] lg:max-h-auto w-60 lg:w-auto mt-8 lg:mt-0 p-4 lg:px-8 lg:space-x-10 bg-zinc-900 lg:bg-transparent rounded-lg border border-green-400'>
          <li
            onClick={() => {
              if (router.pathname === '/') window.scrollTo({ top: 0 })
              setIsNavOpen(false)
            }}
          >
            <SingleLink label='Home' path='/' />
          </li>

          <li className='relative'>
            <SingleLink
              label='Governance'
              onClick={() => {
                const injectEl = document.getElementById('inject-wallets-polls')

                if (injectEl?.children.length) {
                  injectEl.innerText = ''
                } else if (pollsSdkRef.current) {
                  // @ts-ignore
                  pollsSdkRef.current.loadWallets({ injectId: 'inject-wallets-polls' })
                }
              }}
            />

            <div id='inject-wallets-polls' className='lg:absolute lg:-right-1/2 flex flex-col'>
              {/* Wallets will be injected here */}
            </div>
          </li>

          <li className='relative'>
            <SingleLink
              label='Giveaways'
              onClick={() => {
                const injectEl = document.getElementById('inject-wallets-giveaways')

                if (injectEl?.children.length) {
                  injectEl.innerText = ''
                } else if (giveawaysSdkRef.current) {
                  // @ts-ignore
                  giveawaysSdkRef.current.loadWallets({ injectId: 'inject-wallets-giveaways' })
                }
              }}
            />

            <div id='inject-wallets-giveaways' className='lg:absolute lg:-right-1/2 flex flex-col'>
              {/* Wallets will be injected here */}
            </div>
          </li>

          <li onClick={() => setIsNavOpen(false)}>
            <SingleLink label='Staking' url='https://labtoken.staking.zip/' />
          </li>

          {/* <li
            onClick={() => {
              if (router.pathname === '/takeovers') window.scrollTo({ top: 0 })
              setIsNavOpen(false)
            }}
          >
            <SingleLink label='Takeovers' path='/takeovers' />
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
