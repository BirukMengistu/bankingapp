import { formatAmount } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BankCard = ({
    account, userName,showBalance=true
}:CreditCardProps) => {
  return (
    <div className='felx flex-col'>
        <Link href='/'
         className='bank-card'>
            <div className='bank-card_content'>
               <div>
                <h1 className='text-16 font-semibold text-white'>
                    {account.name || userName}
                </h1>
                <p className='font-ibm-plex-serif font-black text-white'>
                    {formatAmount(account.currentBalance)}
                </p>
               </div>
               <article className='flex flex-col gap-2'>
                  <div className='flex justify-between'>
                    <h1 className='text-12 font-semibold text-white'>
                      {userName}
                    </h1>
                     
                    <h2 className='text-12 font-semibold text-white pl-3'>
                      **/**
                    </h2>
                  </div>
                  <p className='font-ibm-plex-serif font-black text-white'>
                    **** **** **** 
                    <span className='text-16'>$
                        {account.mask}
                    </span>
                </p>
               </article>
            </div>
            <div className='bank-card_icon'>
                 <Image 
                 src='/icons/Paypass.svg'
                 alt='bank-icons'
                 width={20}
                 height={24}/>
                 <Image 
                 src='/icons/mastercard.svg'
                 alt='mastercard-icons'
                 width={45}
                 height={45}/>
                  <Image 
                 src='/icons/lines.png'
                 alt='line-icons'
                 width={316}
                 height={190}
                 className='absoute top-o left-0'/>
            </div>
        </Link>
        
    </div>
  )
}

export default BankCard