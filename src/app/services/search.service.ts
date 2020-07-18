import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

import { Repo } from '../repos-search/models/repo.model';
import { Branch } from '../repos-search/models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUserReposList(userName: string): Observable<Repo[]> {
    return this.getUserRepos(userName).pipe(
      concatMap(repos => {
        const filteredRepos = repos.filter(repo => !repo.fork);
        const getBranches$: Observable<Repo>[] = filteredRepos.map(repo => this.getRepoBranches(userName, repo.name).pipe(
          map(res => {
            repo.branches = res;
            return repo;
          })
        ));
        return forkJoin(...getBranches$);
      })
    )
  }

  getUserRepos(userName: string): Observable<Repo[]> {
    return this.http.get<Repo[]>(`${this.apiUrl}/users/${userName}/repos`);
  }

  getRepoBranches(userName: string, repoName: string): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}/repos/${userName}/${repoName}/branches`);
  }

}
