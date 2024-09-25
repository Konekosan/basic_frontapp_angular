import { Role } from "./role.model";

export class Usager {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    username: string;
    hashed_pwd: string;
    is_active: boolean;
    roles: Role[];

    constructor(){}

    public isMajor(): boolean {
        return true;
    }
}

export interface UsagerEvent {
    id: string;
}

export interface UsagerResponse {
    usagers: Usager[];
    status: number;
  }

export interface AddUsagerForm {
    parameter: {
        age: string,
        hashed_pwd: string,
        nom: string,
        prenom: string,
        username: string
    }
}