import * as path from "path";
import { debounce } from "lodash";
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
      debounce(event => {
        console.log("File was changed, reparsing...");

        this.parseFile();
      }, 100)
    );
  }

  getPackageData = (name: string) => {
    this.packageList[name];
  };
}

export default Database;
