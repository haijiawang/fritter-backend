import { Types } from "mongoose";
import { Schema, model } from "mongoose";

/**
 * note: users is a list of user ID's 
 *      1 user can belong to several communities BUT each freet can only belong to one community
 * also freets is a list of the ID of freets that belong within the community 
 */
export type Community = {
    _id: Types.ObjectId, 
    name: string, 
    users: Array<string>, 
    owners: Array<string>,
    freets: Array<string>,
    public: boolean
}

const CommunitySchema = new Schema<Community>({
    name: {
        type: Schema.Types.String
    }, 
    owners: {
        type: [String]
    },
    users: {
        type: [String]
    },
    freets: {
        type: [String]
    }, 
    public: {
        type: Schema.Types.Boolean
    }
})

const CommunityModel = model<Community>('Community', CommunitySchema); 
export default CommunityModel;