'use client'
import { logoutAccount } from '@/lib/actions/user.actions'
import { formatName } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function Footer({user, type='desktop'}:FooterProps) {
   const router = useRouter()
    const handleLogout = async () => {
        const response = await logoutAccount()
         console.log(response)
        if(response) router.push('/sign-in')
    }
  return (
    <footer className='footer'>
      <div className={
        type === 'mobile' ? 'footer_name-mobile' : 'footer_name'
      }>
       <p className='text-xl font-bold text-blue-700'> 
         {user?.name && formatName(user.name)[0]} 
       </p>
      </div>
      <div className={
        type === 'mobile' ? 'footer_email-mobile' : 'footer_email'
      }>
        <h1 className='text-14 truncate  text-gray-700 font-semibold'> 
          {user?.name && formatName(user.name)} 
        </h1>
        <p className='text-14 truncate font-normal text-gray-600'> {user?.email} </p>
      </div>
      <div className='footer_image'>
        <Image 
          src='/icons/logout.svg'
          width={30} 
          height={30}
          className='object-contain' 
          alt='logo'
          onClick={handleLogout}
        /> 
      </div>
    </footer>
  )
}

export default Footer
