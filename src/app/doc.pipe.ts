import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  constructor(private afs: AngularFirestore){}

  transform(value: any): Observable<any> {
    return this.afs.doc(value.path).valueChanges();
  }

}
