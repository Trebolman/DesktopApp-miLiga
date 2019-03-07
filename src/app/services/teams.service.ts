import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TeamsService {
  private apiUrl = "https://api-mi-liga.now.sh/api/equipos/";

  constructor(private http: HttpClient) {}

  getTeams() {
    return this.http.get(this.apiUrl);
  }

  getTeamPlayers(id) {
    return this.http.get(this.apiUrl + id + "/jugadores");
  }

  addTeam(team) {
    return this.http.post(this.apiUrl, team);
  }

  updateTeam(team) {
    return this.http.put(this.apiUrl + team.id, team);
  }

  deleteTeam(teamId) {
    return this.http.delete(this.apiUrl + teamId);
  }
}
