import * as path from "path";
import * as _ from "lodash";
import Parser from "./parser";
import { reportMemoryUsage } from "./utils";
import { PackageList } from "./types";
import { watch } from "fs";

const pathToFile = path.join(__dirname, "../", "mockdata");

class Database {
  packageList: PackageList;

  initialize = async () => {
    await this.parseFile();

    reportMemoryUsage();
    this.setupWatch();
  };

  parseFile = async () => {
    const parser = new Parser(pathToFile);
    this.packageList = await parser.getPackageList();
  };

  setupWatch() {
    watch(
      pathToFile,
      _.debounce(() => {
        // debounce is required because this callback is triggered multiple times per file change
        console.log("File was changed, reparsing...");

        this.parseFile();
      }, 100)
    );
  }

  getPackageData = (name: string) => {
    return this.packageList[name];
  };

  getAllPackages = () => {
    return Object.keys(this.packageList);
  };

  getPackages = (offset: number, amount: number) => {
    return this.getAllPackages().slice(offset, offset + amount);
  };
}

export default Database;
