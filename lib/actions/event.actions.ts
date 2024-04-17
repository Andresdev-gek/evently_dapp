"use server";

import {
    CreateEventParams,
    UpdateEventParams,
    DeleteEventParams,
    GetAllEventsParams,
    GetEventsByUserParams,
    GetRelatedEventsByCategoryParams,
} from "@/types";
import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import User from "../database/models/user.model";
import Event, { IEvent } from "../database/models/event.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";
import { contractAddEvent, ContractAddEvent } from "../smart-contract-service";

export const getCategoryByName = async (name: string) => {
    return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = async (query: any) => {
    return query
        .populate({
            path: "organizer",
            model: User,
            select: "_id firsftName lastName",
        })
        .populate({ path: "category", model: Category, select: "_id name" });
};

// CREATE
export const createEvent = async ({
    userId,
    event,
    path,
}: CreateEventParams) => {
    try {
        await connectToDatabase();

        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId,
        });
        revalidatePath(path);

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        console.log(error)
        handleError(error)
    }
};

// UPDATE
export const updateEvent = async ({
    userId,
    event,
    path,
}: UpdateEventParams) => {
    try {
        await connectToDatabase();

        const eventToUpdate = await Event.findById(event._id);

        if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
            throw new Error("Unauthorized or event not found");
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            event._id,
            { ...event, category: event.categoryId },
            { new: true }
        );
        revalidatePath(path);

        return JSON.parse(JSON.stringify(updatedEvent));
    } catch (error) {
        handleError(error);
    }
};

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findById(eventId));

        if (!event) {
            throw new Error("Event not found");
        }

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error);
    }
};

export const findEventByUuid = async (uuid: string) => {
    try {
        const event = await Event.findOne({ eventUUID: uuid });
        if (event) {
            return event;
        } else {
            return null; // Or throw an error if event not found is a critical issue
        }
    } catch (error) {
        console.error("Error finding event by UUID:", error);
        handleError(error);
    }
};

export const findEventsByUuids = async (uuids: string[]) => {
    try {
        const events = await Event.find({ eventUUID: { $in: uuids } });
        return events;
    } catch (error) {
        console.error("Error finding events by UUIDs:", error);
        handleError(error);
    }
};

export const findEventsByOwnerPrincipal = async (ownerPrincipal: string) => {
    try {
        const eventsQuery = Event.find({ ownerPrincipal });
        const events = await populateEvent(eventsQuery);
        return JSON.parse(JSON.stringify(events));
    } catch (error) {
        console.error("Error finding events by ownerPrincipal:", error);
        handleError(error);
    }
};

export const deleteEvent = async ({
    eventId,
    path,
    eventUUID,
}: any) => {
    try {
        await connectToDatabase();
        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (deletedEvent) revalidatePath(path);
    } catch (error) {
        handleError(error);
    }
};

// GET ALL EVENTS
export const getAllEvents = async ({
    query,
    limit = 6,
    page,
    category,
}: GetAllEventsParams) => {
    try {
        await connectToDatabase();

        const titleCondition = query
            ? { title: { $regex: query, $options: "i" } }
            : {};
        const categoryCondition = category
            ? await getCategoryByName(category)
            : null;
        const conditions = {
            $and: [
                titleCondition,
                categoryCondition ? { category: categoryCondition._id } : {},
            ],
        };

        const skipAmount = (Number(page) - 1) * limit;
        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(limit);

        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
    }
};

// GET EVENTS BY ORGANIZER
export const getEventsByUser = async ({
    userId,
    limit = 6,
    page,
}: GetEventsByUserParams) => {
    try {
        await connectToDatabase();

        const conditions = { organizer: userId };
        const skipAmount = (page - 1) * limit;

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(limit);

        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
    }
};

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export const getRelatedEventsByCategory = async ({
    categoryId,
    eventId,
    limit = 3,
    page = 1,
}: GetRelatedEventsByCategoryParams) => {
    try {
        await connectToDatabase();

        const skipAmount = (Number(page) - 1) * limit;
        const conditions = {
            $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
        };

        const eventsQuery = Event.find(conditions)
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(limit);

        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    } catch (error) {
        handleError(error);
    }
};
