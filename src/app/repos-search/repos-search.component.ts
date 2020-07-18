import { Component, OnInit } from '@angular/core';

import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-repos-search',
  templateUrl: './repos-search.component.html',
  styleUrls: ['./repos-search.component.scss']
})
export class ReposSearchComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getUserRepos("angular-university").subscribe(console.log);
    this.searchService.getRepoBranches("angular-university", "complete-typescript-course").subscribe(console.log);
  }

}
