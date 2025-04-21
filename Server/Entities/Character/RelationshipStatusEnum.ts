export enum RelationShipStatusEnum {
  Nemesis = "Nemesis", // -100 to -81
  BitterRival = "BitterRival", // -80 to -61
  Hostile = "Hostile", // -60 to -41
  Disliked = "Disliked", // -40 to -21
  Neutral = "Neutral", // -20 to 19
  Acquaintance = "Acquaintance", // 20 to 39
  Familiar = "Familiar", // 40 to 59
  CloseFriend = "CloseFriend", // 60 to 79
  TrustedCompanion = "TrustedCompanion", // 80 to 95
  BestFriend = "BestFriend", // 96 to 100

  Lover = "Lover", // Set by event
  Spouse = "Spouse", // Set by event
  SwornSibling = "SwornSibling", // Set by event
  Mentor = "Mentor", // Set by event
  Apprentice = "Apprentice", // Set by event
  Patron = "Patron", // Set by event
  Vassal = "Vassal", // Set by event
}
