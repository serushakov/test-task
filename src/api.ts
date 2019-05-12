import _ from "lodash";
import { PackageData } from "../common/types";

const commonInit: RequestInit = {
  mode: "cors"
};

const fetcher = (path: RequestInfo, init?: RequestInit) =>
  window
    .fetch(path, {
      ...commonInit,
      ...init
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        return Promise.reject(data.error);
      }
      return data;
    });

const buildQuery = (params: { [key: string]: string | number | undefined }) => {
  return _.transform(
    params,
    (result, value, key) => {
      if (value) {
        result.push(`${key}=${value}`);
      }
    },
    [] as Array<string>
  ).join("&");
};

export const fetchPackages = (
  offset?: number,
  amount?: number
): Promise<Array<string>> => {
  return fetcher(`/api/packages?${buildQuery({ offset, amount })}`).then(
    data => data.results
  );
};

export const fetchPackage = (packageName: string): Promise<PackageData> => {
  return fetcher(`/api/packages/${packageName}`).then(data => data.result);
};
