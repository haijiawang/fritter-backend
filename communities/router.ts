import type { NextFunction, Request, Response } from 'express';
import CommunityCollection from './collection';
import express from 'express';
import * as userValidator from '../user/middleware';
import * as util from './util';
import * as collectionValidator from '../collections/middleware';
import * as communityValidator from './middleware';
import * as freetValidator from '../freet/middleware'
const router = express.Router();

/**
 * @throws {403} - if the user is not logged in 
 * @throws {400} - If the community name is invalid
 */
router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isValidCommunityName
    ],
    async (req: Request, res: Response) => {
        const name = (req.body.name as string) ?? ''
        const userId = (req.session.userId as string) ?? '';
        const community = await CommunityCollection.addOne(userId, name);

        res.status(201).json({
            message: 'Your community was created successfully.',
            collection: util.constructCommunityResponse(community)
        });
    }
)

/**
 * @throws {403} - if the user is not logged in 
 * @throws {404} - if the community does not exist 
 * @throws {401} - if the user is not authorized as owner
 */
router.delete(
    '/:communityId?',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isCommunityExists,
        communityValidator.isCommunityOwner
    ],
    async (req: Request, res: Response) => {
        await CommunityCollection.deleteOne(req.params.communityId);

        res.status(201).json({
            message: 'The community was deleted successfully.',
        });
        // TODO: ADD ERROR HADNDLING
    }
)

/**
 * @throws {403} - if the user is not logged in 
 * @throws {400} - If the community name is invalid
 * @throws {404} - if the community does not exist 
 * @throws {401} - if the user is not authorized as owner
 */
router.put(
    '/:communityId?',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isValidCommunityName,
        communityValidator.isCommunityExists,
        communityValidator.isCommunityOwner
    ],
    async (req: Request, res: Response) => {
        const community = await CommunityCollection.updateOne(req.params.communityId, req.body.name);
        res.status(200).json({
            message: 'Your community name was changed successfully.',
            community: util.constructCommunityResponse(community)
        });
    }
)

/**
 * @throws {403} - if the user is not logged in 
 * @throws {404} - if the community does not exist 
 * @throws {401} - if the user is not authorized as owner
 */
router.put(
    '/public/:communityId',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isCommunityExists,
        communityValidator.isCommunityOwner
    ],
    async (req: Request, res: Response) => {
        const community = await CommunityCollection.makePublic(req.params.communityId);
        res.status(200).json({
            message: 'You successfully changed your community to be public.',
            community: util.constructCommunityResponse(community)
        });
    }
)

/**
 * @throws {403} - if the user is not logged in 
 * @throws {404} - if the community does not exist 
 * @throws {401} - if the user is not authorized as owner
 */
router.put(
    '/private/:communityId',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isCommunityExists,
        communityValidator.isCommunityOwner,
    ],
    async (req: Request, res: Response) => {
        const community = await CommunityCollection.makePrivate(req.params.communityId);
        res.status(200).json({
            message: 'You successfully changed your community to be private.',
            community: util.constructCommunityResponse(community)
        });
    }
)

/**
 * @throws {403} - if the user is not logged in 
 * @throws {404} - if the community does not exist 
 * @throws {403} - if the user already exists in the community
 */
router.put(
    '/:communityId?/member/:userId?',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isCommunityExists,
        communityValidator.isNotInCommunity
    ],
    async (req: Request, res: Response) => {
        const community = await CommunityCollection.addMember(req.params.communityId, req.params.userId);
        if (community == false) {
            res.status(401).json({
                message: 'You were not able to join the community. You may already be in the community or the community may be private.'
            });
            return;
        }
        res.status(200).json({
            message: 'You have successfully joined the community.',
        });
    }
)

/**
 * @throws {403} - if the user is not logged in 
 * @throws {404} - if the community/freet does not exist 
 */
// save freet to a community
router.put(
    '/:communityId?/freet/:freetId?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists,
        communityValidator.isCommunityExists,
    ],
    async (req: Request, res: Response) => {
        const community = await CommunityCollection.addFreet(req.params.communityId, req.params.freetId);
        res.status(200).json({
            message: 'You added freet to the community',
        });
    }
)

/**
 * @throws {403} - if the user is not logged in 
 * @throws {404} - if the community does not exist 
 */
router.delete(
    '/:communityId?/member/:userId?',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isCommunityExists
    ],
    async (req: Request, res: Response) => {
        const community = await CommunityCollection.deleteMember(req.params.communityId, req.params.userId);

        res.status(200).json({
            message: 'You have successfully left the community.',
            community: util.constructCommunityResponse(community)
        });
    }
)

/**
 * @throws {403} - if the user is not logged in 
 * @throws {404} - if the community does not exist 
 * @throws {403} - if the user already exists in the community
 */
router.put(
    '/:communityId?/owner/:userId?',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isCommunityExists,
        communityValidator.isNotInCommunity
    ],
    async (req: Request, res: Response) => {
        const community = await CommunityCollection.addOwner(req.params.communityId, req.params.userId);
        if (community == false) {
            res.status(401).json({
                message: 'You were not able to join the community. You may already be in the community or the community may be private.'
            });
            return;
        }
        res.status(200).json({
            message: 'You are now an owner of the community.',
        });
    }
)

/**
 * @throws {403} - if the user is not logged in 
 * @throws {404} - if the community does not exist 
 */
router.delete(
    '/:communityId?/owner/:userId?',
    [
        userValidator.isUserLoggedIn,
        communityValidator.isCommunityExists
    ],
    async (req: Request, res: Response) => {
        const community = await CommunityCollection.deleteOwner(req.params.communityId, req.params.userId);

        res.status(200).json({
            message: 'You have successfully left the community as owner.',
            community: util.constructCommunityResponse(community)
        });
    }
)

router.get(
    '/',
    [
        userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        console.log(req.query.userId);
        const userCommunities = await CommunityCollection.findByUser(req.query.userId as string);
        res.status(200).json({
            message: 'You have successfully found all communities you are a part of.',
            communities: userCommunities
        });
    }
);


export { router as communityRouter }