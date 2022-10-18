import { HydratedDocument, Types } from "mongoose";
import CollectionDOModel, { CollectionDO } from "./model";

class CollectionDOCollection {
    // creates a new collection and saves to db
    static async addOne(userId: Types.ObjectId | string, name: string) : Promise<HydratedDocument<CollectionDO>> {
        const collection = new CollectionDOModel({
            userId: userId, 
            name, 
            freets: []
        })
        await collection.save();
        return collection.populate('name')
    }

    // delete collection with the given name
    static async deleteOne(name: string) : Promise<boolean> {
        const collection = await CollectionDOModel.deleteOne({name: name});
        return collection !== null;
    }

    // update the collection name to new name 
    static async updateOne(name: string, newName: string) : Promise<boolean> {
        const collection = await CollectionDOModel.findOne({name: name});
        collection.name = newName;
        await collection.save();
        return collection.populate('name');
    }

    // get all Freets
    static async findAll(): Promise<Array<HydratedDocument<CollectionDO>>> {
        return CollectionDOModel.find({}).populate('name');
    }

    // get all Freets
    static async findByName(name: string): Promise<Array<HydratedDocument<CollectionDO>>> {
        return CollectionDOModel.find({name: name}).populate('name');
    }
}

export default CollectionDOCollection;