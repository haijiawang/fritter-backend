import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import FeedCollection from './collection';
import * as util from './util';

const router = express.Router();

// get following feed
router.get(
    '/user/:userId?/following',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const feed = await FeedCollection.getFollowingFeed(req.params.userId);

        res.status(200).json({
            message: 'You successfully retrieved the following feed.', 
            feed: feed
        });
    }
)

// get recommended feed
router.get(
    '/user/:userId?/recommended',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const feed = await FeedCollection.getRecommendedFeed(req.params.userId);

        res.status(200).json({
            message: 'You successfully retrieved the following feed.', 
            feed: feed
        });
    }
)

// get community feed
router.get(
    '/community/:communityId?',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const feed = await FeedCollection.getCommunityFeed(req.params.communityId);

        res.status(200).json({
            message: 'You successfully retrieved the community feed.', 
            feed: feed
        });
    }
)

router.get(
    '/:userId?',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const followers = await FeedCollection.getFollowers(req.params.userId);

        res.status(200).json({
            message: 'You successfully retrieved the following users.', 
            following: followers
        });
    }
)


router.put(
    '/follow/:userId?',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        console.log(req.session.userId);
        const user = await FeedCollection.followUser(req.session.userId, req.params.userId);
        if (user == undefined) {
            res.status(401).json({
                message: 'You were not able to follow the user. You may already be following user or the user may not exist.'
            });
            return;
        }
        res.status(200).json({
            message: 'You have successfully followed the new user.',
            user: user
        });
    }
)

router.put(
    '/unfollow/:userId?',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const user = await FeedCollection.unfollowUser(req.session.userId, req.params.userId);
        if (user == undefined) {
            res.status(401).json({
                message: 'You were not able to follow the user. You may already be following user or the user may not exist.'
            });
            return;
        }
        res.status(200).json({
            message: 'You have successfully unfollowed the user.',
        });
    }
)

export { router as feedRouter }; 