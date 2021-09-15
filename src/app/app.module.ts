import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { SudokuComponent } from './main/components/sudoku/sudoku.component';
import { CellComponent } from './main/components/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    SudokuComponent,
    CellComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
