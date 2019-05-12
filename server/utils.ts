import * as path from "path";

export const reportMemoryUsage = () => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(
    `The script uses approximately ${Math.round(used * 100) / 100} MB`
  );
};

export const getFilePath = () => {
  const filePathFromArgs = process.argv[2];
  if (!filePathFromArgs) {
    return "/var/lib/dpkg/status";
  } else {
    return path.join(__dirname, "../../", process.argv[2]);
  }
};
