export enum RelationEnum {
    // General relationships
    Acquaintance = 'Acquaintance',
    Friend = 'Friend',
    CloseFriend = 'CloseFriend',
    BestFriend = 'BestFriend',
    Family = 'Family',
    DistantFamily = 'DistantFamily',
    Rival = 'Rival',
    Ally = 'Ally',
    Neutral = 'Neutral',
    Unknown = 'Unknown',
    
    // Romantic relationships
    Lover = 'Lover',
    Spouse = 'Spouse',
    RomanticInterest = 'RomanticInterest', // Building attraction
    SecretAdmirer = 'SecretAdmirer',      // Hidden affection
    CasualLover = 'CasualLover',          // Non-committal romance
    PassionateLover = 'PassionateLover',  // Intense emotional connection
    ExLover = 'ExLover',                  // Past romantic partner
    ForbiddenLove = 'ForbiddenLove',      // Taboo or risky relationship
    
    // Complex dynamics
    Betrayer = 'Betrayer',
    Nemesis = 'Nemesis',
    Protector = 'Protector',
    Dependent = 'Dependent',
    Contracted = 'Contracted',            // Arranged relationship or agreement
    Obsessed = 'Obsessed',
    Idolized = 'Idolized',
    Rescuer = 'Rescuer',
    Rescued = 'Rescued',
    Manipulator = 'Manipulator',          // Exploitative dynamic
    Manipulated = 'Manipulated',
    Blackmailer = 'Blackmailer',          // Control through coercion
    SlaveOwner = 'SlaveOwner',            // Dark and controversial dynamic
    Slave = 'Slave',                      // Opposite end of control
}
