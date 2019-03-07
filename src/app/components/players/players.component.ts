import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PlayersService } from "../../services/players.service";
import { TeamsService } from "../../services/teams.service";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent implements OnInit {
  players: any[];

  constructor(
    private teamsService: TeamsService,
    private playersService: PlayersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id === undefined) {
        this.playersService.getPlayers().subscribe((data: any) => {
          this.players = data;
        });
      } else {
        this.teamsService.getTeamPlayers(params.id).subscribe((data: any) => {
          this.players = data.jugadores;
        });
      }
    });
  }
}
