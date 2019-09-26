import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  tiles: any[];
  player: string;
  winner: string;
  count: number;
  gameOver: boolean;
  x_wins: number;
  o_wins: number;

  constructor() { }

  ngOnInit() {
    this.x_wins = 0
    this.o_wins = 0;
    this.startNewGame();
  }

  startNewGame(){
    this.tiles = Array(9).fill(null);
    this.count = 0;
    this.changePayer();
    this.winner = null;
    this.gameOver = false;
  }

  changePayer(){
    if(!this.player || this.player === 'O')
        this.player = 'X';
      else
      this.player = 'O';
  }

  playerMove(index: number){
    if(this.gameOver)
      return;

    if(!this.tiles[index]){
      this.tiles.splice(index, 1, this.player);
      this.count += 1;
    }

    this.winner = this.calculateMove();
    if(this.winner == 'X')
        this.x_wins += 1;
    else if(this.winner == 'O')
      this.o_wins += 1;
    else{
      if(this.count == 9)
        this.gameOver = true;
      else
        this.changePayer();
    }
  }

  calculateMove(){
    const win_lines = [
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6]
    ];

    for(let i=0; i<win_lines.length; i++){
      const [a,b,c] = win_lines[i];
      if(this.tiles[a] && this.tiles[a]===this.tiles[b] && this.tiles[b]===this.tiles[c]){
        this.gameOver = true;
        return this.tiles[a];
      }
    }
    return null;
  }
}
