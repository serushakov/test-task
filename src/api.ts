import _ from "lodash";

const commonInit: RequestInit = {
  mode: "cors"
};

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

export const fetchPackages = async (offset?: number, amount?: number) => {
  const request = await fetch(
    `/api/packages?${buildQuery({ offset, amount })}`,
    commonInit
  );

  if (request.ok) {
    const json = await request.json();

    return json.results;
  }
};
