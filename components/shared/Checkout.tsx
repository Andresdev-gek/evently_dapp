import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import { Button } from '../ui/button'

const Checkout = ({ event, userId, buyerPrincipal }: { event: IEvent, userId: string, buyerPrincipal: string }) => {

    const onCheckout = async () => {
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId,
            buyerPrincipal: buyerPrincipal
        }
    }
  return (
    <form action={onCheckout}>
        <Button type="submit" role='link' size="lg" className='button sm:w-fit'>
            {event.isFree? 'Get Ticket' : 'Buy Ticket'}
        </Button>
    </form>
  )
}

export default Checkout