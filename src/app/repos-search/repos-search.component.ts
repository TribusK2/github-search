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

  public repos$: Observable<Repo[]>;
  public searchForm: FormGroup;
  public touched = false;
  public isValid = true;

  constructor(
    private searchService: SearchService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    // Setup reactive form
    this.searchForm = this._formBuilder.group({
      searchControl: ['', Validators.required],
    })

    // Get data from GitHub API and reder it on template
    // this.searchService.getUserRepos("angular-university").subscribe(console.log);
    // this.searchService.getRepoBranches("angular-university", "complete-typescript-course").subscribe(console.log);
    // this.searchService.getUserReposList("TribusK2").subscribe(console.log);
  }

  /**
   * Check that form is valid and manage it depend on status
   * @param  {Event} event
   * @returns void
   */
  onSearch(event: Event): void {
    if (this.searchForm.valid) {
      // Get data form GitHub API
      this.touched = true;
      this.isValid = true;
      event.preventDefault();
      const userName = event.target[0].value;
      this.repos$ = this.searchService.getPseudoData(userName);
      // this.repos$ = this.searchService.getUserReposList(userName);
    }else{
      // Set validation info
      this.isValid = false;
    }
  }

}
