export class Settings {
    fullName: string;
    pronouns: string;
    email: string;
    password: string;
    picture: any;

    constructor(name: string, pronouns: string, email: string,
                password: string, pic: any) {
        this.fullName  = name;
        this.pronouns  = pronouns;
        this.email     = email;
        this.password  = password;
        this.picture   = pic;
    }

    getName() { return this.fullName; }
    getPronouns() { return this.pronouns; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }
    getPicture() { return this.picture; }

    setName(name: string) { this.fullName = name; }
    setPronouns(pronouns: string) { this.pronouns = pronouns; }
    setEmail(email: string) { this.email = email; }
    setPassword(pass: string) { this.password = pass; }
    setPicture(pic: any) { this.picture = pic; }
}
