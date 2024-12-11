import express, { Request, Response } from 'express';
import { loginHandler, autoLoginHandler } from './login/login';
import { registerHandler } from './register/register';

export const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await loginHandler(username, password);
    res.json({ result });
});

router.post('/register', async (req: Request, res: Response) => {
    const result = await registerHandler(req.body);
    res.json({ result });
});

router.post('/autoLogin', async (req: Request, res: Response) => {
    const { token } = req.body;
    const result = await autoLoginHandler(token);
    res.json({ result });
});
