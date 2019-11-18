class Auth {
    private _first: string;
    private _last:  string;
    private _email: string;
    private _cell:  string;

    constructor (first: string, last: string, email: string, cell: string) {
        this._first = first;
        this._last  = last;
        this._email = email;
        this._cell  = cell;
    }
}

export class Player {
    private _id: number;

    auth:    Auth;
    waiver:  boolean;
    created: Date;

    constructor (first: string, last: string, email: string, cell: string) {
        this._id     = 1; // will change for db
        this.auth    = new Auth(first, last, email, cell);
        this.waiver  = false;
        this.created = new Date();
    }
}