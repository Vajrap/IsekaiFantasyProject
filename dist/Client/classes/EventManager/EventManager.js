"use strict";
class EventManager {
    constructor(gameModel) {
        this.gameModel = gameModel;
    }
    startNewGameEvent() {
        let newGameDialogueSequence = [
            {
                type: 'background',
                background: {
                    image: 'blueKingdom-dock', // filename without the extension
                    speed: 3, // transition speed in seconds
                    hue: 0 // hue rotation in degrees
                }
            },
            { type: 'narrative', message: `It's the third year after the ending of Obsidian stronghold invading all other kingdoms of the continent.` },
            { type: 'narrative', message: `The war ended with the destruction of the Obsidian stronghold and the death of the Obsidian's King.` },
            { type: 'narrative', message: `Obsidian stronghold went under a big rebuilding, with the new king trying to establish peace in the kingdom.` },
            { type: 'narrative', message: `The continent is now in peace, but the scars of the war are still visible in the land.` },
            { type: 'narrative', message: `Monsters, Outlaws, and bandits are all over the land, trying to take advantage of the chaos.` },
            { type: 'narrative', message: `At the same time, many adventurers and opportunists travel into the land, trying to make a fortune from this turmoil.` },
            { type: 'narrative', message: `And you are one of them, a young adventurer, trying to make a name for yourself in this new world.` },
            { type: 'portraitL', portrait: 'npc/captain' },
            { type: 'speak', name: 'Captain', message: `Hey you! Wake up! We are arriving at the port!`, nameColor: 'blue' },
            { type: 'portraitR', portrait: `m/${this.gameModel.playerCharacter.portrait}` },
            { type: 'options', message: 'How would you answer?:', options: [
                    {
                        option: `Thank you, Captain! I'm going now.`,
                        action: () => {
                            dialogue.clearCharacterPortraits(`left`);
                            dialogue.clearCharacterPortraits(`right`);
                        }
                    },
                    {
                        option: `Don't use that tone with me you blaster piece of shite, I'm going on my way now!`,
                        action: () => {
                            this.gameModel.playerCharacter.karma -= 1;
                            dialogue.clearPortrait(`left`);
                            dialogue.clearPortrait(`right`);
                        }
                    }
                ] },
            { type: 'narrative', message: `You are now at the port of the city of Lighthaven, the biggest city in the continent.` },
            { type: 'narrative', message: `You can click on the 'Help' icon in the right side of the screen to see the tutorial.` },
            { type: 'narrative', message: `Now, everything is up to you!` },
            { type: 'end' }
        ];
        dialogue.startDialogue();
        dialogue.createDialogueQueue(newGameDialogueSequence);
    }
}
