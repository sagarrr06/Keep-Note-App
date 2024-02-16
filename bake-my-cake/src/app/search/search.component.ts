import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output()
  searchResult: EventEmitter<string> = new EventEmitter<string>();
  searchText: string = '';
  constructor() {}

  ngOnInit(): void {}
  searchNote() {
    this.searchResult.emit(this.searchText);
  }
}
