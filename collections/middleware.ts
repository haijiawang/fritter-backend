import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import { Types } from 'mongoose';
import UserModel from '../user/model';
import CollectionDOModel from './model';

const router = express.Router();

/**
 * TO-DO: add collection middlware functions 
 * - ensure that collection name is not empty string 
 */

/**
 * Checks if the name is valid, i.e not a stream of empty
 * spaces and not more than 100
 */
const isValidName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as { name: string };
  if (!name.trim()) {
    res.status(400).json({
      error: 'Name must be at least one character long.'
    });
    return;
  }

  if (name.length > 100) {
    res.status(413).json({
      error: 'Name must be no more than 100 characters.'
    });
    return;
  }

  next();
};

/**
* Checks if a collection exists
*/
const isCollectionExists = async (req: Request, res: Response, next: NextFunction) => {
  const collection = await CollectionDOModel.findOne({ _id: req.params.collectionId });
  if (!collection) {
    res.status(404).json({
      error: {
        collectionNotFound: `Collection with ID ${req.params.collectionId} does not exist.`
      }
    });
    return;
  }
  next();
};

// checks if an owner exists
const ownerExists = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.findOne({ _id: req.query.userId });
  if (!user) {
    res.status(404).json({
      error: {
        userNotFound: `User with ID ${req.query.userId} does not exist.`
      }
    });
    return;
  }
  next();
};

/**
 * Checks if collection name is valid
 */
const isValidCollectionName = (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body as { content: string };
  if (!content) {
    res.status(400).json({
      error: 'Collection name must be at least one character long.'
    });
    return;
  }
  if (!content.trim()) {
    res.status(400).json({
      error: 'Collection name must be at least one character long.'
    });
    return;
  }
  next();
};

export {
  isValidName,
  isCollectionExists,
  isValidCollectionName, 
  ownerExists
}; 