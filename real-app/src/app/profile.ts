export class Profile {
    full_name: string;
    email: string;
    cell:  string;

    constructor (name: string, email: string, cell?: string) {
        this.full_name = name;
        this.email = email;
        this.cell  = cell;
    }

    getName() { return this.full_name; }
    getEmail() { return this.email; }
    getCell() { return this.cell; }

    setName(name : string) { this.full_name = name; }
    setEmail(email : string) { return this.email = email; }
    setCell(cell : string) { return this.cell = cell; }

}
