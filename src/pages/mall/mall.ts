import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController,ViewController,LoadingController, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {BaseUi} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {DetailPage} from "../detail/detail";

/**
 * Generated class for the MallPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mall',
  templateUrl: 'mall.html',
})
export class MallPage extends BaseUi{
  public checkBook :boolean = true;
  public checkMusic :boolean = false;
  public checkVideo :boolean = false;
  errorMessage:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl:MenuController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest: RestProvider,
              public viewCtrl:ViewController) {
            super();
            menuCtrl.enable(true);
  }

  ionViewDidLoad() {

    console.log(this.viewCtrl.getContent());
  }

  showDetail(type){
    var loading = super.showLoading(this.loadingCtrl, '获取中...');
    this.rest.bookType(type)
      .subscribe(
        f=>{
          loading.dismiss();
          this.navCtrl.push(DetailPage,f);
        },
        error=>this.errorMessage=<any>error
      )
  }

}


