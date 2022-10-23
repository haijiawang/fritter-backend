import { HydratedDocument, Types } from "mongoose";
import UserModel from "../user/model";
import CommunityModel, { Community }  from "./model";

class CommunityCollection{
    // creates a community and saves it to DB 
    static async addOne(userId: Types.ObjectId | string, name: string) : Promise<HydratedDocument<Community>> {
        const community = new CommunityModel({
            owners: [userId], 
            users: [userId],
            name: name,
            public: false,
        })

        const user = await UserModel.findOne({_id: userId}); 
        user.communities.push(community._id.toString()); 

        await user.save();
        await community.save();
        return community.populate('name')
    }

    // delete community with the given ID
    static async deleteOne(id: Types.ObjectId | string) : Promise<boolean> {
        const community = await CommunityModel.deleteOne({_id: id});
        return community !== null;
    }

    // update the community name to new name 
    static async updateOne(communityId: Types.ObjectId | string, newName: string) : Promise<HydratedDocument<Community>>{
        const community = await CommunityModel.findOne({_id: communityId});
        community.name = newName;
        await community.save();
        return community.populate('name');
    }

    // make the community public
    static async makePublic(communityId: Types.ObjectId | string) : Promise<HydratedDocument<Community>>{
        const community = await CommunityModel.findOne({_id: communityId});
        community.public = true;
        await community.save();
        return community.populate('name');
    }

    // make the community private
    static async makePrivate(communityId: Types.ObjectId | string) : Promise<HydratedDocument<Community>>{
        const community = await CommunityModel.findOne({_id: communityId});
        community.public = false;
        await community.save();
        return community.populate('name');
    }

    // add another user a member of specified community  
    static async addMember(communityId: Types.ObjectId | string, userId: Types.ObjectId | string) : Promise<boolean>{
        const community = await CommunityModel.findOne({_id: communityId});
        if (community.public == false){
            return false;
        }
        // join community 
        if (community.users.includes(userId.toString())){
            return false;
        }
        community.users.push(userId.toString()); 

        const user = await UserModel.findOne({_id: userId}); 
        user.communities.push(communityId.toString()); 
        await community.save();
        await user.save(); 
        return community !== null && user !== null;
    }

    // remove a user from the part of the community 
    static async deleteMember(communityId: Types.ObjectId | string, userId: Types.ObjectId | string) : Promise<HydratedDocument<Community>>{
        const community = await CommunityModel.findOne({_id: communityId});

        // join community 
        let communityUsers = community.users; 
        communityUsers = communityUsers.filter(user => user !== userId); 
        community.users = communityUsers; 

        // remove community from users too 
        const user = await UserModel.findOne({_id: userId}); 
        let userCommunities = user.communities; 
        userCommunities = userCommunities.filter(community => community !== communityId); 
        user.communities = userCommunities; 
        
        await community.save();
        await user.save(); 
        return community;
    }

    // add another user a owner of specified community  
    static async addOwner(communityId: Types.ObjectId | string, userId: Types.ObjectId | string) : Promise<boolean>{
        const community = await CommunityModel.findOne({_id: communityId});
        if (community.public == false){
            return false;
        }
        // join community 
        if (community.owners.includes(userId.toString())){
            return false;
        }
        community.owners.push(userId.toString()); 
        await community.save();

        const user = await UserModel.findOne({_id: userId}); 
        if (user.communities.includes(communityId.toString())){
            return community !== null && user !== null;;
        }
        user.communities.push(communityId.toString()); 
        await user.save(); 
        return community !== null && user !== null;
    }
}

export default CommunityCollection