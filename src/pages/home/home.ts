import { Component } from '@angular/core';
import { NavController  , LoadingController , ToastController} from 'ionic-angular';
import { ArticlePage} from "../article/article";
import {BaseUi} from "../../common/baseui";
import { RestProvider } from "../../providers/rest/rest";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage extends BaseUi{

  public  errorMessage:any;
  public  dataInfo:any;
  public  searchData = [];

  public  keywords:string;
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public rest:RestProvider
              ) {
    super();
  }

  ionViewDidEnter(){
    this.showMessage();
  }

  showMessage(){
    var loading = super.showLoading(this.loadingCtrl,"获取中...");
    this.rest.getShareInfo().subscribe(
      (val)=>{
        console.log(val);
        loading.dismiss();
        this.dataInfo = val['msg'];
        this.searchData = val['msg'];
      },
      error =>{
        loading.dismiss();
        this.errorMessage = <any>error;
      }
    )
  }

  like(){

  }

  goToCommentPage(){

  }

  goToDetail(book_id){
    this.navCtrl.push(ArticlePage,{
      book_id:book_id
    })
  }

  onInput(e){
    const that=this;
    setTimeout(function () {
      let keywords = that.keywords;
      let newData = [];
      if(keywords){
        for(var i=0;i<that.dataInfo.length;i++){
          if(that.dataInfo[i]['comment'].indexOf(keywords) != -1){
              newData.push(that.dataInfo[i]);
          }
        }
          that.searchData = newData;
      }
      else{
        that.searchData = that.dataInfo;
      }
    },500);
    console.log(that.searchData)
    //this.showMessage();
  }

}
