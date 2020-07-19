import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError, empty } from 'rxjs';
import { concatMap, map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Repo } from '../repos-search/models/repo.model';
import { Branch } from '../repos-search/models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  /**
   * Get all repos with branches details of GitHub user
   * @param  {string} userName
   * @returns Observable
   */
  getUserReposList(userName: string): Observable<Repo[]> {
    return this.getUserRepos(userName).pipe(
      concatMap(repos => {
        if (repos.length) {
          const filteredRepos = repos.filter(repo => !repo.fork);
          const getBranches$: Observable<Repo>[] = filteredRepos.map(repo => this.getRepoBranches(userName, repo.name).pipe(
            map(res => {
              repo.branches = res;
              return repo;
            })
          ));
          return forkJoin(...getBranches$);
        }
        return throwError({
          custom: true,
          message: 'No repository for this user!',
          status: 404
        })
      }),
      catchError(err => {
        if (isDevMode()) {
          console.log(err);
        }

        // Handle error message
        let errorMessage = "An unknow error occurred!";
        let errorType = "Unknow error!";

        if (err && err.custom) {
          errorMessage = err.message;
          errorType = `Error: ${err.status}!`;
        }
        if (err && err.status === 403 && !err.custom) {
          errorMessage = "API rate limit exceeded. Please wait 60 min or use VPN to send another request!";
          errorType = `Error: ${err.status}!`;
        }
        if (err && err.status === 404 && !err.custom) {
          errorMessage = "No such user was found!";
          errorType = `Error: ${err.status}!`;
        }

        // Display error notification
        if (err) {
          this.toastr.error(errorMessage, errorType, {
            positionClass: 'toast-bottom-center',
            timeOut: 8000,
          });
        }
        return throwError(err);
      })
    )
  }

  /**
   * Get all repos of GitHub user
   * @param  {string} userName
   * @returns Observable
   */
  getUserRepos(userName: string): Observable<Repo[]> {
    return this.http.get<Repo[]>(`${this.apiUrl}/users/${userName}/repos`);
  }


  /**
   * Get all branches of GitHub repository
   * @param  {string} userName
   * @param  {string} repoName
   * @returns Observable
   */
  getRepoBranches(userName: string, repoName: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}/repos/${userName}/${repoName}/branches`);
  }

}
