class Card {
    constructor() {
        this.showingSide = 'front';
        this.frontFace = this.createFrontFace();
        this.backFace = this.createBackFace();

        this.frontFace.addEventListener('click', () => this.flipCard());
        this.backFace.addEventListener('click', () => this.flipCard());

        this.card.appendChild(this.frontFace);
    }

    createCard() {
        const card = document.createElement('div');
        card.classList.add('card');
        return card;
    }

    createFrontFace() {
        const frontFace = document.createElement('div');
        frontFace.classList.add('card-front');
        return frontFace;
    }

    createBackFace() {
        const backFace = document.createElement('div');
        backFace.classList.add('card-back');
        return backFace;
    }

    flipCard() {
        if (this.showingSide === 'front') {
            this.frontFace.classList.add('hidden');
            this.backFace.classList.remove('hidden');
            this.showingSide = 'back';
        } else {
            this.frontFace.classList.remove('hidden');
            this.backFace.classList.add('hidden');
            this.showingSide = 'front';
        }
    }

    render() {
        return this.card;
    }
}

//someone called for card
const card = new Card();
//some placeHolder to render the card
cardPlaceholder.appendChild(card.render());

//when flip should do this?
card.flipCard();
cardPlaceholder.appendChild(card.render());