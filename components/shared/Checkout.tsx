import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import { Button } from '../ui/button'
import { CreateOrderParams } from '@/types'


type CheckoutProps = { event: IEvent, userId: string, buyerPrincipal: string, onCheckout: (createOrder: CreateOrderParams) => Promise<void> };
const Checkout = ({ event, userId, buyerPrincipal, onCheckout }: CheckoutProps) => {
    const order: CreateOrderParams = {
        buyerPrincipal,
        eventId: event._id,
        eventUUID: event.eventUUID,
        event,
        buyerId: userId,
        totalAmount: event.price as string,
        createdAt: new Date(),
        contractTxId: '',
        payTxId: '',
    }

    
  return (
    <form onSubmit={() => onCheckout(order)}>
        <Button type="submit" role='link' size="lg" className='button sm:w-fit'>
            {event.isFree? 'Get Ticket' : 'Buy Ticket'}
        </Button>
    </form>
  )
}

export default Checkout