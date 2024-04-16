"use client"
import React, { useState, useEffect } from 'react'
import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime, getDecryptedValue } from '@/lib/utils'
import DeleteConfirmation from "../shared/DeleteConfirmation"
import Image from 'next/image'
import Link from 'next/link'



type CardProps = {
    event: IEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
    const [actualPrincipal, setActualPrincipal] = useState<null | string>(null)

    useEffect(() => {
        const principal = getDecryptedValue("principalAddress");
        if(principal) setActualPrincipal(principal as string)
    }, [])
    
    const eventOwnerPrincipal: string = event.ownerPrincipal;

    const isEventOwner: boolean = eventOwnerPrincipal === actualPrincipal;

    
    return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px]
    flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
        <Link 
            href={`/events/${event._id}`}
            style={{backgroundImage: `url(${event.imageUrl})`}} 
            className='flex-center flex-grow bg-gray-500 bg-cover bg-center text-grey-500'   
        />
        {/* IS EVENT CREATOR ...*/}

        { isEventOwner && !hidePrice && (
            <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
                <Link
                href={`/events/${event._id}/update`}
                >
                    <Image 
                    src="/assets/icons/edit.svg"
                    alt='edit'
                    width={20}
                    height={20}
                    />
                </Link>

                <DeleteConfirmation eventId={event._id} eventUUID={event.eventUUID} />
            </div>
        )}
        <div 
            className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'
        > 
         {!hidePrice && event.isFree && 
         <div className='flex gap-2 '>
            <span className='p-semibold-14 w-min rounded-full bg-purple-100 px-4 py-1 text-purple-700 '>
              FREE 
            </span>
            <p className='p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1'>
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

            <Link 
            href={`/events/${event._id}`}>
            <p className='p-medium-16 md:p-medium-20 line-clamp-2
         flex-1 text-black'>
            {event.title}
         </p>
            </Link>
         

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
        </div>
    </div>
  )
}

export default Card