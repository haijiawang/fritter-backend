import type { NextFunction, Request, Response } from 'express';
import CommunityCollection from './collection';
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
        const name = (req.body.name as string) ?? ''
        const userId = (req.session.userId as string) ?? ''; 
        const community = await CommunityCollection.addOne(userId, name);
        
        res.status(201).json({
            message: 'Your community was created successfully.', 
            collection: util.constructCommunityResponse(community)
        });
        // TODO: ADD MIDDLEWARE CHECKS FOR INVALID NAMES
    }
)

export { router as communityRouter }