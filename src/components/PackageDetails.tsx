import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
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
    setError(null);
  }, [packageName]);

  const renderPackageList = (list: Array<string>) => (
    <ul className="PackageDetails-list">
      {list.map(packageName => (
        <li key={packageName}>
          <Link to={`/package/${packageName}`}>{packageName}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <Link to="/">&#8592; Back to package list</Link>
      {error || !packageData ? (
        <div className="PackageDetails-error">{error}</div>
      ) : (
        <div className="PackageDetails-container">
          <div>
            <h3>Name</h3>
            <span>{packageName}</span>
          </div>

          <div>
            <h3>Version</h3>
            <span>{packageData.version}</span>
          </div>

          <div className="PackageDetails-description">
            <h3>Description</h3>
            {packageData.description}
          </div>

          <div>
            <h3>Dependencies</h3>
            {packageData.dependencies ? (
              renderPackageList(packageData.dependencies)
            ) : (
              <span>None!</span>
            )}
          </div>

          <div>
            <h3>Dependants</h3>
            {packageData.dependants ? (
              renderPackageList(packageData.dependants)
            ) : (
              <span>None!</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
