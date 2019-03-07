import { Component, OnInit, NgZone } from "@angular/core";
import { ElectronService } from "../../providers/electron.service";
import { TeamsService } from "../../services/teams.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-teams",
  templateUrl: "./teams.component.html",
  styleUrls: ["./teams.component.scss"]
})
export class TeamsComponent implements OnInit {
  teams: any[];

  menuTemplate = [
    {
      submenu: [
        {
          label: "Copiar",
          role: "copy"
        },
        {
          label: "Pegar",
          role: "paste"
        },
        {
          label: "Recargar datos",
          click: () => {
            this.loadData();
          }
        }
      ]
    },
    {
      label: "Secciones",
      submenu: [
        {
          label: "Equipos",
          accelerator: "CommandOrControl+Shift+E",
          click: () => {
            this.goToPage("equipos");
          }
        },
        {
          label: "Jugadores",
          accelerator: "Control+J",
          click: () => {
            this.goToPage("jugadores");
          }
        },
        {
          label: "Estadios",
          accelerator: "Shift+T",
          click: () => {
            this.goToPage("estadios");
          }
        }
      ]
    },
    {
      label: "Ayuda",
      submenu: [
        {
          label: "Electron",
          click: () => {
            const apiUrl = "https://electronjs.org/docs/";
            this.electronService.remote.shell.openExternal(apiUrl);
          }
        }
      ]
    }
  ];

  constructor(
    private teamsService: TeamsService,
    private electronService: ElectronService,
    private router: Router,
    private zone: NgZone
  ) {
    const menu = this.electronService.remote.Menu.buildFromTemplate(
      this.menuTemplate
    );

    this.electronService.remote.Menu.setApplicationMenu(menu);
  }

  ngOnInit() {
    this.loadData();
    this.electronService.remote.globalShortcut.register(
      "CommandOrControl+Shift+D",
      () => {
        this.loadData();
      }
    );
  }

  loadData() {
    this.teamsService.getTeams().subscribe((data: any) => {
      this.teams = data;
      console.log(data);
      const notification = new this.electronService.remote.Notification({
        title: "Operación exitosa",
        body: "Datos cargados satisfactoriamente"
      });

      // notification.show();
    });
  }

  goToPage(page) {
    this.zone.run(() => {
      this.router.navigate([page]);
    });
  }
}
