import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ArticlePage} from "../article/article"

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public data:string;
  public level:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.data = navParams.get('msg');
    this.level = navParams.get('data')['level'];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  showBook(id){
    this.navCtrl.push(ArticlePage,{
      book_id:id
    });
  }

}
