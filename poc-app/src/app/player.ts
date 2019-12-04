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

}
