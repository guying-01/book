import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, LoadingController, ToastController} from 'ionic-angular';
import {BaseUi} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {Storage} from "@ionic/storage";
import {RegisterPage} from "../register/register";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage extends BaseUi {
    user: any;
    password: string;
    errorMessage:any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                public loadingCtrl: LoadingController,
                public toastCtrl: ToastController,
                public rest: RestProvider,
                public storage: Storage) {
        super();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    login() {
        var loading = super.showLoading(this.loadingCtrl, '登陆中...');
        this.rest.login(this.user, this.password)
            .subscribe(
                f => {
                    loading.dismiss();
                    if (f['status'] == '0') {
                        this.storage.set('user',this.user);
                        this.viewCtrl.dismiss();
                    }
                    else {
                        super.showToast(this.toastCtrl, f['msg']);
                    }
                },
                error => this.errorMessage = <any>error);
    }

    register(){
        this.navCtrl.push(RegisterPage);
    }
}
    