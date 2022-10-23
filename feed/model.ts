import { Types } from "mongoose";
import { Schema, model } from "mongoose";


/**
 * note: that either user or community will be filled
 * if user is empty, the Feed is for the forum posts of a community
 * if community is empty, the Feed is for an individual user 
 * 
 * the feed is an Array storing the ID's of Freets belonging to the feed 
 * 
 * the following boolean indicates if the feed includes the user's following
 */
export type Feed = {
    _id: Types.ObjectId, 
    user: string, 
    community: string, 
    freets: Array<string>, 
    following: boolean
}

const FeedSchema = new Schema<Feed>({
    user: {
        type: Schema.Types.String
    }, 
    community: {
        types: Schema.Types.String
    },
    freets: {
        type: [String]
    }, 
    following: {
        type: Schema.Types.Boolean
    }
})

const FeedModel = model<Feed>('Feed', FeedSchema); 
export default FeedModel;
