import express, { Request, Response } from 'express';
import { loginHandler, autoLoginHandler } from './login/login';
import { registerHandler } from './register/register';
import { createCharacterHandler } from './CreateCharacter/createCharacter';

export const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await loginHandler(username, password);
    res.json({ result });
});

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result = await registerHandler(username, password);
    res.json({ result });
});

router.post('/autoLogin', async (req: Request, res: Response) => {
    const { token } = req.body;
    const result = await autoLoginHandler(token);
    res.json({ result });
});

router.post('/createCharacter', async (req: Request, res: Response) => {
    const { characterName, portrait, race, className, background, gender, token } = req.body;
    const result = await createCharacterHandler(characterName, portrait, race, className, background, gender, token);
    res.json({ result });
});
