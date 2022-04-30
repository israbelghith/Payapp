import { PaiementService } from './../services/paiement.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Facture } from '../model/facture.model';
import { ModalController } from '@ionic/angular';
import { PaiementPage } from '../paiement/paiement.page';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.page.html',
  styleUrls: ['./facture.page.scss'],
})
export class FacturePage implements OnInit {
listData= [];
reference: number;
factlist= [];
secteur: string;


  constructor(private dataService: DataService,public modalController: ModalController,private paiementService: PaiementService) {

  }

  ngOnInit() {
this.chercher();

  }
async chercher(){
  this.listData= await this.paiementService.rescue('myFactureListe');
}
  async addData(){
this.dataService.chercherParSecteur(this.secteur)
  .subscribe(arg => this.listData = arg);

// eslint-disable-next-line @typescript-eslint/prefer-for-of
for(let i=0; i<this.listData.length; i++)
{
  await this.dataService.addData(this.listData[i]);
  console.log('la liste :'+i,this.listData);
}
this.listData= await this.dataService.getData();
  }

  async removeData(index){
    this.dataService.removeData(index);
    this.listData.splice(index,1);
  }


async openModal() {
  this.factlist = this.listData.filter((x) => x.isselected === true);
console.log(this.factlist);
  const modal = await this.modalController.create({
    component: PaiementPage,
    componentProps: {
//      totalMt: this.mts,
      paramTitle: this.factlist
    }
  });

  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned !== null) {
   //   this.dataReturned = dataReturned.data;
      //alert('Modal Sent Data :'+ dataReturned);
    }
  });

  return await modal.present();
}

}
