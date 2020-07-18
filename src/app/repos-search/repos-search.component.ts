import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { SearchService } from '../services/search.service';
import { Repo } from './models/repo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repos-search',
  templateUrl: './repos-search.component.html',
  styleUrls: ['./repos-search.component.scss']
})
export class ReposSearchComponent implements OnInit {

  repos$: Observable<Repo[]>;
  public searchForm: FormGroup;

  constructor(
    private searchService: SearchService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.searchForm = this._formBuilder.group({

      searchControl: ['', Validators.required],

    })

    // this.searchService.getUserRepos("angular-university").subscribe(console.log);
    // this.searchService.getRepoBranches("angular-university", "complete-typescript-course").subscribe(console.log);
    // this.searchService.getUserReposList("TribusK2").subscribe(console.log);
    this.searchService.getPseudoData('').subscribe(console.log)
  }

  onSearch(event: Event) {
    if (this.searchForm.valid) {
      event.preventDefault();
      const userName = event.target[0].value;



      console.log(userName);
      this.repos$ = this.searchService.getPseudoData(userName);

    }
  }

}
