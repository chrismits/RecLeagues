export class Settings {
	full_name: string;
    pronouns: string;
    email:  string;
    password: string;

    constructor (name: string, pronouns: string, email: string,
    			 password: string) {
        this.full_name = name;
        this.pronouns  = pronouns;
        this.email = email;
        this.password  = password;
    }

    getName() { return this.full_name; }
    getPronouns() { return this.pronouns; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }

    setName(name : string) { this.full_name = name; }
    setPronouns(pronouns : string) { return this.pronouns = pronouns; }
    setEmail(email : string) { return this.email = email;}
    setPassword(pass : string) { return this.password = pass;}

}