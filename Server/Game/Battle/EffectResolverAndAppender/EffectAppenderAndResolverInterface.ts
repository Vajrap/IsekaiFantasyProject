import { K } from "../../../Utility/Constants"
import { BuffsAndDebuffsEnum } from "../../../../Common/DTOsEnumsInterfaces/TargetTypes"
import { EffectAppenderSendObject, EffectResolverSendObject, EffectReturnObject } from "./EffectSend + Receive Objects"


export type EffectAppenderMethods = {
    [K in keyof typeof BuffsAndDebuffsEnum]: (appender: EffectAppenderSendObject) => EffectReturnObject;
};

export type EffectResolverMethods = {
    [K in keyof typeof BuffsAndDebuffsEnum]: (resolver: EffectResolverSendObject) => EffectReturnObject;
};
