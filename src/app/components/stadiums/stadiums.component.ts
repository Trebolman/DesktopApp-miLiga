import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TeamsService } from "../../services/teams.service";
import { ElectronService } from "../../providers/electron.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-stadiums",
  templateUrl: "./stadiums.component.html",
  styleUrls: ["./stadiums.component.scss"]
})
export class StadiumsComponent implements OnInit {
  teams: any[];
  imageUrl = "https://via.placeholder.com/200x200?text=Foto+de+estadio";
  @ViewChild("logo") logoRef: ElementRef;

  filePath = "";

  stadiumForm = this.fb.group({
    stadiumName: [null, Validators.required],
    capacity: [null, Validators.required],
    team: [null, Validators.required],
    country: [null, Validators.required]
  });

  countries = [
    { name: "México" },
    { name: "Perú" },
    { name: "Estados Unidos" },
    { name: "Austria" },
    { name: "Alemania" }
  ];

  constructor(
    private fb: FormBuilder,
    private teamsService: TeamsService,
    private electronService: ElectronService,
    private router: Router,
    private zone: NgZone
  ) {
    const menu = new this.electronService.remote.Menu();

    const currentWindow = this.electronService.remote.getCurrentWindow();

    menu.append(
      new this.electronService.remote.MenuItem({
        label: "Abrir archivo",
        click: () => {
          this.openFile();
        }
      })
    );

    menu.append(
      new this.electronService.remote.MenuItem({
        label: "Equipos",
        click: () => {
          this.zone.run(() => {
            this.router.navigate(["equipos"]);
          });
        }
      })
    );

    currentWindow.webContents.on("context-menu", () => {
      menu.popup({});
    });
  }

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe((data: any) => {
      this.teams = data;
    });

    this.logoRef.nativeElement.addEventListener("dragenter", () => {
      this.logoRef.nativeElement.style.border = "2px solid red";
    });

    this.logoRef.nativeElement.addEventListener("dragover", event => {
      event.preventDefault();
    });

    this.logoRef.nativeElement.addEventListener("dragleave", () => {
      this.logoRef.nativeElement.style.border = "none";
    });

    this.logoRef.nativeElement.addEventListener("drop", event => {
      this.logoRef.nativeElement.style.border = "none";

      this.displayImage(event.dataTransfer.files[0].path);
    });
  }

  onSubmit() {
    alert("Thanks!");
  }

  openFileManager() {
    const userPath = this.electronService.remote.app.getPath("pictures");

    this.electronService.remote.shell.showItemInFolder(userPath);

    // const currentWindow = this.electronService.remote.getCurrentWindow();

    // this.electronService.remote.dialog.showOpenDialog(
    //   currentWindow,
    //   {
    //     title: "Elegir archivo",
    //     defaultPath: "/Users/in/Pictures",
    //     buttonLabel: "Abrir archivo",
    //     filters: [{ name: "Images", extensions: ["jpg", "png"] }]
    //   },
    //   filepaths => {
    //     console.log(filepaths);
    //     if (!!filepaths) {
    //       this.displayImage(filepaths[0]);
    //     }
    //   }
    // );
  }

  displayImage(path) {
    this.filePath = path;
    this.imageUrl =
      "data:image/jpg;base64," +
      this.electronService.fs.readFileSync(path).toString("base64");
  }

  openFile() {
    this.electronService.remote.shell.openItem(this.filePath);
  }
}
