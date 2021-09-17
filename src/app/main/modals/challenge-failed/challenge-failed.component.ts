import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge-failed',
  templateUrl: './challenge-failed.component.html',
  styleUrls: ['./challenge-failed.component.scss'],
})
export class ChallengeFailedComponent implements OnInit {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<ChallengeFailedComponent>
  ) {}

  ngOnInit(): void {}

  public navigateToMenu() {
    this.dialogRef.close();
    this.router.navigate(['']);
  }
}
