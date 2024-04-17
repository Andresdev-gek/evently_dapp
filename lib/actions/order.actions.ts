"use server"


import { connectToDatabase } from "@/lib/database";
import Order from "../database/models/order.model";
import { CreateOrderParams } from "@/types";
import { handleError } from "../utils";


export const createOrder = async (order: CreateOrderParams) => {
    try {
        await connectToDatabase();

        const newOrder = await Order.create({
            ...order
        });

        return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
        handleError(error);
    }
}