import { Observable } from 'rxjs/Observable';
import { AngularFirestoreDocument } from 'angularfire2/firestore/document/document';
import { Category } from './category';
export interface Product{
    key: string;
    title: string;
    price: number;
    category: AngularFirestoreDocument<Category>;
    category$: Observable<Category>;
    imageUrl: string;
}