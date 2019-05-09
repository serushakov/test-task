export enum RequiredDescriptors {
  Package = "Package",
  Description = "Description",
  Version = "Version",
  Depends = "Depends"
}

export interface PackageData {
  dependencies?: Array<string>;
  dependants?: Array<string>;
  description: string;
  version: string;
}

export interface PackageList {
  [name: string]: PackageData;
}
