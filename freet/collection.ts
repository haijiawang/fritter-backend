import type {HydratedDocument, Types} from 'mongoose';
import type {Freet} from './model';
import FreetModel from './model';
import UserCollection from '../user/collection';
import CommunityModel from '../communities/model';

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 */
class FreetCollection {
  /**
   * Add a freet to the collection
   *
   * @param {string} authorId - The id of the author of the freet
   * @param {string} content - The id of the content of the freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly created freet
   */
  static async addOne(authorId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Freet>> {
    const date = new Date();
    const freet = new FreetModel({
      authorId,
      dateCreated: date,
      content,
      dateModified: date,
      collectionId: ''
    });
    await freet.save(); // Saves freet to MongoDB
    return freet.populate('authorId');
  }

  /**
   * Find a freet by freetId
   *
   * @param {string} freetId - The id of the freet to find
   * @return {Promise<HydratedDocument<Freet>> | Promise<null> } - The freet with the given freetId, if any
   */
  static async findOne(freetId: Types.ObjectId | string): Promise<HydratedDocument<Freet>> {
    return FreetModel.findOne({_id: freetId}).populate('authorId');
  }

  /**
   * Get all the freets in the database
   *
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAll(): Promise<Array<HydratedDocument<Freet>>> {
    // Retrieves freets and sorts them from most to least recent
    return FreetModel.find({}).sort({dateModified: -1}).populate('authorId');
  }

  /**
   * Get all the freets in by given author
   *
   * @param {string} username - The username of author of the freets
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the freets
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Freet>>> {
    const author = await UserCollection.findOneByUsername(username);
    return FreetModel.find({authorId: author._id}).populate('authorId');
  }

  /**
   * Update a freet with the new content
   *
   * @param {string} freetId - The id of the freet to be updated
   * @param {string} content - The new content of the freet
   * @return {Promise<HydratedDocument<Freet>>} - The newly updated freet
   */
  static async updateOne(freetId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Freet>> {
    const freet = await FreetModel.findOne({_id: freetId});
    freet.content = content;
    freet.dateModified = new Date();
    await freet.save();
    return freet.populate('authorId');
  }

  /**
   * Delete a freet with given freetId.
   *
   * @param {string} freetId - The freetId of freet to delete
   * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
   */
  static async deleteOne(freetId: Types.ObjectId | string): Promise<boolean> {
    const freet = await FreetModel.deleteOne({_id: freetId});
    return freet !== null;
  }

  /**
   * Delete all the freets by the given author
   *
   * @param {string} authorId - The id of author of freets
   */
  static async deleteMany(authorId: Types.ObjectId | string): Promise<void> {
    await FreetModel.deleteMany({authorId});
  }

  // save freet to collection 
  static async saveFreetToCollection(collectionId: string, freetId: Types.ObjectId | string): Promise<HydratedDocument<Freet>> {
    const freet = await FreetModel.findOne({_id: freetId});
    freet.collectionId = collectionId;
    await freet.save();
    return freet.populate('authorId');
}

  // remove freet from collection 
  static async removeFreetFromCollection(collectionId: string, freetId: Types.ObjectId | string): Promise<HydratedDocument<Freet>> {
    const freet = await FreetModel.findOne({_id: freetId});
    freet.collectionId = '';
    await freet.save();
    return freet.populate('authorId');
}
  // write a forum post in community 
  static async addForum(authorId: Types.ObjectId | string, content: string, communityId: Types.ObjectId | string): Promise<HydratedDocument<Freet>> {
  const date = new Date();
  const freet = new FreetModel({
    authorId,
    dateCreated: date,
    content,
    dateModified: date,
    collectionId: '',
    communityId
  });
  await freet.save(); // Saves freet to MongoDB
  const freetId = freet._id;

  // also need to save freet in community
  const community = await CommunityModel.findOne({_id: communityId});
  community.freets.push(freetId.toString());
  await community.save();
  return freet.populate('authorId');
  }
}

export default FreetCollection;
