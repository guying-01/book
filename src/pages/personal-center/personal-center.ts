import { Component } from '@angular/core';
import {  NavController, NavParams,ModalController,ViewController, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { UserPage } from "../user/user";
import { Storage } from "@ionic/storage";
import { BaseUi } from "../../common/baseui";
import { BookmarkPage } from "../bookmark/bookmark";
import { RestProvider } from "../../providers/rest/rest";
import {SettingProvider} from "../../providers/setting/setting";

/**
 * Generated class for the PersonalCenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-personal-center',
  templateUrl: 'personal-center.html',
})

export class PersonalCenterPage extends BaseUi{
  public notLogin : boolean = true;
  public logined : boolean = false;
  public bookmark:any;
  public font:string;
  public nick_name:string;
  public errorMessage:any;
  public url:string;
  selectedTheme: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl : ModalController,
              public viewCtrl:ViewController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public storage:Storage,
              public rest:RestProvider,
              public settings:SettingProvider) {
    super();
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }


  changeFonts(){
    this.storage.set('font',this.font);
  }
  showModal(){
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(this.getUserInfo);
    modal.present();
  }

  showBookmark(){
    let modal = this.modalCtrl.create(BookmarkPage);
    modal.present();
  }

  ionViewDidEnter(){
    this.getUserInfo();
  }

  getUserInfo(){
    this.storage.get('user').then((f)=>{
      if(f){
        var loading = super.showLoading(this.loadingCtrl,'加载中...');
        this.rest.getUerInfo(f).subscribe((val)=>{
          loading.dismiss();
          if(val['status'] == 0){
            this.nick_name = val['msg']['nick_name'] ?  val['msg']['nick_name'] : f;
            this.url = val['msg']['upload_time'] ? 'http://111.231.54.181/static/uploads/headface/' + val['msg']['upload_time'] + '/' + val['msg']['url'] : './assets/imgs/avatar.jpg';
            this.notLogin = false;
            this.logined = true;
          }
        },
        error => {
          this.errorMessage = <any>error;
          this.notLogin = true;
          this.logined = false;
          loading.dismiss();
        });
      }
      else{
        this.notLogin = true;
        this.logined = false;
      }
    });
    //初始化字体
    this.storage.get('font').then((f)=>{
      if(f){
        this.font = f;
      }
      else{
        this.font = '0';
      }
    });
  }

  gotoUserPage(){
    this.navCtrl.push(UserPage);
  }

  toggleChangeTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    }
    else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

}
