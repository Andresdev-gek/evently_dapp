import React from 'react'
import { SearchParamProps } from '../../../../types/index';
import { getEventById } from '@/lib/actions/event.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
const EventDetails = async ({ params: { id }}: SearchParamProps) => {
    
    const eventDetails = await getEventById(id);
    console.log(eventDetails)
    
    
    return (
        <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
            <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
               <Image 
                src={eventDetails.imageUrl}
                alt='Event image'
                width={1000}
                height={1000}
                className='h-full min-h-[300px] object-cover object-center'
               />

               <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
                <div className='flex flex-col gap-6'>
                    <h2 className='h2-bold'>{eventDetails.title}</h2>

                    <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                        <div className='flex gap-3'>
                            {eventDetails.isFree && <p className='p-bold-20 rounded-full bg-purple-500/10 px-5 py-2 text-purple-700'>'FREE'</p>}
                            {!eventDetails.isFree && <p className='flex items-center p-bold-20 rounded-full bg-purple-500/10 px-5 py-2 text-purple-700'> <Image
                      src="/assets/icons/stx-logo.svg"
                      alt="stx"
                      width={16}
                      height={16}
                      className='mr-1'
                    />{eventDetails.price}</p>}
                            <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500'>
                                {eventDetails.category.name}
                            </p>
                        </div>

                        <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                            by{' '}
                            <span className='text-primary-500'>{eventDetails.organizer.firstName} {eventDetails.organizer.lastName}</span>
                        </p>
                    </div>
                </div>
                {/* checkout button */}

                <div className='flex flex-col gap-5'>
                    <div className='flex gap-2 md:gap-3'>
                        <Image 
                        src="/assets/icons/calendar.svg"
                        alt='calendar'
                        width={32}
                        height={32}
                        />
                        <div className='p-medium-16 lg:p-regular-20 flex flex-wrap items-center'>
                            <p>
                            {formatDateTime(eventDetails.startDateTime).dateOnly} - {' '}
                            {formatDateTime(eventDetails.startDateTime).timeOnly}  {' '}
                            </p>
        
                            <p>
                            {formatDateTime(eventDetails.endDateTime).dateOnly} - {' '}
                            {formatDateTime(eventDetails.endDateTime).timeOnly}  {' '}
                            </p>
                        </div>
                    </div>

                    <div className='p-regular-20 flex items-center gap-3'>
                        <Image 
                        src="/assets/icons/location.svg"
                        alt="location"
                        width={32}
                        height={32}
                        />
                        <p className='p-medium-16 lg:p-regular-20'>{eventDetails.location}</p>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='p-bold-20 text-grey-600'>
                        What You'll Learn:
                    </p>
                    <p className="p-medium-16 lg:p-regular-18">
                        {eventDetails.description}
                    </p>
                    <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                        {eventDetails.url}
                    </p>
                </div>
                </div> 
            </div>
        </section>
  )
}

export default EventDetails