export class Player {
    private _id: number;
    _first: string;
    _last:  string;
    _email: string;
    _cell:  string;

    waiver:  boolean;
    created: Date;

    constructor (first: string, last: string, email: string, cell?: string) {
        this._id     = 1; // will change for db
        this._first = first;
        this._last  = last;
        this._email = email;
        this._cell  = cell;
        this.waiver  = false;
        this.created = new Date();
    }

    getFirst() { return this._first; }
    getLast() { return this._last; }
    getEmail() { return this._email; }
    getCell() { return this._cell; }
    getWaiver() { return this.waiver; }
    getCreated() { return this.created; }

    setFirst(first : string) { this._first = first; }
    setLast(last : string) { return this._last = last; }
    setEmail(email : string) { return this._email = email; }
    setCell(cell : string) { return this._cell = cell; }
    setWaiver(signed : boolean) { this.waiver = signed; }

}
