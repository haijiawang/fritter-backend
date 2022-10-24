import type { NextFunction, Request, Response } from 'express';
import CollectionDOCollection from './collection';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as util from './util';
import * as collectionValidator from '../collections/middleware';

const router = express.Router();

/**
 * @throws {403} - if the user is not logged in
 * @throws {400} - If the collection name is invalid
 */
router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
        collectionValidator.isValidCollectionName
    ],
    async (req: Request, res: Response) => {
        const name = (req.body.name as string) ?? '';
        const userId = (req.session.userId as string) ?? '';
        const collectionDO = await CollectionDOCollection.addOne(userId, name);

        res.status(201).json({
            message: 'Your collection was created successfully.',
            collection: util.constructCollectionDOResponse(collectionDO)
        });
    }
)

/**
 * @throws {403} - if the user is not logged in
 * @throws {404} - if the collection does not exist 
 */
router.delete(
    '/:collectionId?',
    [
        userValidator.isUserLoggedIn,
        collectionValidator.isCollectionExists,
    ],
    async (req: Request, res: Response) => {
        await CollectionDOCollection.deleteOne(req.params.collectionId);

        res.status(201).json({
            message: 'Your collection was deleted successfully.',
        });
    }
)

/**
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {400} - If the collection name is invalid
 * @throws {404} - if the collection does not exist 
 */
router.put(
    '/:collectionId?',
    [
        userValidator.isUserLoggedIn,
        collectionValidator.isCollectionExists,
        collectionValidator.isValidCollectionName
    ],
    async (req: Request, res: Response) => {
        const collectionDO = await CollectionDOCollection.updateOne(req.params.collectionId, req.body.name);
        res.status(200).json({
            message: 'Your collection name was changed successfully.',
            collection: util.constructCollectionDOResponse(collectionDO)
        });
    }
)

// get all collections 
router.get(
    '/all',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const allCollections = await CollectionDOCollection.findAll();

        const response = allCollections.map(util.constructCollectionDOResponse);
        res.status(200).json(response);
    }
)

/**
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {404} - if the userID does not exist 
 */
// get collection by ID
router.get(
    '/',
    [
        userValidator.isUserLoggedIn,
        collectionValidator.ownerExists
    ],
    async (req: Request, res: Response) => {
        const allCollections = await CollectionDOCollection.findById(req.query.userId as string);

        const response = allCollections.map(util.constructCollectionDOResponse);
        res.status(200).json(response);
    }
)

export { router as collectionDORouter }