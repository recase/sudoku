import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-num-button',
  templateUrl: './num-button.component.html',
  styleUrls: ['./num-button.component.scss'],
})
export class NumButtonComponent implements OnInit {
  @Input() public buttonText!: number;
  @Output() private btnEvent: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public btnClick(): void {
    this.btnEvent.emit();
  }
}
