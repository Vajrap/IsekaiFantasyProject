import express, { Request, Response } from 'express';
import { loginHandler, autoLoginHandler } from './login/login';
import { registerHandler } from './register/register';
import { createCharacterHandler } from './CreateCharacter/createCharacter';
import { getPartyHandler } from './getParty/getParty';
// import { changeSkillDeck } from './Character/Skill/changeSkillDeck';

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
    console.log('Create Character Route called');
    const { characterName, portrait, race, className, background, gender, userID } = req.body;
    const result = await createCharacterHandler(characterName, portrait, race, className, background, gender, userID);
    res.json({ result });
});

router.post('/getParty', async (req: Request, res: Response) => {
    console.log('Get Party Route called');
    const { user_id } = req.body;
    const result = await getPartyHandler(user_id);
    res.json({ result });
});

router.post('/changeSkillDeck', async (req: Request, res: Response) => {
    console.log('Change Skill Deck Route called');
    // const result = await changeSkillDeck(req.body);
    // res.json({ result });
});