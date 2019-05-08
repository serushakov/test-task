import * as path from "path";
import * as readline from "readline";
import { createReadStream } from "fs";

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

const initialize = async () => {
  const fileStream = createReadStream(pathToFile);
  const readLineInterface = readline.createInterface({
    input: fileStream
  });

  parseData(readLineInterface);

  readLineInterface.on("close", () => {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(
      `The script uses approximately ${Math.round(used * 100) / 100} MB`
    );
  });
};

const parseData = (readLineInterface: readline.Interface) => {
  let currentPackage = "";
  let prevKey = "";
  let prevValue = "";

  readLineInterface.on("line", line => {
    if (line === "") {
      currentPackage = "";
      return;
    }

    const isNewKey = !line.startsWith(" ");

    if (isNewKey) {
      const colonLocation = line.indexOf(": ");

      const key = line.slice(0, colonLocation);
      const value = line.substring(colonLocation + 2);

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
  });

  readLineInterface.on("close", () => console.log(packageData));
};

const parseDependencies = (line: string) => {
  const dependencies = line.split(", ").map(removeVersionFromDependency);

  return new Set(dependencies);
};

const removeVersionFromDependency = (dependency: string) => {
  const [dependencyName] = dependency.split(" ");

  if (dependencyName) {
    return dependencyName.trim();
  } else {
    return null;
  }
};

export { initialize };
