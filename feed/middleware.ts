import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import { Types } from 'mongoose';
import UserModel from '../user/model';
import CommunityModel from './model';
import CollectionDOModel from './model';

const router = express.Router();

/**
 * check user is an owner of the community
 */
const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
    let userId = req.params.userId;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        res.status(404).json({
            error: {
                doesNotExist: `User does not exist.`
            }
        });
        return;
    }
    next();
};



export {
    isUserExists,
}; 