import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  game: Game;
  item$: Observable<any>;
  firestore: Firestore = inject(Firestore);
  gameId;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
 

  }
  async ngOnInit() {
    this.newGame();
    this.route.params.subscribe((params:any) => {
      this.gameId = params['id'];
      const docRef = doc(this.firestore,'games',this.gameId);
      this.item$ = docData(docRef)
      this.item$.subscribe((game) => {
        console.log('game Update', game);
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCards = game.playedCards;
      this.game.players = game.players;
      this.game.stack = game.stack;
      this.game.currentCard = game.currentCard;
      this.game.pickCardAnimation = game.pickCardAnimation;
      })
    })

  }


  newGame() {
    this.game = new Game();
    console.log(this.game)

  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard)
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0)
        this.game.players.push(name);
        this.saveGame();
    });
  }


  saveGame(){
    const docRef = doc(this.firestore,'games',this.gameId);
    updateDoc(docRef, this.game.toJson());
  }

}
