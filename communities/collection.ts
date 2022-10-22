import { HydratedDocument, Types } from "mongoose";
import UserModel from "../user/model";
import CommunityModel, { Community }  from "./model";

class CommunityCollection{
    // creates a community and saves it to DB 
    static async addOne(userId: Types.ObjectId | string, name: string) : Promise<HydratedDocument<Community>> {
        const community = new CommunityModel({
            owners: [userId], 
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
        community.users.push(userId.toString()); 

        const user = await UserModel.findOne({_id: userId}); 
        user.communities.push(communityId.toString()); 
        await community.save();
        await user.save(); 
        return community !== null && user !== null;
    }
}

export default CommunityCollection