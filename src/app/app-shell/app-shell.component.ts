import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  template: `
  <img class="loading-indicator" src="/assets/loading.gif" alt="Loading..." />
  `,
  styles: [`
    .loading-indicator {
      height: 300px;
      margin: 0 auto;
    }
    `]
})
export class AppShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
