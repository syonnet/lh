import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar-d',
  templateUrl: './navbar-d.component.html',
  styleUrls: ['./navbar-d.component.css']
})
export class NavbarDComponent {
  authService: any;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadScript('/assets/script/script.js');
  }

  private loadScript(scriptUrl: string) {
    const script = document.createElement('script');
    script.src = scriptUrl;
    document.head.appendChild(script);
  }
  logout() {
    this.authService.logout();
    console.log('Cerrando sesión...');
    window.location.href = '/home'; 
  }



  
}
