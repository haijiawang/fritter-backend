import type { NextFunction, Request, Response } from 'express';
import CollectionDOCollection from './collection';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as util from './util';
import * as collectionValidator from '../collections/middleware';

const router = express.Router();

router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const name = (req.body.name as string) ?? '';
        const userId = (req.session.userId as string) ?? '';
        const collectionDO = await CollectionDOCollection.addOne(userId, name);

        res.status(201).json({
            message: 'Your collection was created successfully.',
            collection: util.constructCollectionDOResponse(collectionDO)
        });
        // TODO: ADD ERROR HADNDLING
    }
)

router.delete(
    '/:collectionId?',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        await CollectionDOCollection.deleteOne(req.params.collectionId);

        res.status(201).json({
            message: 'Your collection was deleted successfully.',
        });
        // TODO: ADD ERROR HADNDLING
    }
)

/**
 * Update collection name 
 *
 * @name PUT /api/collections/:id
 *
 * @param {string} name - the new name 
 * @return {CollectionResponse} - the updated collection
 * @throws {403} - if the user is not logged in or not the author of
 *                 of the freet
 * @throws {400} - If the name is empty or a stream of empty spaces
 * @throws {413} - If the name content is more than 100 characters long
 */
router.put(
    '/:collectionId?',
    [
        userValidator.isUserLoggedIn,
        collectionValidator.isValidName
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

// get collection by name
router.get(
    '/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const allCollections = await CollectionDOCollection.findById(req.query.collectionId as string);

        const response = allCollections.map(util.constructCollectionDOResponse);
        res.status(200).json(response);
    }
)

export { router as collectionDORouter }