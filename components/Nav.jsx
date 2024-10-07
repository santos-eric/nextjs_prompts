"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true

  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  // create setProviders var which waits for the response var, which awaits getProviders function provided by next-auth, then setProviders state based on the response within the useEffect and then actually set the state for providers

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* mobile navigation */}
      <div className="sm:hidden flex relative">
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
                // not recommended to change state calling the previous state, create a second callback function within onClick instead
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
            </Link>
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href='profile'
                  className="dropdown_link"
                  conCLick={() => setToggleDropdown(false)}
                >
                My Profile
                </Link>
                <Link
                  href='create-prompt'
                  className="dropdown_link"
                  onCLick={() => setToggleDropdown(false)}
                >
                Create Prompt
                </Link>
                <button
                  type='button'
                  onCLick={() => {
                    setToggleDropdown(false);
                    signOut()
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
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