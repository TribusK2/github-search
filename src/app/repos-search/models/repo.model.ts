declare interface Owner {
    login: string;
}

declare interface Branch {
    name: string;
    commit: {
        sha: string;
    }
}

export interface Repo {
    id: number;
    name: string;
    owner: Owner;
    fork: boolean;
    branches_url: string;
    branches?: Branch[]
}