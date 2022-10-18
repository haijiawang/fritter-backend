import type { NextFunction, Request, Response } from 'express';
import express from 'express';


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
    const {name} = req.body as {name: string};
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

  export{
    isValidName
  }; 