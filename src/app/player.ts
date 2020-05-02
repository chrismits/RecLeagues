import { Settings } from './settings';

export class Player {
    id: string;
    first: string;
    last: string;
    email: string;
    cell: string;
    pronouns: string;
    logo: any;

    waiver: boolean;
    created: Date;

    constructor(id: string, first: string, last: string, email: string, cell?: string) {
        this.id     = id; // will change for db
        this.first = first;
        this.last  = last;
        this.email = email;
        this.cell  = cell;
        this.waiver  = false;
        this.pronouns = '';
        this.logo = null;
        this.created = new Date();
    }

    getFirst() { return this.first; }
    getLast() { return this.last; }
    getEmail() { return this.email; }
    getCell() { return this.cell; }
    getWaiver() { return this.waiver; }
    getPronouns() { return this.pronouns; }
    getLogo() { return this.logo; }
    getCreated() { return this.created; }

    setFirst(first: string) { this.first = first; }
    setLast(last: string) { return this.last = last; }
    setEmail(email: string) { return this.email = email; }
    setCell(cell: string) { return this.cell = cell; }
    setWaiver(signed: boolean) { this.waiver = signed; }
    setPronouns(nouns: string) { this.pronouns = nouns; }
    setLogo(logo: any) { this.logo = logo; }
    setID(id: string) {this.id = id}

    updateWithSettings(s: Settings) {
        this.first = s.getName().split(' ')[0];
        this.last = s.getName().split(' ')[1];
        this.email = s.getEmail();
        this.pronouns = s.getPronouns();
        this.logo = s.getPicture();
    }
}
