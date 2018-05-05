import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MallPage } from '../mall/mall';
import { MessagePage } from '../message/message';
import { PersonalCenterPage } from '../personal-center/personal-center';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  home = HomePage;
  mall = MallPage;
  message = MessagePage;
  personalCenter = PersonalCenterPage;

  constructor() {

  }

}
