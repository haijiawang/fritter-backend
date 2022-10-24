import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import { Types } from 'mongoose';
import UserModel from '../user/model';
import CommunityModel from './model';
import CollectionDOModel from './model';

const router = express.Router();

/**
 * Checks if community name is valid
 */
const isValidCommunityName = (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body as { content: string };
    if (!content) {
        res.status(400).json({
            error: 'Community name must be at least one character long.'
        });
        return;
    }
    if (!content.trim()) {
        res.status(400).json({
            error: 'Community name must be at least one character long.'
        });
        return;
    }
    next();
};

/**
* Checks if a community exists
*/
const isCommunityExists = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.communityId);
    const community = await CommunityModel.findOne({ _id: req.params.communityId });
    if (!community) {
        res.status(404).json({
            error: {
                collectionNotFound: `Community with ID ${req.params.communityId} does not exist.`
            }
        });
        return;
    }
    next();
};

/**
 * check user is an owner of the community
 */
const isCommunityOwner = async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.session.userId;
    const community = await CommunityModel.findOne({ _id: req.params.communityId });
    if (!community.owners.includes(userId.toString())) {
        res.status(401).json({
            error: {
                unauthorized: `You are not an owner of the community. You do not have permissions.`
            }
        });
        return;
    }
    next();
};

/**
 * check user is an owner of the community
 */
const isNotInCommunity = async (req: Request, res: Response, next: NextFunction) => {
    const community = await CommunityModel.findOne({ _id: req.params.communityId });
    if (community.owners.includes(req.params.userId)) {
        res.status(403).json({
            error: {
                alreadyExists: `User is already a part of the community.`
            }
        });
        return;
    }
    if (community.users.includes(req.params.userId)) {
        res.status(403).json({
            error: {
                alreadyExists: `User is already a part of the community.`
            }
        });
        return;
    }
    next();
};

export {
    isValidCommunityName,
    isCommunityExists,
    isCommunityOwner,
    isNotInCommunity
}; 