'use client'

import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn, signOut, useSession, getProviders} from'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true

  const [providers, setProviders] = useState(null)

  // create setProviders var which waits for the response var, which awaits getProviders function provided by next-auth, then setProviders state based on the response within the useEffect and then actually set the state for providers

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setProviders()
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image
          src='/assets/images/logo.svg'
          width={30}
          height={30}
          className='object-contain'
          alt='prompt logo'
        />
        <p className="logo_text">nextjsPrompts</p>
      </Link>

      {/* mobile navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='create-prompt'
              className="black_btn">
              Create Post
            </Link>

            <button type='button' onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>) : (
          <>

              {/* will list login providers such as Google */}
              {providers &&
            object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >

              </button>
            ))
          }
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav