export class Settings {
	full_name: string;
    pronouns: string;
    time_zone:  string;
    language: string;

    constructor (name: string, pronouns: string, time_zone: string,
    			 lang: string) {
        this.full_name = name;
        this.pronouns  = pronouns;
        this.time_zone = time_zone;
        this.language  = lang;
    }

    getName() { return this.full_name; }
    getPronouns() { return this.pronouns; }
    getTimeZone() { return this.time_zone; }
    getLanguage() { return this.language; }

    setName(name : string) { this.full_name = name; }
    setpronouns(pronouns : string) { return this.pronouns = pronouns; }
    setTimeZone(time_zone : string) { return this.time_zone = time_zone;}
    setLanguage(lang : string) { return this.language = lang;}

}