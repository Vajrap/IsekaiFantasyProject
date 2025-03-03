import { CharacterStatusEnum } from "../../../Common/DTOsEnumsInterfaces/Character/CharacterStatusTypes"
import { BackgroundEnum, ClassEnum, RaceEnum } from "../../../Common/RequestResponse/characterCreation"
import { Character, setCharacterStatus } from "../../Entities/Character/Character"
import { game } from "../../Game/Game"

async function main() {
    await game.start()
    let character = new Character({
        id: "1",
        name: 'test',
        gender: "MALE",
        portrait: "portrait",
    })
    
    for (const attribute of Object.keys(character.status.attributes) as Array<keyof typeof character.status.attributes>) {
        character.status.attributes[attribute].base = 8
    }
    character.status.attributes
    
    
    // let trainingSessionCount = 10
    // let allAttrs = ['charisma', 'luck', 'intelligence', 'leadership', 'vitality', 'willpower', 'breath', 'planar', 'dexterity', 'agility', 'strength', 'endurance']
    // while (trainingSessionCount > 0) {
    //     for (const attribte of Object.keys(character.status.attributes) as Array<keyof typeof character.status.attributes>) {
    //         let trainingStat = Math.floor(Math.random() * allAttrs.length)
    //         let trainingStatName = allAttrs[trainingStat]
            
    //         trainingSessionCount--
    //         // character.train(trainingStatName as CharacterStatusEnum, 0)
    //         character.train(CharacterStatusEnum.agility, 3)
    //         console.log(`Training ${trainingStatName}...`)
    //     }
    // }
    // console.log(character.level)
    // console.log(character.status.attributes)
    let battleWon = 5 
    while (battleWon > 0) {
        for (const attribute in character.status.attributes) {
            character.train(attribute as CharacterStatusEnum, 3)
        }
        battleWon--
        
        console.log(character.level)
        console.log(character.status.attributes)
    }

}

main()
// console.log(character)