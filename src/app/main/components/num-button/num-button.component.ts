import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-num-button',
  templateUrl: './num-button.component.html',
  styleUrls: ['./num-button.component.scss'],
})
export class NumButtonComponent implements OnInit {
  @Input() buttonText!: number;

  constructor() {}

  ngOnInit(): void {}
}
