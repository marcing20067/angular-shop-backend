import { Request, Response, NextFunction } from 'express';
import path from 'path';

const FRONTEND_PATH = path.join(__dirname, '..', '..', 'www', 'index.html');
const FrontendPage = (req: Request, res: Response, next: NextFunction) => {
  const accept = req.headers.accept?.split(',');
  if (accept && accept.includes('text/html')) {
    res.sendFile(FRONTEND_PATH);
    return;
  }

  next();
};

export default FrontendPage;