import type {NextFunction, Request, Response} from 'express';
import CollectionDOCollection from './collection';
import express from 'express';
import * as userValidator from '../user/middleware';

const router = express.Router();

router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const name = (req.body.name as string) ?? '';
        console.log(req)
        const collectionDO = await CollectionDOCollection.addOne(name);

        res.status(201).json({
            message: 'Your collection was created successfully.',
          });
        // TODO: add construct collection response
        // TODO: ADD ERROR HADNDLING
    }
)

router.delete(
    '/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const name = (req.body.name as string) ?? '';
        const collectionDO = await CollectionDOCollection.deleteOne(name);

        res.status(201).json({
            message: 'Your collection was deleted successfully.',
          });
        // TODO: add construct collection response
        // TODO: ADD ERROR HADNDLING
    }
)

// update collection name 
router.put(
    '/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const name = (req.body.name as string) ?? '';
        const newName = (req.body.newName as string) ?? '';
        const collectionDO = await CollectionDOCollection.updateOne(name, newName);

        res.status(201).json({
            message: 'Your collection name was changed successfully.',
          });
        // TODO: add construct collection response
        // TODO: ADD ERROR HADNDLING
    }
)

// get all collections 
router.get(
    '/all',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const collectionDO = await CollectionDOCollection.findAll();

        res.status(201).json({
            message: 'Your collection name was changed successfully.',
          });
        // TODO: add construct collection response
        // TODO: ADD ERROR HADNDLING
    }
)

// get collection by name
router.get(
    '/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const name = (req.body.name as string) ?? '';
        const collectionDO = await CollectionDOCollection.findByName(name);

        res.status(201).json({
            message: 'Your collection name was changed successfully.',
          });
        // TODO: add construct collection response
        // TODO: ADD ERROR HADNDLING
    }
)

export {router as collectionDORouter}