import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  firestore: Firestore = inject(Firestore);
  item$: Observable<any>;

  constructor( private router: Router){}


  newGame(){
    let game= new Game();
    const itemCollection = collection(this.firestore, 'games');
    addDoc(itemCollection, game.toJson())
    .then((gameInfo: any) => {
      this.router.navigateByUrl('/game/'+ gameInfo.id);
    })
   
  }

}
