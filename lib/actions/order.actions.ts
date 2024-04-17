"use server"

import { CheckoutOrderParams } from '../../types/index';
import { connectToDatabase } from "@/lib/database";


export const checkoutOrder = async (order: CheckoutOrderParams) => {
    try {
        await connectToDatabase();

    } catch (error) {

    }
}