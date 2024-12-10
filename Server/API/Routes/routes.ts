import express, { Request, Response } from 'express';
import { loginAuthenticator } from './login/login';
import { register, registerHandler } from './register/register';


export const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await loginAuthenticator.login(username, password);
    res.json({ result });
});

router.post('/register', async (req: Request, res: Response) => {
    const result = registerHandler(req.body);
    res.json({ result });
});
