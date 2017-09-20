import { Headers, Http , Response, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
@Injectable()
export class PostService {
   url = 'http://172.23.238.209:8080/hackathon' ;
  constructor(private http: Http) { }


  create(userdata: any): Promise<any> {
    console.log('create function running ');
    console.log(this.url);
    // this.x=JSON.stringify({userdata});
    console.log(userdata);

    return this.http
      .post(this.url, userdata)
      .toPromise()
       .then(
         res => {
           res.json(); console.log(res.json() );
         }
        )
       .catch(this.handleErrorPromise);
  }

    private handleErrorPromise (error: Response | any) {
      console.error(error.message || error);
      console.log('error found');

      return Promise.reject(error.message || error);
    }

}
