import { Types } from "mongoose";
import { Schema, model } from "mongoose";

/**
 * note: users is a list of user ID's 
 */
export type Community = {
    _id: Types.ObjectId, 
    name: string, 
    users: Array<string>
}

const CommunitySchema = new Schema<Community>({
    name: {
        type: Schema.Types.String
    }, 
    users: {
        type: [String]
    }
})

const CommunityModel = model<Community>('Community', CommunitySchema); 
export default CommunityModel;