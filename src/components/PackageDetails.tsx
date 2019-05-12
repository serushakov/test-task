import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PackageData } from "../../common/types";

import { fetchPackage } from "../api";

import "../styles/PackageDetails.css";

interface RouteParams {
  packageName: string;
}

const PackageDetails: React.FC<RouteComponentProps<RouteParams>> = ({
  match
}) => {
  const { packageName } = match.params;
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [error, setError] = useState<{ error: string } | null>(null);

  useEffect(() => {
    fetchPackage(packageName)
      .then(setPackageData)
      .catch(setError);
  }, []);

  if (error || !packageData) {
    return <div>{error}</div>;
  }

  return (
    <div className="PackageDetails-root">
      <span>{packageName}</span>
      <span>{packageData.version}</span>
      <div className="PackageDetails-description">
        {packageData.description}
      </div>
      <div>
        <h3>Dependencies</h3>
        <ul className="PackageDetails-list">
          {packageData.dependencies ? (
            packageData.dependencies.map(dep => <li>{dep}</li>)
          ) : (
            <span>None!</span>
          )}
        </ul>
      </div>
      <div>
        <h3>Dependants</h3>
        <ul className="PackageDetails-list">
          {packageData.dependants ? (
            packageData.dependants.map(dep => <li>{dep}</li>)
          ) : (
            <span>None!</span>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PackageDetails;
