import React, { useState, useEffect } from "react";

import "../styles/PackageList.css";
import { fetchPackages } from "../api";
import { Link } from "react-router-dom";

const packageAmount = 20;

const PackageList: React.FC = () => {
  const [packages, onPackageLoad] = useState<Array<string>>([]);
  const [packageCount, setPackageCount] = useState<number>(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPackages((page - 1) * packageAmount, packageAmount).then(data => {
      onPackageLoad(data.packages);
      setPackageCount(data.total);
    });
  }, [page]);

  const totalPages = packageCount / packageAmount;

  const renderPackageLink = (packageName: string) => {
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

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div>
      <header className="App-header">
        List of currently installed packages
      </header>
      <div className="PackageList-controls">
        <button onClick={prevPage}>&#8592;</button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={nextPage}>&#8594;</button>
      </div>
      <div className="PackageList-list">
        {packages && packages.map(renderPackageLink)}
      </div>
    </div>
  );
};

export default PackageList;
