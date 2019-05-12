import * as _ from "lodash";
import { watch } from "fs";
import Parser from "./parser";
import { reportMemoryUsage, getFilePath } from "./utils";
import { PackageList } from "../common/types";

const pathToFile = getFilePath();

class Database {
  packageList: PackageList;

  initialize = async () => {
    await this.initParser();

    reportMemoryUsage();
    this.setupWatch();
  };

  private initParser = async () => {
    const parser = new Parser(pathToFile);
    this.packageList = await parser.getPackageList();
  };

  private setupWatch() {
    watch(
      pathToFile,
      _.debounce(() => {
        // debounce is required because this callback is triggered multiple times per file change
        console.log("File was changed, reparsing...");

        this.initParser();
      }, 100)
    );
  }

  getPackageData = (name: string) => {
    return this.packageList[name];
  };

  getAllPackages = () => {
    return Object.keys(this.packageList);
  };

  getPackagesWithOffset = (offset: number, amount: number) => {
    return this.getAllPackages().slice(offset, offset + amount);
  };
}

export default Database;
