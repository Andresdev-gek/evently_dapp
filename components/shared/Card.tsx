import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


type CardProps = {
    event: IEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  
    console.log(event.organizer)
    return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px]
    flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
        <Link 
            href={`/events/${event._id}`}
            style={{backgroundImage: `url(${event.imageUrl})`}} 
            className='flex-center flex-grow bg-gray-500 bg-cover bg-center text-grey-500'   
        />
        {/* IS EVENT CREATOR ...*/}
        <Link 
            href={`/events/${event._id}`}
            className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'
        > 
         {!hidePrice && event.isFree && 
         <div className='flex gap-2 '>
            <span className='p-semibold-14 w-min rounded-full bg-purple-100 px-4 py-1 text-purple-700 '>
              'FREE' 
            </span>
            <p className='p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500'>
                {event.category.name}
            </p>
         </div>}

         {!hidePrice && !event.isFree && 
         <div className='flex gap-2 '>
            <span className='flex items-center p-semibold-14 w-min rounded-full bg-purple-100 pl-4 pr-8 py-1 text-purple-700 '>
            <Image
                      src="/assets/icons/stx-logo.svg"
                      alt="stx"
                      width={12}
                      height={12}
                      className='mr-1'
                    />{event.price}
            </span>
            <p className='p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500'>
                {event.category.name}
            </p>
         </div>}

         <p className='p-medium-16 p-medium-18 text-grey-500'>
            {event.startDateTime ? formatDateTime(event.startDateTime).dateTime : ''}
         </p>

         <p className='p-medium-16 md:p-medium-20 line-clamp-2
         flex-1 text-black'>
            {event.title}
         </p>

         <div className='flex-between w-full'>
            <p className='p-medium-14 md:p-medium-16 text-grey-600'>
               {event.organizer.firstName} {event.organizer.lastName}
            </p>

            {hasOrderLink && (
                <Link
                    href={`/orders?eventId=${event._id}`} 
                    className='flex gap-2'
                >
                    <p className='text-primary-500'>Order Details</p>
                    <Image 
                        src="/assets/icons/arrow.svg" 
                        alt='search'
                        width={10}
                        height={10}
                    />
                </Link>
            )}
         </div>
        </Link>
    </div>
  )
}

export default Card