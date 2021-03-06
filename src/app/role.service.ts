import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
	role: string | null;

	setRole(r : string) { this.role = r; }
	// getRole() { return this.role; }

	getRole() {
		var deets = this.apiService.getLoginDetails()

		if (!deets)
			return null
		
		if (deets.admin) {
			return 'admin'
		}
		else {
			return 'user'
		}
	}

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

	loggedin() {
		return this.apiService.hasToken()
	}

	logout() {
		this.apiService.logout()
	}

}
