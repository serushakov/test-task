import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { loadPackagesRequest, setPage } from "../redux/package-list/actions";

import { RootState } from "../redux/types";
import {
  PackageListState,
  LoadPackagesRequestInit
} from "../redux/package-list/types";

import "../styles/PackageList.css";

const packageAmount = 20;

const mapStateToProps = (state: RootState): PackageListState => {
  return state.packageList;
};

interface ReduxProps extends PackageListState {
  loadPackagesRequest: (init: LoadPackagesRequestInit) => void;
  setPage: (page: number) => void;
}

const PackageList: React.FC<ReduxProps> = ({
  totalPackages,
  packages,
  loadPackagesRequest,
  page,
  setPage,
  isLoading
}) => {
  useEffect(() => {
    loadPackagesRequest({
      offset: (page - 1) * packageAmount,
      amount: packageAmount
    });
  }, [page, loadPackagesRequest]);

  const totalPages = totalPackages ? totalPackages / packageAmount : 0;

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

  if (isLoading && !packages) {
    return <span>Loading...</span>;
  }

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

export default connect(
  mapStateToProps,
  {
    loadPackagesRequest,
    setPage
  }
)(PackageList);
