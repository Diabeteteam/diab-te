import { Component, OnInit } from '@angular/core';

class NavHome extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Back Button</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
      <ion-item onclick="navigateForward()">
        Navigate Forward
      </ion-item>
      </ion-list>
    </ion-content>
  `;
    }
  }