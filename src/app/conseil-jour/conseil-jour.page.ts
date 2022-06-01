import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conseil-jour',
  templateUrl: './conseil-jour.page.html',
  styleUrls: ['./conseil-jour.page.scss'],
})
export class ConseilJourPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    // autoplay:true,
  }

}
