import { isValidObjectId } from 'mongoose';
import { db } from '.';

import { Entry, IEntry } from '../models';

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value: any) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};


export const getEntriesById = async (id: string): Promise<IEntry | null> => {

    if (!isValidObjectId(id)) return null;

    await db.connect();

    const entry = Entry.findById(id).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(entry, getCircularReplacer()));
}