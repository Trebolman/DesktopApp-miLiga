import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ElectronService } from "../../providers/electron.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  title = "Equipos";
  constructor(
    private breakpointObserver: BreakpointObserver,
    public electronService: ElectronService
  ) {}

  updateTitle(title) {
    this.title = title;
  }

  closeWindow() {
    this.electronService.remote.getCurrentWindow().close();
  }

  resizeWindow(action) {
    const currentWindow = this.electronService.remote.getCurrentWindow();

    switch (action) {
      case "min":
        currentWindow.minimize();
        break;
      case "max":
        currentWindow.maximize();
        break;
      case "full":
        const status = currentWindow.isFullScreen();
        currentWindow.setFullScreen(!status);
        break;
    }
  }

  goToLink() {
    const apiUrl = "https://electronjs.org/docs/";
    this.electronService.remote.shell.openExternal(apiUrl);
  }
}
