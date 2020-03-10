export class Settings {
	full_name: string;
    pronouns: string;
    email:  string;
    password: string;
    picture: any;

    constructor (name: string, pronouns: string, email: string,
    			 password: string, pic: any) {
        this.full_name = name;
        this.pronouns  = pronouns;
        this.email = email;
        this.password  = password;
        this.picture = pic;
    }

    getName() { return this.full_name; }
    getPronouns() { return this.pronouns; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }
    getPicture() { return this.picture; }

    setName(name : string) { this.full_name = name; }
    setPronouns(pronouns : string) { this.pronouns = pronouns; }
    setEmail(email : string) { this.email = email;}
    setPassword(pass : string) { this.password = pass;}
    setPicture(pic : any) { this.picture = pic;}

}