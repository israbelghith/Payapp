import { Paiement } from './paiement.model';

export
 class
 Agent
{
    idU: number;
    matricule: string;
    nom: string;
    prenom: string;
    email: string;
    poste: string;
    adresse: string;
    etat: string;
    secteur: string;
    paiements: Paiement;
}
