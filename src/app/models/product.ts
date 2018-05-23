import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from 'angularfire2/firestore/document/document';
import { Category } from './category';
import * as firebase from 'firebase';

export interface Product{
    key: string;
    title: string;
    price: number;
    category: firebase.firestore.DocumentReference;
    imageUrl: string;
}