import { Interface, createInterface } from "readline";
import { createReadStream } from "fs";
import * as _ from "lodash";
import { PackageData, PackageList, RequiredDescriptors } from "../common/types";
import { withNewLine } from "./utils";

const KEY_VALUE_DIVIDER = ": ";

interface PartialPackageList {
  [name: string]: Partial<PackageData>;
}

class Parser {
  private filePath: string;
  private readLineInterface: Interface;
  private currentPackage = "";
  private prevKey = "";
  private prevValue = "";

  private packageList: PartialPackageList;

  constructor(filePath: string) {
    if (!filePath) {
      throw Error("Please provide path to file");
    }

    this.filePath = filePath;
    this.packageList = {};

    this.initReadLineInterface();
  }

  private initReadLineInterface() {
    const fileStream = createReadStream(this.filePath);

    this.readLineInterface = createInterface({
      input: fileStream
    });
  }

  public getPackageList(): Promise<PackageList> {
    this.readLineInterface.on("line", this.lineParser);

    return new Promise(resolve => {
      this.readLineInterface.on("close", () => {
        this.savePreviousKeyValue();
        this.calculateDependants();
        resolve(this.packageList as PackageList);
      });
    });
  }

  private calculateDependants() {
    const packages = Object.keys(this.packageList);

    packages.forEach(name => {
      const pkg = this.packageList[name];

      if (!pkg.dependencies) return;

      pkg.dependencies.forEach(this.addDependant(name));
    });
  }

  private addDependant = name => dependency => {
    const dependencyPackage = this.packageList[dependency];

    if (!dependencyPackage) return;

    if (!dependencyPackage.dependants) {
      this.packageList[dependency].dependants = [];
    }

    this.packageList[dependency].dependants.push(name);
  };

  private lineParser = (line: string) => {
    if (line === "") return;

    const isNewKey = !line.startsWith(" ");

    if (isNewKey) {
      this.savePreviousKeyValue();
      const { key, value } = this.getKeyValue(line);

      this.prevKey = key;
      this.prevValue = value;
    } else {
      if (!this.prevValue.endsWith("\n")) {
        this.prevValue = withNewLine(this.prevValue);
      }

      this.prevValue += withNewLine(line.trim());
    }
  };

  private getKeyValue = (line: string) => {
    const [key, ...valueArray] = line.split(KEY_VALUE_DIVIDER);
    return {
      key,
      value: valueArray.join(KEY_VALUE_DIVIDER)
    };
  };

  private savePreviousKeyValue() {
    switch (this.prevKey) {
      case RequiredDescriptors.Package:
        this.currentPackage = this.prevValue;
        this.packageList[this.currentPackage] = {};
        break;
      case RequiredDescriptors.Depends:
        this.packageList[this.currentPackage] = {
          ...this.packageList[this.currentPackage],
          dependencies: this.parseDependencies(this.prevValue)
        };
        break;
      case RequiredDescriptors.Version:
        this.packageList[this.currentPackage] = {
          ...this.packageList[this.currentPackage],
          version: this.prevValue
        };
        break;
      case RequiredDescriptors.Description:
        this.packageList[this.currentPackage] = {
          ...this.packageList[this.currentPackage],
          description: this.prevValue
        };
      default:
        break;
    }
  }

  private parseDependencies = (line: string) => {
    const dependencies = line.split(", ").map(this.removeVersionFromDependency);
    return _.uniq(dependencies);
  };

  private removeVersionFromDependency = (dependency: string) => {
    const [dependencyName] = dependency.split(" ");
    return dependencyName;
  };
}

export default Parser;
