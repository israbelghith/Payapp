import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Agent } from '../model/agent.model';
import { Facture } from '../model/facture.model';
import { Paiement } from '../model/paiement.model';
import { PaiementService } from '../services/paiement.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
})
export class PaiementPage implements OnInit {

    // @Input() ;
    listeFacture: Facture[];
    totalMt: number;
    i: number;
    newPaiement = new Paiement();
    mode: string;
    newAgent = new Agent();
    idU: number;

    constructor(
      public alertController: AlertController,
      private modalController: ModalController,
      private navParams: NavParams,
      private router: Router,
      private paiementService: PaiementService,
     // private agentService: AgentService,
      private toast: ToastController,
      private dataService: DataService,
      private actionSheetCtrl: ActionSheetController
    ) {}

    ngOnInit() {
      console.table(this.navParams);
     // this.totalMt = this.navParams.data.paramID;
      this.listeFacture = this.navParams.data.paramTitle;
      console.log(this.listeFacture);

      let mt=0;
      for(let i=0; i< this.listeFacture.length; i++)
      {
          mt=mt+ this.listeFacture[i].montant;
          console.log(i, this.listeFacture[i].montant);
      }
        this.totalMt=mt;
    //   this. chercherAgent();
    }
  /*  chercherAgent() {
      this.agentService.chercherAgent(1)
      .subscribe(agt => { this.newAgent=agt;});
      console.log(this.newAgent);
    }*/

    async closeModal() {
      const onClosedData = 'Wrapped Up!';
      await this.modalController.dismiss(onClosedData);
    }

    async ajouterPaiement() {
      if (this.mode === '') {
        //Toast pr valider s'il ya une erreur
        const toast = await this.toast.create({
          message: 'Vous devez ins??rer un mode de paiement !',
          duration: 2000,
          color: 'danger',
          position: 'middle',
        });
        toast.present();
      } else {
        const dataTab = [
          {
            mode: this.mode,
            date: new Date(),
            etat: 'pay??',
            factures: this.listeFacture,
            totalMontant: this.totalMt,
            agent:this.newAgent
          },
        ];
        await this.paiementService.addPaiement(dataTab);
        //initialiser les inputs
        this.mode = '';
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Paiement Effectu??',
          subHeader: '',
          message:
            'votre ordre de paiement est effectu??e avec succ??s  <image src="../../assets/icon/success.jpeg"></image></ion-icon> ',
          buttons: ['OK'],//this.router.navigate(['/facture'])
        });
        await alert.present();
        ;
      }

    }

}
