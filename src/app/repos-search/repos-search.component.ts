import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { SearchService } from '../services/search.service';
import { Repo } from './models/repo.model';

@Component({
  selector: 'app-repos-search',
  templateUrl: './repos-search.component.html',
  styleUrls: ['./repos-search.component.scss']
})
export class ReposSearchComponent implements OnInit {

  public repos$: Observable<Repo[]>;
  public searchForm: FormGroup;
  public isValid = true;
  public pending = false;

  constructor(
    private searchService: SearchService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    // Setup reactive form
    this.searchForm = this._formBuilder.group({
      searchControl: ['', Validators.required],
    })

  }

  /**
   * Check that form is valid and manage it depend on status
   * @param  {Event} event
   * @returns void
   */
  onSearch(event: Event): void {
    if (this.searchForm.valid) {
      // Set up init value of function
      this.pending = true;
      this.isValid = true;
      event.preventDefault();
      const userName = event.target[0].value;

      // Get data form GitHub API
      this.repos$ = this.searchService.getUserReposList(userName)
      .pipe(
        // Turn of spinner
        tap(() => this.pending = false),
        catchError(err => {
          this.pending = false
          return throwError(err);
        })
      );
    } else {
      // Turn of spinner
      this.pending = false;

      // Display validation info
      this.isValid = false;
      this.toastr.error('User name is required!', 'Validation error!', {
        positionClass: 'toast-bottom-center',
        timeOut: 3000
      });
    }
  }

}
