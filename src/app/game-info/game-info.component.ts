import { Component, Input , OnChanges} from '@angular/core';


@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnChanges {

  cardAction = [
    { title: 'Waterfall', description: 'Everyone should keep drinking until the person who picked the card stops. So who knows how long you will be going for!' },
    { title: 'You', description: 'You deside who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot' },
    { title: 'Category', description: 'Pick a category such as football and you go in a circle and everyone has to say a word that fits with football such as: touchdown, field goal, USC. Whoever messes up, drinks.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeatsthe dance move and adds a second one and so on' },
    { title: 'Chicks', description: 'All girls drink' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around' },
    { title: 'Thumbmaster', description: 'When you put your thumb on the table everyone must follow and whomever is last must drink. You are the thumb master till someone else picks a five.' },
    { title: 'Men', description: 'All men drink' },
    { title: 'Quitzmaster', description: 'Go around in a circle and you have to keep asking questions to each other. Doesn’t matter what the question is, as long as its a question. Whoever messes up and does not say a question, drinks.' },
    { title: 'Never have i ever ...', description: 'Say something you never did. Everyone who did it has to drink' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rules' },
  ]

  title = '';
  description = '';
  @Input() card: string;

  ngOnChanges(): void {
    if (this.card) {
      console.log('current card:', this.card)
    let cardnumber = +this.card.split('_')[1];
    this.title = this.cardAction[cardnumber -1].title;
    this.description = this.cardAction[cardnumber -1].description;
    }
  }
}
