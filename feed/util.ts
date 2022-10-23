import type { HydratedDocument, Types } from "mongoose";
import { Feed } from "./model";

type FeedResponse = {
    _id: Types.ObjectId,
    user: string,
    community: string,
    freets: Array<string>,
    following: boolean
}

const constructFeedResponse = (feed: HydratedDocument<Feed>): FeedResponse => {
    return {
        _id: feed._id,
        user: feed.user,
        community: feed.community,
        freets: feed.freets,
        following: feed.following
    }
}

export { constructFeedResponse };