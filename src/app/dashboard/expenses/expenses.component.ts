import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  user;
  constructor() {

    this.user=JSON.parse(localStorage.getItem('user'))[0]
  }

  ngOnInit() {
  }

}
