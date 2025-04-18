import { Information } from "./information";

class InforMationRepository {
  info: { [key: string]: Information };
  constructor(infos: Information[]) {
    this.info = {};
    for (const info of infos) {
      this.info[info.id] = info;
    }
  }

  getInformation(infoID: string): Information {
    const info = this.info[infoID];
    if (!info) throw new Error(`Information with ID ${infoID} not found`);
    return info;
  }
}

export const informationRepository = new InforMationRepository([]);
