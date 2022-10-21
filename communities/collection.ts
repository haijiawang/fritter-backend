import { HydratedDocument, Types } from "mongoose";
import CommunityModel, { Community }  from "./model";

class CommunityCollection{
    // creates a community and saves it to DB 
    static async addOne(userId: Types.ObjectId | string, name: string) : Promise<HydratedDocument<Community>> {
        const community = new CommunityModel({
            owners: [userId], 
            name: name,
        })
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
}

export default CommunityCollection