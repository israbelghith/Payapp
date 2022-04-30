import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage';
import { Observable } from 'rxjs';
import { Facture } from '../model/facture.model';
const STORAGE_KEY = 'myFactureListe';
const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiURL?: string = 'http://192.168.1.123:8080/caisses/facture';

  constructor(private storage: Storage,private http: HttpClient) {
  this.init();
  }

 async  init(){
    console.log('init');
   // await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    console.log('done');
  }

  getData()
  {
    console.log('get data');
    return this.storage.get(STORAGE_KEY) || [];
  }

  async addData(item){
    const storedData= await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }
  async addPaiement(value: any)
  {
    // eslint-disable-next-line prefer-const
    let id = await this.storage.length() + 1;
    await this.storage.set(id.toString(), value);
  }
  async removeData(index){
    const storedData= await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY, storedData);
  }


  chercherParSecteur(secteur: string): Observable<Facture[]>{
  return this.http.get<Facture[]>(this.apiURL+'/secteur/'+secteur,httpOptions);
  }


}
