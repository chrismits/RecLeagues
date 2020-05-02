import { League } from './league';

export class Admin {

    id: string;
    name: string;
    email: string;
    leagues: League[];
    pronouns: string;
    created: Date;

    constructor(id: string, name: string, email: string, leagues: League[], nouns: string) {
        this.id      = id; // will change for db
        this.leagues = leagues;
        this.name    = name;
        this.email   = email;
        this.pronouns = nouns;
        this.created = new Date();
    }


    getCreated() { return this.created; }
    getPronouns() { return this.pronouns; }
    getEmail() { return this.email; }
    getName() { return this.name; }
    getLeagues() { return this.leagues; }

}
