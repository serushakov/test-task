import React, { useState, useEffect } from "react";

import "../styles/PackageList.css";
import { fetchPackages } from "../api";
import { Link } from "react-router-dom";

const PackageList: React.FC = () => {
  const [packages, onPackageLoad] = useState<Array<string>>([]);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPackages().then(onPackageLoad);
  }, []);

  const renderPackage = (packageName: string) => {
    return (
      <Link
        to={`/package/${packageName}`}
        className="PackageList-package"
        key={packageName}
      >
        {packageName}
      </Link>
    );
  };

  return (
    <div>
      <header className="App-header">
        List of currently installed packages
      </header>
      <div className="PackageList-list">
        {packages && packages.map(renderPackage)}
      </div>
    </div>
  );
};

export default PackageList;
