import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { ArticlePage } from  "../article/article";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the BookmarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {
  public bookmark:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public storage:Storage) {
  }

  ionViewDidEnter(){
    this.storage.get('bookmark').then(d=>{
      console.log(d);
      this.bookmark = d;
    })
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotoDetail(index){
    this.storage.get('bookmark').then(d=>{
      this.navCtrl.push(ArticlePage,{
        book_id:d[index]['book_id'],
        chapters:d[index]['chapters']
      })
    });

  }

  delBookmark(index){
    this.storage.get('bookmark').then(d=>{
      d.splice(index,1);
      this.storage.set('bookmark',d);
      this.bookmark = d;
    })
  }

}
