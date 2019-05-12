import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  loadPackagesRequest,
  setPage,
  setAmountPerPage
} from "../redux/package-list/actions";

import { RootState } from "../redux/types";
import {
  PackageListState,
  LoadPackagesRequestInit
} from "../redux/package-list/types";

import "../styles/PackageList.css";

const AMOUNT_OPTIONS = (totalOption: number) => [10, 20, 50, 100, totalOption];

const mapStateToProps = (state: RootState): PackageListState => {
  return state.packageList;
};

interface ReduxProps extends PackageListState {
  loadPackagesRequest: (init: LoadPackagesRequestInit) => void;
  setPage: (page: number) => void;
  setAmountPerPage: (amount: number) => void;
}

const PackageList: React.FC<ReduxProps> = ({
  totalPackages,
  packages,
  loadPackagesRequest,
  page,
  setPage,
  isLoading,
  amountPerPage,
  setAmountPerPage
}) => {
  useEffect(() => {
    loadPackagesRequest({
      offset: (page - 1) * amountPerPage,
      amount: amountPerPage
    });
  }, [page, loadPackagesRequest, amountPerPage]);

  const totalPages = totalPackages ? totalPackages / amountPerPage : 0;

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

  const changeAmountPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmountPerPage(Number(e.target.value));
  };

  if (isLoading || !packages || !totalPackages) {
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
        <div>
          Per page
          <select
            value={amountPerPage}
            onChange={changeAmountPerPage}
            className="PackageList-select"
          >
            {AMOUNT_OPTIONS(totalPackages).map(amount => (
              <option value={amount} key={amount}>
                {amount}
              </option>
            ))}
          </select>
        </div>
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
    setPage,
    setAmountPerPage
  }
)(PackageList);
