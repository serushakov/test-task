export const parseDependencies = (line: string) => {
  const dependencies = line.split(", ").map(removeVersionFromDependency);

  return new Set(dependencies);
};

export const removeVersionFromDependency = (dependency: string) => {
  const [dependencyName] = dependency.split(" ");

  if (dependencyName) {
    return dependencyName.trim();
  } else {
    return null;
  }
};

export const KEY_VALUE_DIVIDER = ": ";
