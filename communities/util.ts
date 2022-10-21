import type { HydratedDocument, Types } from "mongoose";
import { Community } from "./model";

type CommunityResponse = {
    _id: Types.ObjectId;
    name: string; 
    owners: Array<string>
    users: Array<string>;
    freets: Array<string>;
    public: boolean
}

const constructCommunityResponse = (community: HydratedDocument<Community>): CommunityResponse => {
    return{
        _id: community._id, 
        name: community.name, 
        owners: community.owners,
        users: community.users, 
        freets: community.freets,
        public: community.public
    };
}

export{
    constructCommunityResponse
};