import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
	role: string;

	setRole(r : string) { this.role = r; }
	getRole() { return this.role; }

    constructor() { }
}
