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
}

export default CommunityCollection