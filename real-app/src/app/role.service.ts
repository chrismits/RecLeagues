import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
	role: string;

	setRole(r : string) { this.role = r; }
	getRole() { return this.role; }

	constructor(private apiService: ApiService) { }
	
	adminSignup(name: string, email: string, password: string) {
		console.log("F -> F: Admin Signup")
		return this.apiService.adminSignup(name, email, password)
	}

	adminLogin(email: string, password: string) {
		console.log("F -> F: Admin login")
		return this.apiService.adminLogin(email, password)
	}

	playerSignup(first: string, last: string, email: string, password: string) {
		console.log("F -> F: Player Signup")
		return this.apiService.playerSignup(first, last, email, password)
	}

	playerLogin(email: string, password: string) {
		console.log("F -> F: Player Login")
		return this.apiService.playerLogin(email, password)
	}

}
