import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-league-dialog',
  templateUrl: './new-league-dialog.component.html',
  styleUrls: ['./new-league-dialog.component.scss']
})
export class NewLeagueDialogComponent implements OnInit {

	yesbgc: string;
	nobgc: string;
	yestxt: string;
	notxt: string;

  constructor(private dialogRef: MatDialogRef<NewLeagueDialogComponent>) { }

  ngOnInit() {
  }

  onYes() {
  	this.yesbgc = "#777777";
  	this.yestxt = "white";
  	this.nobgc = "#C4C4C4";
  	this.notxt = "black";
  }

  onNo() {
  	this.nobgc = "#777777";
  	this.notxt = "white";
  	this.yesbgc = "#C4C4C4";
  	this.yestxt = "black";
  }

  onNext() {
  	this.dialogRef.close();
  }

  onClose() {
  	this.dialogRef.close();
  }

}
