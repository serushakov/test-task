export enum RequiredDescriptors {
  Package = "Package",
  Description = "Description",
  Version = "Version",
  Depends = "Depends"
}

export type PackageData = {
  dependencies?: Array<Dependency>;
  dependants?: Array<string>;
  description: string;
  version: string;
};

export type Dependency = {
  installed?: string;
  alternatives?: Array<string>;
};

export type PackageList = {
  [name: string]: PackageData;
};

export type GetPackagesResponse = {
  packages: Array<string>;
  total: number;
};
