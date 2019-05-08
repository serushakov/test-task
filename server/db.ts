import * as path from "path";
import * as readline from "readline";
import { createReadStream } from "fs";
import { parseDependencies, KEY_VALUE_DIVIDER } from "./utils";

enum RequiredDescriptors {
  Package = "Package",
  Description = "Description",
  Version = "Version",
  Depends = "Depends"
}

interface Package {
  dependencies?: Set<string>;
  dependants?: Set<string>;
  description: string;
  version: string;
}

interface PackageData {
  [name: string]: Partial<Package>;
}

const packageData: PackageData = {};

const pathToFile = path.join(__dirname, "../", "mockdata");

const reportMemoryUsage = () => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`
  );
};

const initialize = async () => {
  const fileStream = createReadStream(pathToFile);
  const readLineInterface = readline.createInterface({
    input: fileStream
  });

  parseData(readLineInterface);

  readLineInterface.on("close", reportMemoryUsage);
};

let currentPackage = "";
let prevKey = "";
let prevValue = "";

const parseData = (readLineInterface: readline.Interface) => {
  readLineInterface.on("line", lineParser);
};

const lineParser = line => {
  if (line === "") {
    currentPackage = "";
    return;
  }

  const isNewKey = !line.startsWith(" ");

  if (isNewKey) {
    const [key, value] = line.split(KEY_VALUE_DIVIDER);

    switch (prevKey) {
      case RequiredDescriptors.Package:
        currentPackage = prevValue;
        packageData[currentPackage] = {};
        break;
      case RequiredDescriptors.Depends:
        packageData[currentPackage] = {
          ...packageData[currentPackage],
          dependencies: parseDependencies(prevValue)
        };
        break;
      case RequiredDescriptors.Version:
        packageData[currentPackage] = {
          ...packageData[currentPackage],
          version: prevValue
        };
        break;
      case RequiredDescriptors.Description:
        packageData[currentPackage] = {
          ...packageData.currentPackage,
          description: prevValue
        };
      default:
        break;
    }

    prevKey = key;
    prevValue = value;
  } else {
    prevValue += line.substring(1);
  }
};

export { initialize };
