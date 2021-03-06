import { Component, OnInit } from '@angular/core';
import { Model } from '../model';
import { ToDoItem } from '../todoitem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  displayAll: boolean = true;
  constructor() {
    this.model.items = JSON.parse(localStorage.getItem('newitems'));
  }
  message = '';
  style = 'color:green';
  model = new Model();
  getName() {
    return this.model.name;
  }
  ChangeColor(tbody: any, style: any) {
    for (let i = 0; i < tbody.children.length; i++) {
      let element = tbody.children[i];
      element.style.backgroundColor = 'white';
    }
    style.backgroundColor = 'springgreen';
  }
  addItem(value: string) {
    // this.message=value;
    // console.log(value);
    if (value != '') {
      this.model.items.push(new ToDoItem(1, value, false));
      this.saveToStorage();
      this.message = '';
      value = '';
    } else {
      alert('Please input info');
    }
  }
  saveToStorage() {
    localStorage.setItem('newitems', JSON.stringify(this.model.items));
  }
  getItems() {
    if (this.displayAll) {
      return this.model.items;
    }
    return this.model.items.filter((item) => item.action == false);
  }
  getToDoCount() {
    return this.model.items.filter((i) => i.action == true).length;
  }
  GetSpecialClasses() {
    return {
      disabled: this.message.length == 0,
      'btn-outline-secondary': this.message.length == 0,
      'btn-outline-primary': this.message.length > 0,
    };
  }
}
