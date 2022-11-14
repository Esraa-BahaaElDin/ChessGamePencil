import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  MoveChange,
  NgxChessBoardComponent
} from 'ngx-chess-board';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-iframe-one',
  templateUrl: './iframe-one.component.html',
  styleUrls: ['./iframe-one.component.css'],
})
export class IframeOneComponent implements OnInit, AfterViewInit {

  constructor() {}

  @ViewChild('board', { static: false }) board: NgxChessBoardComponent | any;
  @Output() moveEvent = new EventEmitter<any>();
  @Input() newGameFlag: Subject<boolean> | any;
  @Input() moveIFrameOne: Subject<MoveChange> | any;
  moveHistory:any;

  moveItem(move: MoveChange): void {
    this.moveEvent.emit(move);
  }

  showMove() {
    this.moveHistory = JSON.stringify(this.board.getMoveHistory());
    console.log(this.moveHistory);
  }

  ngOnInit(): void {
    this.moveIFrameOne.subscribe( (move:any) => {
      this.board?.setPGN(move?.pgn);
      this.board?.setFEN(move?.fen);    
      this.board.reverse();
    });

    this.newGameFlag.subscribe((el:any) => {    
      this.board?.reset();
      this.board.reverse();
    })
  }

  ngAfterViewInit() {
    this.board.reverse();
  }
}
