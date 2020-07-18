import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Repo } from '../repos-search/models/repo.model';
import { Branch } from '../repos-search/models/branch.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient,) { }

  getUserRepos(userName: string): Observable<Repo[]>{
    return this.http.get<Repo[]>(`${this.apiUrl}/users/${userName}/repos`);
  }

  getRepoBranches(userName: string, repoName: string): Observable<Branch[]>{
    return this.http.get<Branch[]>(`${this.apiUrl}/repos/${userName}/${repoName}/branches`);
  }

}
