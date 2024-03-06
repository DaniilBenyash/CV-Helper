import { makeAutoObservable } from "mobx";

type Technologies = {
  [name: string]: number;
};

export class TechnologiesStore {
  technologies: Technologies = {};

  constructor() {
    makeAutoObservable(this);
  }
}
