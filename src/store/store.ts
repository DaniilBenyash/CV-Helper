import { makeAutoObservable } from "mobx";
import { getTechnologiesMap } from "@/utils/getTechnologiesMap";
import { TECHNOLOGIES } from "@/constants/technologies";
import { Technologies } from "@/abstraction/store/fields";
import { SetDate, SetTechnologies } from "@/abstraction/store/methods";

export class TechnologiesStore {
  technologiesMap = getTechnologiesMap(TECHNOLOGIES);
  technologies: Technologies = [];

  constructor() {
    makeAutoObservable(this);
  }

  setDate: SetDate = (id, dates) => {
    const targetObject = this.technologies.find((obj) => obj.id === id);

    if (targetObject) {
      targetObject.firstDate = dates[0];
      targetObject.lastDate = dates[0];
    }
  };

  setTechnologies: SetTechnologies = (id, technologies) => {
    const targetObject = this.technologies.find((obj) => obj.id === id);
    const splitRegex = /,?\s+/;
    const technologiesArr = technologies.match(splitRegex);

    if (targetObject) {
      targetObject.technologies = technologiesArr ?? [];
    }
  };
}

export const technologiesStore = new TechnologiesStore();
