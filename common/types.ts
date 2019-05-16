export enum RequiredDescriptors {
  Package = "Package",
  Description = "Description",
  Version = "Version",
  Depends = "Depends"
}

export type PackageData = {
  dependencies?: Array<Alternatives>;
  dependants?: Array<string>;
  description: string;
  version: string;
};

export type Alternatives = {
  [name: string]: {
    installed: boolean;
  };
};

export type PackageList = {
  [name: string]: PackageData;
};

export type GetPackagesResponse = {
  packages: Array<string>;
  total: number;
};
