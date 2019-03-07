import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeamsComponent } from "./components/teams/teams.component";
import { PlayersComponent } from "./components/players/players.component";
import { CalendarsComponent } from "./components/calendars/calendars.component";
import { StadiumsComponent } from "./components/stadiums/stadiums.component";

const routes: Routes = [
  { path: "", component: TeamsComponent },
  { path: "equipos", redirectTo: "" },
  { path: "jugadores", component: PlayersComponent },
  { path: "jugadores/:id", component: PlayersComponent },
  { path: "calendarios", component: CalendarsComponent },
  { path: "estadios", component: StadiumsComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
