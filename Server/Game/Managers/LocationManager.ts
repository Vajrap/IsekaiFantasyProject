import { DayOfWeek, TimeOfDay } from "../../../Common/DTOsEnumsInterfaces/TimeOfDay";
import { GameLocation } from "../../Entities/Location/GameLocation";
import { 
    location_OceanTide,
    location_MistGarde,
    location_BerrisGrove,
    location_BleakWatch,
    location_BlueSkyMountainSect,
    location_CelestialSwordSect,
    location_CloudShade,
    location_EmberFalls,
    location_FairViewFarm,
    location_FreeAppleWood,
    location_Fyornar,
    location_Goldhem,
    location_GreatWhiteCrossing,
    location_HeartfeltPond,
    location_IvoryForest,
    location_LittleGiant,
    location_LushWood,
    location_MadPass,
    location_MightGrave,
    location_MountHeaven,
    location_NarrowBridge,
    location_Pineborn,
    location_SaltyLake,
    location_ShadowKeep,
    location_SleekMeadow,
    location_SleetWallow,
    location_SmoothShore,
    location_SpiritSide,
    location_SpringPoint,
    location_TheTrident,
    location_UmbralVeil,
    location_WhiteOakEstate
} from "../../Entities/Location/Locations";

class LocationManager {
    locations: GameLocation[] = [];
    constructor(){
        this.initializeLocations();
        this.initilizeConnections();                                                                                                                                                          
    }

    initializeLocations() {
        this.addLocation(location_OceanTide)
        this.addLocation(location_MistGarde)
        this.addLocation(location_BerrisGrove)
        this.addLocation(location_EmberFalls)
        this.addLocation(location_SmoothShore)
        this.addLocation(location_WhiteOakEstate)
        this.addLocation(location_IvoryForest)
        this.addLocation(location_CelestialSwordSect)
        this.addLocation(location_FairViewFarm)
        this.addLocation(location_SaltyLake)
        this.addLocation(location_Fyornar)
        this.addLocation(location_TheTrident)
        this.addLocation(location_GreatWhiteCrossing)
        this.addLocation(location_BleakWatch)
        this.addLocation(location_Goldhem)
        this.addLocation(location_SleekMeadow)
        this.addLocation(location_SleetWallow)
        this.addLocation(location_FreeAppleWood)
        this.addLocation(location_MightGrave),
        this.addLocation(location_NarrowBridge)
        this.addLocation(location_CloudShade)
        this.addLocation(location_MountHeaven)
        this.addLocation(location_SpiritSide)
        this.addLocation(location_ShadowKeep)
        this.addLocation(location_LittleGiant)
        this.addLocation(location_UmbralVeil)
        this.addLocation(location_SpringPoint)
        this.addLocation(location_LushWood)
        this.addLocation(location_Pineborn)
        this.addLocation(location_HeartfeltPond)
        this.addLocation(location_MadPass)
        this.addLocation(location_BlueSkyMountainSect)
    }

    initilizeConnections() {
        this.addConnection(location_OceanTide, location_MistGarde, 400)
        this.addConnection(location_MistGarde, location_BerrisGrove, 400)
        this.addConnection(location_BerrisGrove, location_OceanTide, 400)
        this.addConnection(location_BerrisGrove, location_EmberFalls, 300)
        this.addConnection(location_EmberFalls, location_OceanTide, 800)
        this.addConnection(location_SmoothShore, location_EmberFalls, 400)
        this.addConnection(location_WhiteOakEstate, location_SmoothShore, 200)
        this.addConnection(location_WhiteOakEstate, location_MistGarde, 800)
        this.addConnection(location_IvoryForest, location_WhiteOakEstate, 200)
        this.addConnection(location_IvoryForest, location_SmoothShore, 400)
        this.addConnection(location_CelestialSwordSect, location_IvoryForest, 600)
        this.addConnection(location_CelestialSwordSect, location_WhiteOakEstate, 800)
        this.addConnection(location_FairViewFarm, location_MistGarde, 500)
        this.addConnection(location_FairViewFarm, location_WhiteOakEstate, 500)
        this.addConnection(location_SaltyLake, location_IvoryForest, 300)
        this.addConnection(location_Fyornar, location_MistGarde, 1200)
        this.addConnection(location_Fyornar, location_FairViewFarm, 1400)
        this.addConnection(location_TheTrident, location_Fyornar, 200)
        this.addConnection(location_GreatWhiteCrossing, location_Fyornar, 100)
        this.addConnection(location_BleakWatch, location_TheTrident, 100)
        this.addConnection(location_Goldhem, location_BleakWatch, 400)
        this.addConnection(location_SleekMeadow, location_Goldhem, 300)
        this.addConnection(location_SleekMeadow, location_BleakWatch, 400)
        this.addConnection(location_SleetWallow, location_SleekMeadow, 400)
        this.addConnection(location_SleetWallow, location_CelestialSwordSect, 900)
        this.addConnection(location_FreeAppleWood, location_Goldhem, 700)
        this.addConnection(location_FreeAppleWood, location_BleakWatch, 500)
        this.addConnection(location_MightGrave, location_FreeAppleWood, 100)
        this.addConnection(location_MightGrave, location_Goldhem, 800)
        this.addConnection(location_MightGrave, location_BleakWatch, 500)
        this.addConnection(location_NarrowBridge, location_MightGrave, 100)
        this.addConnection(location_NarrowBridge, location_Goldhem, 900)
        this.addConnection(location_NarrowBridge, location_BleakWatch, 600)
        this.addConnection(location_CloudShade, location_NarrowBridge, 400)
        this.addConnection(location_MountHeaven, location_CloudShade, 200)
        this.addConnection(location_SpiritSide, location_CloudShade, 400)
        this.addConnection(location_SpiritSide, location_MountHeaven, 400)
        this.addConnection(location_SpiritSide, location_GreatWhiteCrossing, 1200)
        this.addConnection(location_ShadowKeep, location_CloudShade, 300)
        this.addConnection(location_ShadowKeep, location_SpiritSide, 400)
        this.addConnection(location_ShadowKeep, location_GreatWhiteCrossing, 600)
        this.addConnection(location_LittleGiant, location_ShadowKeep, 100)
        this.addConnection(location_UmbralVeil, location_LittleGiant, 50)
        this.addConnection(location_SpringPoint, location_SpiritSide, 500)
        this.addConnection(location_SpringPoint, location_GreatWhiteCrossing, 600)
        this.addConnection(location_LushWood, location_SpringPoint, 400)
        this.addConnection(location_LushWood, location_OceanTide, 1000)
        this.addConnection(location_Pineborn, location_LushWood, 100)
        this.addConnection(location_HeartfeltPond, location_MountHeaven, 600)
        this.addConnection(location_HeartfeltPond, location_SpiritSide, 800)
        this.addConnection(location_HeartfeltPond, location_SpringPoint, 800)
        this.addConnection(location_MadPass, location_HeartfeltPond, 400)
        this.addConnection(location_BlueSkyMountainSect, location_MadPass, 400)
        this.addConnection(location_BlueSkyMountainSect, location_HeartfeltPond, 700)
    }

    addLocation(location: GameLocation) {
        this.locations.push(location);
    }

    getLocation(name: string): GameLocation | undefined {
        return this.locations.find(loc => loc.id === name);
    }

    addConnection(location1: GameLocation, location2: GameLocation, distance: number) {
        location1.addConnection(location2, distance);
        location2.addConnection(location1, distance);
    }

    async processEncounters(day: DayOfWeek, phase: TimeOfDay) {
        for (const location of this.locations) {
            await location.processEncounters();
        }
    }

    async processActions(day: DayOfWeek, phase: TimeOfDay) {
        for (const location of this.locations) {
            await location.processActions(day, phase);
        }
    }
}

export const locationManager = new LocationManager();