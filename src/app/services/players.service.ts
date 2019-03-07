import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PlayersService {
  private apiUrl = "https://api-mi-liga.now.sh/api/jugadores/";

  constructor(private http: HttpClient) {}

  getPlayers() {
    return this.http.get(this.apiUrl);
  }

  addPlayer(team) {
    return this.http.post(this.apiUrl, team);
  }

  updatePlayer(team) {
    console.log(team);
    return this.http.put(this.apiUrl + team.id, team);
  }

  deletePlayer(teamId) {
    return this.http.delete(this.apiUrl + teamId);
  }
}
