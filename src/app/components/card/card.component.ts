import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ElectronService } from "../../providers/electron.service";
import { PlayersService } from "../../services/players.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input()
  data: any;
  @Input()
  route: string;

  constructor(
    private router: Router,
    private electronService: ElectronService,
    private playersService: PlayersService
  ) {}

  ngOnInit() {}

  goToLink(id) {
    this.router.navigate([this.route, id]);
  }

  showDialog() {
    this.electronService.remote.dialog.showMessageBox(
      {
        type: "question",
        title: "Confirmación",
        message: `¿Deseas activar a ${this.data.nombre}?`,
        buttons: ["si", "no"]
      },
      res => {
        if (res === 0) {
          this.playersService.updatePlayer(this.data).subscribe(
            success => {
              console.log(success);
              this.data.estado = true;
            },
            e => {
              console.log("-->", e);
              const error = e.error.error;
              this.electronService.remote.dialog.showErrorBox(
                error.name,
                error.statusCode + " :: " + error.message
              );
            }
          );
        }
      }
    );
  }
}
