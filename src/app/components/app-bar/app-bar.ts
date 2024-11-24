import { Component, inject, Input } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { ChevronLeft, LucideAngularModule } from "lucide-angular";



@Component({
  selector: "app-bar",
  standalone: true,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: "./app-bar.html",
})
export class AppBarComponent {

  readonly ChevronLeft = ChevronLeft;

  @Input({ required: true }) title!: string;

  @Input() subtitle: string = "";

  @Input() backLink?: string;

  @Input() createButton?: { label: string, link: string };

  keycloak = inject(KeycloakService);
  router = inject(Router);



  get username() {
    try {
      return this.keycloak.getUsername()
    } catch (e) {
      return null;
    }
  }

  login() {
    this.keycloak.login({
      redirectUri: window.location.origin
    });
  }

  async logout() {
    await this.keycloak.logout(window.location.origin);
  }

}