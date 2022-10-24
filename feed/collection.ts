import { HydratedDocument, Types } from "mongoose";
import UserModel, { User } from "../user/model";
import FeedModel, { Feed } from "./model";
import FreetModel, { Freet } from "../freet/model";

class FeedCollection {
    static async getFollowingFeed(userId: Types.ObjectId | string): Promise<Array<string>> {
        const user = await UserModel.findOne({ _id: userId });
        let userFollowing = user.following;
        let allPosts = [];
        for (const followingId of userFollowing) {
            const freets = await FreetModel.find({ authorId: followingId });
            if (freets !== null) {
                for (const freet of freets) {
                    allPosts.push(freet.id.toString());
                }
            }
        }

        return allPosts;
    }

    static async getRecommendedFeed(userId: Types.ObjectId | string): Promise<Array<string>> {
        const user = await UserModel.findOne({ _id: userId });
        const numFollowing = user.following.length;
        let allPosts = [];

        for (const followingId of user.following) {
            const freets = await FreetModel.find({ authorId: { $ne: followingId } });
            if (freets !== null) {
                for (const freet of freets) {
                    allPosts.push(freet.id.toString());
                    if (allPosts.length > numFollowing) {
                        return allPosts
                    }
                }
            }
        }
        return allPosts;
    }

    static async getCommunityFeed(communityId: Types.ObjectId | string): Promise<Array<HydratedDocument<Freet>>> {
        const freets = await FreetModel.find({ communityId: communityId });
        return freets;
    }

    static async getFollowers(userId: Types.ObjectId | string): Promise<Array<string>> {
        const user = await UserModel.findOne({ _id: userId });
        let userFollowing = user.following;

        return userFollowing;
    }

    static async followUser(userId: Types.ObjectId | string, followerId: Types.ObjectId | string): Promise<HydratedDocument<User>> {
        const user = await UserModel.findOne({ _id: userId });
        if (user.following == undefined) {
            user.following = [followerId.toString()];
        }
        if (user.following.includes(userId.toString())) {
            return;
        }
        user.following.push(followerId.toString());
        await user.save()
        return user;
    }

    static async unfollowUser(userId: Types.ObjectId | string, followerId: Types.ObjectId | string): Promise<HydratedDocument<User>> {
        const user = await UserModel.findOne({ _id: userId });
        let userFollowing = user.following
        userFollowing = userFollowing.filter(user => user !== followerId);
        user.following = userFollowing;
        await user.save()
        return user;
    }
}

export default FeedCollection