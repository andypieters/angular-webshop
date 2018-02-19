import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
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
