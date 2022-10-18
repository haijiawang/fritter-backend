import type { HydratedDocument, Types } from "mongoose";
import type { CollectionDO } from "./model";

type CollectionDOResponse = {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
    freets: [Types.ObjectId];
}

const constructCollectionDOResponse = (collectionDO: HydratedDocument<CollectionDO>): CollectionDOResponse => {
    return {
        _id: collectionDO._id,
        userId: collectionDO.userId,
        name: collectionDO.name,
        freets: collectionDO.freets
    };
}

export {
    constructCollectionDOResponse
};