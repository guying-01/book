import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';
import {Response} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Md5} from "ts-md5/dist/md5";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

    constructor(public http: HttpClient) {
    }
    private host = 'http://111.231.54.181/';

    login(user,password):Observable<string[]>{
        return this.getResponse(this.host + "index/login?user=" + user + "&password=" + Md5.hashStr(password));
    }

    bookType(type):Observable<string[]>{
      return this.getResponse(this.host + "homepage/bookTypeFilter?type=" + type);
    }

    showDetail(id,user,chapters=1):Observable<string[]>{
      return this.getResponse(this.host + "Detail/showDetail?book_id=" + id + "&user=" + user + "&chapters=" +chapters);
    }

    share(user,content,time,book_id,book):Observable<string[]>{
      return this.getResponse(this.host + "share?user=" + user + "&content=" + content + "&time=" + time + "&book_id=" + book_id + "&book=" + book);
    }

    getShareInfo():Observable<string[]>{
      return this.getResponse(this.host+"share/getShareInfo");
    }

    getUerInfo(user):Observable<string[]>{
      return this.getResponse(this.host + "user/getUserInfo?user=" + user);
    }

    changeUserInfo(user,nick_name):Observable<string[]>{
      return this.getResponse(this.host + "user/changeUserInfo?user=" + user + "&nick_name=" + nick_name);
    }
    /**
     * 全局获取HTTP请求
     * @author arires
     * @param {string} url
     * @returns {Observable<string[]>}
     */
    private getResponse(url: string): Observable<string[]> {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        return res || {};
    }

    private handleError(error: Response | any) {

      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
}
