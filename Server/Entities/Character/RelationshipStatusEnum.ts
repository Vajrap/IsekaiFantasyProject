export enum RelationShipStatusEnum {
    LOVER = "LOVER",
    FRIEND = "FRIEND",
    ENEMY = "ENEMY",
    NEUTRAL = "NEUTRAL",
    FAMILY = "FAMILY",
    ACQUAINTANCE = "ACQUAINTANCE",
    STRANGER = "STRANGER",
    UNKNOWN = "UNKNOWN",

    // Stronger positive relations
    BEST_FRIEND = "BEST_FRIEND",
    ALLY = "ALLY",
    SWORN_BROTHER = "SWORN_BROTHER", // Oath-bound relationship (e.g., blood brothers)
    MENTOR = "MENTOR", // Teacher-student dynamic
    APPRENTICE = "APPRENTICE", // Learner following a mentor
    PROTECTOR = "PROTECTOR", // Guardian or bodyguard
    VASSAL = "VASSAL", // Someone who serves under another
    LOYALIST = "LOYALIST", // Unshakable follower

    // Negative relations
    RIVAL = "RIVAL", // Competitive but not necessarily hostile
    BETRAYER = "BETRAYER", // Someone who has broken trust
    TRAITOR = "TRAITOR", // More severe than betrayer, an active threat
    NEMESIS = "NEMESIS", // A deeply personal enemy
    OPPRESSOR = "OPPRESSOR", // One who holds power over another
    SERVANT = "SERVANT", // Subjugated individual
    SLAVE = "SLAVE", // Forced servitude (historical or fantasy context)

    // Situational relations
    COMPETITOR = "COMPETITOR", // Someone you’re currently in competition with
    TEMPORARY_ALLY = "TEMPORARY_ALLY", // Joined forces for now, but not a long-term bond
    BUSINESS_PARTNER = "BUSINESS_PARTNER", // A professional alliance
    MASTER = "MASTER", // A dominant figure (e.g., master of a servant, sorcerer to apprentice)
    UNDERLING = "UNDERLING", // A subordinate in an organization
    PATRON = "PATRON", // Someone who financially or politically supports another
    DEBTOR = "DEBTOR", // Owes something to another
    CREDITOR = "CREDITOR", // Is owed something by another
    CONSPIRATOR = "CONSPIRATOR", // Shared secretive or illegal goal
    INFORMANT = "INFORMANT", // Someone feeding information (spy, double agent)
}
