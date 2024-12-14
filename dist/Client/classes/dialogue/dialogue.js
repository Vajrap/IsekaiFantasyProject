"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Dialogue {
    constructor() {
        this.dialogueBox = document.querySelector(".showConsole");
        this.dialogueBox.innerHTML = "";
        this.leftSideCharacterPortrait = document.querySelector(".dialogueBoxCharacter-left");
        this.rightSideCharacterPortrait = document.querySelector(".dialogueBoxCharacter-right");
        this.dialogueQueue = [];
        this.isSpeaking = false;
        this.isWaitingForClick = false;
        this.dialogueBox.addEventListener("click", () => this.nextDialogue());
    }
    show() {
        this.dialogueBox.classList.remove("hidden");
    }
    hide() {
        this.dialogueBox.classList.add("hidden");
    }
    end() {
        this.dialogueBox.innerHTML = "";
        this.dialogueBox.removeEventListener("click", () => this.nextDialogue());
        this.dialogueQueue = [];
        this.isSpeaking = false;
    }
    createDialogueQueue(sequence) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let action of sequence) {
                if (Array.isArray(action)) {
                    let innerActions = [];
                    for (let innerAction of action) {
                        innerActions.push(yield this.handleAction(innerAction));
                    }
                    this.dialogueQueue.push(innerActions);
                }
                else {
                    this.dialogueQueue.push(yield this.handleAction(action));
                }
            }
            this.processDialogueQueue();
        });
    }
    handleAction(action) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (action.type) {
                case "speak":
                    return {
                        type: "speak",
                        name: action.name,
                        message: action.message,
                        nameColor: action.nameColor,
                    };
                case "portraitR":
                    return { type: "portraitR", portrait: action.portrait };
                case "portraitL":
                    return { type: "portraitL", portrait: action.portrait };
                case "clearPortrait":
                    return { type: "clearPortrait", side: action.side };
                case "narrative":
                    return { type: "narrative", message: action.message };
                case "options":
                    return {
                        type: "options",
                        message: action.message,
                        options: action.options,
                    };
                case "clearDialogue":
                    return { type: "clearDialogue" };
                case "end":
                    return { type: "end", action: action.action || null };
                case "background":
                    return { type: "background", background: action.background };
                default:
                    console.error(`Unknown action type: ${action.type}`);
                    return null;
            }
        });
    }
    changePortrait(portrait, side) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.dialogueQueue.push({
                    type: side === "right" ? "portraitR" : "portraitL",
                    portrait,
                    resolve,
                });
                if (!this.isSpeaking) {
                    this.processDialogueQueue();
                }
            });
        });
    }
    clearPortrait(side) {
        this.dialogueQueue.push({ type: "clearPortrait", side });
        if (!this.isSpeaking) {
            this.processDialogueQueue();
        }
    }
    narrative(message) {
        this.dialogueQueue.push({ type: "narrative", message });
        if (!this.isSpeaking) {
            this.processDialogueQueue();
        }
    }
    clearDialogue() {
        this.dialogueQueue.push({ type: "clearDialogue" });
        if (!this.isSpeaking) {
            this.processDialogueQueue();
        }
    }
    startDialogue() {
        this.dialogueBox.innerHTML = `<div class="dialogueBoxText">Click here...</div>`;
        this.isSpeaking = true;
    }
    processDialogueQueue() {
        if (this.dialogueQueue.length > 0) {
            this.isSpeaking = true;
            let actions = this.dialogueQueue.shift();
            if (Array.isArray(actions)) {
                actions.forEach((action) => this.executeAction(action));
            }
            else {
                this.executeAction(actions);
            }
        }
        else {
            this.isSpeaking = false;
        }
    }
    executeAction(action) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (action.type) {
                case "speak":
                    yield this.displayDialogue(action.name, action.message, action.nameColor);
                    break;
                case "portraitR":
                    this.displayPortrait("right", action.portrait);
                    break;
                case "portraitL":
                    this.displayPortrait("left", action.portrait);
                    break;
                case "clearPortrait":
                    this.clearCharacterPortraits(action.side);
                    break;
                case "narrative":
                    yield this.displayNarrative(action.message);
                    break;
                case "options":
                    this.displayOptions(action.message, action.options);
                    break;
                case "clearDialogue":
                    this.clearDialogueBox();
                    break;
                case "end":
                    if (action.action) {
                        yield action.action();
                    }
                    this.clearDialogueBox();
                    break;
                case "background":
                    this.setBackground(action.background);
                    break;
                default:
                    console.error(`Unknown action type: ${action.type}`);
            }
        });
    }
    displayDialogue(name, message, nameColor) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clearDialogueBox();
            let character = document.createElement("div");
            character.classList.add("dialogueBoxCharacterName");
            character.textContent = name;
            character.style.color = nameColor;
            this.dialogueBox.appendChild(character);
            let narrative = document.createElement("div");
            narrative.classList.add("dialogueBoxText");
            this.dialogueBox.appendChild(narrative);
            // Typewriter effect
            yield this.typewriter(narrative, message);
        });
    }
    displayNarrative(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clearDialogueBox();
            let narrative = document.createElement("div");
            narrative.classList.add("dialogueBoxText");
            this.dialogueBox.appendChild(narrative);
            // Typewriter effect
            yield this.typewriter(narrative, message);
        });
    }
    typewriter(element, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const delay = 10;
            for (let i = 0; i < message.length; i++) {
                element.innerHTML += message.charAt(i);
                yield this.wait(delay);
            }
        });
    }
    wait(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => setTimeout(resolve, ms));
        });
    }
    displayPortrait(side, portrait) {
        if (side === "right") {
            this.portraitR(this.getCharacterPortrait(portrait));
        }
        else if (side === "left") {
            this.portraitL(this.getCharacterPortrait(portrait));
        }
    }
    clearCharacterPortraits(side) {
        let character = document.querySelector(`.dialogueBoxCharacter-${side}`);
        if (character) {
            character.innerHTML = "";
        }
    }
    portraitL(portrait) {
        this.clearCharacterPortraits("left");
        this.leftSideCharacterPortrait.innerHTML = `<img src="${portrait}">`;
    }
    portraitR(portrait) {
        this.clearCharacterPortraits("right");
        this.rightSideCharacterPortrait.innerHTML = `<img src="${portrait}">`;
    }
    getCharacterPortrait(portrait) {
        return `../../assets/portrait/${portrait}.png`;
    }
    displayOptions(message, options) {
        this.clearDialogueBox();
        let narrative = document.createElement("div");
        narrative.classList.add("dialogueBoxText");
        narrative.innerHTML = message;
        this.dialogueBox.appendChild(narrative);
        let optionsContainer = document.createElement("div");
        optionsContainer.classList.add("dialogueBoxOptions");
        options.forEach((option) => {
            let button = document.createElement("button");
            button.classList.add("dialogueBoxOption");
            button.textContent = option.option;
            button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                yield option.action();
                this.nextDialogue();
            }));
            optionsContainer.appendChild(button);
        });
        this.dialogueBox.appendChild(optionsContainer);
    }
    clearDialogueBox() {
        this.dialogueBox.innerHTML = "";
    }
    nextDialogue() {
        if (this.isSpeaking) {
            this.processDialogueQueue();
        }
    }
    setBackground(background) {
        const body = document.body;
        const backgroundImage = this.getBackgroundImage(background.image);
        body.style.transition = `background-image ${background.speed}s ease-in-out, filter ${background.speed}s ease-in-out`;
        body.style.backgroundImage = `url(${backgroundImage})`;
        body.style.backgroundSize = "cover"; // Ensure the background covers the whole body
        body.style.backgroundPosition = "center"; // Center the background image
        body.style.filter = `hue-rotate(${background.hue}deg)`; // Apply hue rotation
    }
    getBackgroundImage(image) {
        return `../../assets/background/${image}.png`;
    }
    highlightElement(elementSelector, narrativeMessage) {
        // Create overlay
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        // Get the element to highlight
        const element = document.querySelector(elementSelector);
        if (!element) {
            console.error(`Element not found: ${elementSelector}`);
            return;
        }
        // Add highlighted class to the element
        element.classList.add("highlighted-element");
        // Create narrative message
        const narrative = document.createElement("div");
        narrative.classList.add("narrative-message");
        narrative.innerHTML = narrativeMessage;
        // Append overlay and narrative message to the body
        document.body.appendChild(overlay);
        document.body.appendChild(narrative);
        // Add click event to the highlighted element to remove overlay and narrative
        element.addEventListener("click", () => {
            element.classList.remove("highlighted-element");
            overlay.remove();
            narrative.remove();
        }, { once: true }); // Ensure the event listener is removed after the first click
    }
    unHighlightElement(elementSelector) {
        const element = document.querySelector(elementSelector);
        if (!element) {
            console.error(`Element not found: ${elementSelector}`);
            return;
        }
        element.classList.remove("highlighted-element");
    }
}
const dialogue = new Dialogue();
