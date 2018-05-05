import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, LoadingController, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {BaseUi} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage extends BaseUi {
  public book_id: number;
  public book: string;
  public content: string;
  public user: string;
  public dateTime: Date;
  public errorMessage: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public storage: Storage,
              public rest: RestProvider) {
    super();
  }

  ionViewDidLoad() {
    this.book_id = this.navParams.get('book_id');
    this.book = this.navParams.get('book');
    this.storage.get('user').then(val => {
      this.user = val;
    });
    this.dateTime = new Date();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  share() {
    var loading = super.showLoading(this.loadingCtrl, "分享中...");
    if (!this.content) {
      return super.showToast(this.toastCtrl, "分享内容不能为空");
    }
    else {
      this.rest.share(this.user, this.content, this.dateTime, this.book_id, this.book).subscribe(
        f => {
          loading.dismiss();
          super.showToast(this.toastCtrl, f['msg']);
          this.viewCtrl.dismiss();
        },
        error => {
          loading.dismiss();
          super.showToast(this.toastCtrl, '分享失败');
          this.errorMessage = <any>error;
        }
      )
    }
  }

}
