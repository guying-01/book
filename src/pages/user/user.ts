import {Component} from '@angular/core';
import {NavController, NavParams,ViewController, LoadingController, ToastController} from 'ionic-angular';
import {HeadfacePage} from "../headface/headface";
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from "@ionic/storage";
import {BaseUi} from "../../common/baseui";

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUi{

  public nick_name:string = "加载中...";
  public errorMessage:any;
  public url:string;
  public user:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl:ViewController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public storage:Storage,
              public rest:RestProvider
              ) {
    super();
  }

  ionViewDidLoad() {
    console.log(1);
    this.getUserInfo();
  }

  getUserInfo(){
    this.storage.get('user').then((f)=>{
      if(f){
        this.user = f;
        var loading = super.showLoading(this.loadingCtrl,'加载中...');
        this.rest.getUerInfo(f).subscribe((val)=>{
            loading.dismiss();
            if(val['status'] == 0){
              this.nick_name = val['msg']['nick_name'] ?  val['msg']['nick_name'] : f;
              this.url = val['msg']['upload_time'] ? 'http://111.231.54.181/static/uploads/headface/' + val['msg']['upload_time'] + '/' + val['msg']['url'] : './assets/imgs/avatar.jpg';
            }
          },
          error => {
            this.errorMessage = <any>error;
            loading.dismiss();
          });
      }
    });
  }

  changeUserInfo(){
    var loading = super.showLoading(this.loadingCtrl,'修改中...');
    this.storage.get('user').then((f)=>{
      if(f){
        this.rest.changeUserInfo(f,this.nick_name).subscribe((val)=>{
            loading.dismiss();
            if(val['status'] == 0){
              super.showToast(this.toastCtrl,'昵称修改成功。');
              this.nick_name = val['msg']['nick_name'];
            }
            else{
              super.showToast(this.toastCtrl,val['msg']);
            }
          },
          error => {
            this.errorMessage = <any>error;
            loading.dismiss();
          });
      }
    });

  }

  goToHeadface(){
    this.navCtrl.push(HeadfacePage);
  }

  logOut() {
    this.storage.remove('User');
    this.viewCtrl.dismiss();
  }

}
