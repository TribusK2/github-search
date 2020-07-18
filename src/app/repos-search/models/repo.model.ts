declare interface Owner {
    login: string;
}

export interface Repo {
    id: number;
    name: string;
    owner: Owner;
    fork: boolean;
    branches_url: string;
}