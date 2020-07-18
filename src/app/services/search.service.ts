import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

import { Repo } from '../repos-search/models/repo.model';
import { Branch } from '../repos-search/models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public data: Repo[] = [
    {
      id: 167622727,
      name: "ArtPage",
      owner: {
        login: "TribusK2"
      },
      fork: false,
      branches_url: "https://api.github.com/repos/TribusK2/ArtPage/branches{/branch}",
      branches: [
        {
          name: "master",
          commit: {
            sha: "3d4252fa2e16b8d4fa6a81e7eefe86d42038a73d"
          }
        }
      ]
    },
    {
      id: 215244517,
      name: "baza-produktow",
      owner: {
        login: "TribusK2"
      },
      fork: false,
      branches_url: "https://api.github.com/repos/TribusK2/ArtPage/branches{/branch}",
      branches: [
        {
          name: "master",
          commit: {
            sha: "3d4252fa2e16b8d4fa6a81e7eefe86d42038a73d"
          }
        },
        {
          name: "dependabot/composer/symfony/cache-4.3.9",
          commit: {
            sha: "464904499c449d2dd73633b16b6d4e9998ede8d9"
          }
        }
      ]
    }
  ]

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

  getPseudoData(userName: string): Observable<Repo[]> {
    return of(this.data)
  }

}
