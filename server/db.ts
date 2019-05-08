import * as path from "path";
import Parser from "./parser";
import { PackageList } from "./types";

const pathToFile = path.join(__dirname, "../", "mockdata");

const reportMemoryUsage = () => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`
  );
};

class Database {
  packageList: PackageList;

  initialize = async () => {
    const parser = new Parser(pathToFile);

    this.packageList = await parser.getPackageList();
    reportMemoryUsage();
  };

  getPackageData = (name: string) => {
    this.packageList[name];
  };
}

export default Database;
