import Link from 'next/link'
import React from 'react'
import Image from "next/image";

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href='/'>
          <Image src="/assets/logo.svg" alt='logo' width={22} height={22}></Image>
        </Link>

        <p>2024 Evently. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer