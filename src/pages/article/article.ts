import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,ModalController, LoadingController, ToastController, Content} from 'ionic-angular';
import { RestProvider } from "../../providers/rest/rest";
import { Storage } from "@ionic/storage";
import { BaseUi } from "../../common/baseui";
import { SharePage } from "../share/share";

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})

export class ArticlePage extends BaseUi{
  @ViewChild(Content) cont: Content;
  book_id:string;
  user:string;
  errorMessage:any;
  public data :string;
  public book :string;
  public content:any;
  public className:string = "normal";
  chapters:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public modalCtrl : ModalController,
              public rest: RestProvider,
              public storage: Storage) {
    super();
  }

  ionViewDidEnter() {
    this.getBook();
    //获取用户设置
    this.storage.get('font').then((val)=>{
      switch (val){
        case "0" : this.className = 'normal';
        break;
        case "1" : this.className = 'middle';
          break;
        case "2" : this.className = 'big';
          break;
        default :  this.className = "normal";
      }
    });
  }

  getBook(chapters=1){
    var chapters:number = this.navParams.get('chapters') ? this.navParams.get('chapters') : chapters;
    this.chapters = chapters;
    this.storage.get('user').then((val)=>{
      if(val){
        this.getContent(val,chapters);
      }
      else{
        super.showToast(this.toastCtrl,'请登录。');
        this.navCtrl.pop();
      }
    });

  }

  getContent(val,chapters){
    var loading = super.showLoading(this.loadingCtrl, '获取中...');
    let book_id = this.navParams.get('book_id');
    this.book_id = book_id;
    this.rest.showDetail(book_id,val,chapters)
      .subscribe(
        f=>{
          loading.dismiss();
          if(f['status'] == 0){
            if(f['msg'].length != 0){
              this.cont.scrollToTop(100);
              this.data = f['msg'][0];
              this.content = f['msg'][0]['content'];
              this.book = f['msg'][0]['book'];
            }
            else{
              super.showToast(this.toastCtrl,'抱歉，未找到相关章节。');
              this.chapters --;
            }
          }
          else{
            super.showToast(this.toastCtrl,f['msg']);
          }
        },
        error => {
          loading.dismiss();
          this.errorMessage = <any>error;
        }
      )
  }

  swipeEvent(event){
    //左滑
    if(event.deltaX < 0){
      this.chapters ++;
    }
    else{
      this.chapters <=1 ? super.showToast(this.toastCtrl,'当前已经是第一章。') : this.chapters --;
    }
    this.getBook(this.chapters);
  }

  addBookMark(){
    this.storage.get('bookmark').then(d=>{
      if(!d){
        this.storage.set('bookmark',[{
          'book':this.book,
          'book_id':this.book_id,
          'chapters':this.chapters
        }])
      }
      else{
        for(var i=0;i<d.length;i++){
          if(d[i]['book_id'] == this.book_id && d[i]['chapters'] == this.chapters){
            return super.showToast(this.toastCtrl,'抱歉，您在当前位置已有书签')
          }
        }
        d.push({
          'book':this.book,
          'book_id':this.book_id,
          'chapters':this.chapters
        });
        this.storage.set('bookmark',d);
        return super.showToast(this.toastCtrl,'添加书签成功')
      }
    })
  }

  showModal(){
    this.modalCtrl.create(SharePage,{
      "book_id":this.book_id,
      "book":this.book,
    }).present();

  }


}
