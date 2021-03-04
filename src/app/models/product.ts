import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/firestore/document/document';
import { Category } from './category';
import firebase from 'firebase/app';

export interface Product {
    key: string;
    title: string;
    price: number;
    category: firebase.firestore.DocumentReference;
    imageUrl: string;
    imageRef: firebase.storage.Reference;
}