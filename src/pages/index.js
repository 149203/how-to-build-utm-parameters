import * as React from "react";
import { useState } from "react";
import { traffic } from "../utils/traffic";
import { checkIsValidUrl, checkIsValidUtmValue } from "../utils/utils";

export default function IndexPage() {
  const [BaseUrlInput, setBaseUrlInput] = useState({
    value: "",
    isValid: true,
  });
  const [AudienceInput, setAudienceInput] = useState({
    value: "",
    isValid: true,
  });
  const [ContentInput, setContentInput] = useState({
    value: "",
    isValid: true,
  });
  const [SearchTermInput, setSearchTermInput] = useState({
    value: "",
    isValid: true,
  });
  const [adId, setAdId] = useState("");
  const [trafficType, setTrafficType] = useState(null);
  const [sourceName, setSourceName] = useState(null);
  const [sources, setSources] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [mediumName, setMediumName] = useState(null);

  const handleBaseUrlInput = (value) => {
    setBaseUrlInput({ value, isValid: checkIsValidUrl(value) });
  };

  const handleAudienceInput = (value) => {
    setAudienceInput({ value, isValid: checkIsValidUtmValue(value) });
  };

  const handleContentInput = (value) => {
    setContentInput({ value, isValid: checkIsValidUtmValue(value) });
  };

  const handleSearchTermInput = (value) => {
    setSearchTermInput({ value, isValid: checkIsValidUtmValue(value) });
  };

  const getInvalidInputCss = (isValid) => {
    if (isValid === false) return "is-invalid";
    return "";
  };

  const handlePaidVsUnpaidClick = (trafficType) => {
    setTrafficType(trafficType);
    setSourceName(null); // reset source
    setMediumName(null); // reset medium
    setSources(traffic[trafficType]);
  };
  const handleSourcesClick = (sourceName) => {
    setSourceName(sourceName);
    setMediumName(null); // reset medium
    setMediums(sources.find((source) => source.name === sourceName).mediums);
  };

  return (
    <main className="container-fluid">
      <title>How To Name UTM Parameters</title>
      <div className="row">
        <div className="col-6">
          <h5>UTM Builder</h5>
          {/* Base URL */}
          <div className="mb-4">
            <label htmlFor="base-url-input" className="form-control-label mb-1">
              <span className="h6">Base URL&nbsp;&nbsp;</span>
              <span className="text-muted">
                e.g.&nbsp;
                <a
                  href="https://channelkey.com/"
                  target="_blank"
                  className="text-muted"
                >
                  https://channelkey.com/
                </a>
              </span>
            </label>
            <input
              type="url"
              value={BaseUrlInput.value}
              className={`form-control ${getInvalidInputCss(
                BaseUrlInput.isValid
              )}`}
              id="base-url-input"
              onChange={(e) => handleBaseUrlInput(e.target.value)}
            />
          </div>
          {/* Audience Codename */}
          <div className="mb-4">
            <label htmlFor="audience-input" className="form-control-label mb-1">
              <span className="h6">Audience Codename&nbsp;&nbsp;</span>
              <span className="text-muted">
                Lowercase a-z, numbers, dashes, and spaces only.
              </span>
            </label>
            <input
              type="text"
              value={AudienceInput.value}
              className={`form-control ${getInvalidInputCss(
                AudienceInput.isValid
              )}`}
              id="audience-input"
              onChange={(e) => handleAudienceInput(e.target.value)}
            />
          </div>
          {/* Content Description */}
          <div className="mb-4">
            <label htmlFor="content-input" className="form-control-label mb-1">
              <span className="h6">Content Description&nbsp;&nbsp;</span>
              <span className="text-muted">
                Lowercase a-z, numbers, dashes, and spaces only.
              </span>
            </label>
            <input
              type="text"
              value={ContentInput.value}
              className={`form-control ${getInvalidInputCss(
                ContentInput.isValid
              )}`}
              id="content-input"
              onChange={(e) => handleContentInput(e.target.value)}
            />
          </div>
          {/* Paid Vs. Unpaid */}
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="paid-vs-unpaid"
              id="paid"
              value="paid"
              checked={trafficType === "paid"}
              onClick={() => handlePaidVsUnpaidClick("paid")}
            />

            <label className="form-check-label" htmlFor="paid">
              Paid
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="paid-vs-unpaid"
              id="unpaid"
              value="unpaid"
              checked={trafficType === "unpaid"}
              onClick={() => handlePaidVsUnpaidClick("unpaid")}
            />
            <label className="form-check-label" htmlFor="unpaid">
              Unpaid
            </label>
          </div>
          {/* Sources */}
          <div className="row mt-4">
            {trafficType && <h6>Select Source</h6>}
            {sources.map((sourceRadio) => (
              <div className="col-4">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sources"
                    id={sourceRadio.name}
                    value={sourceRadio.name}
                    checked={sourceName === sourceRadio.name}
                    onClick={() => handleSourcesClick(sourceRadio.name)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={sourceRadio.name}
                  >
                    {sourceRadio.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* Mediums */}
          <div className="row mt-4">
            {sourceName && <h6>Select Medium</h6>}
            {mediums.map((mediumRadioName) => (
              <div className="col-4">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="mediums"
                    id={mediumRadioName}
                    value={mediumRadioName}
                    checked={mediumName === mediumRadioName}
                    onClick={() => setMediumName(mediumRadioName)}
                  />
                  <label className="form-check-label" htmlFor={mediumRadioName}>
                    {mediumRadioName}
                  </label>
                </div>
              </div>
            ))}
          </div>
          {/* Search Terms */}
          {mediumName === "search--p" && (
            <div className="my-4">
              <label
                htmlFor="search-term-input"
                className="form-control-label mb-1"
              >
                <span className="h6">Search Terms&nbsp;&nbsp;</span>
                <span className="text-muted">
                  Lowercase a-z, numbers, dashes, and spaces only.
                </span>
              </label>
              <input
                type="text"
                value={SearchTermInput.value}
                className={`form-control ${getInvalidInputCss(
                  SearchTermInput.isValid
                )}`}
                id="search-term-input"
                onChange={(e) => handleSearchTermInput(e.target.value)}
              />
            </div>
          )}
          {/* Ad ID */}
          <div className="my-4">
            <label htmlFor="ad-id-input" className="form-control-label mb-1">
              <span className="h6">Ad ID (Optional)&nbsp;&nbsp;</span>
              <span className="text-muted">
                Lowercase a-z, numbers, dashes, and spaces only.
              </span>
            </label>
            <input
              type="text"
              value={adId}
              className={`form-control`}
              id="ad-id-input"
              onChange={(e) => setAdId(e.target.value)}
            />
          </div>
          {/* Create UTM Button */}
          {trafficType &&
            sourceName &&
            mediumName &&
            BaseUrlInput.isValid &&
            BaseUrlInput.value !== "" &&
            AudienceInput.isValid &&
            AudienceInput.value !== "" &&
            ContentInput.isValid &&
            ContentInput.value !== "" &&
            (mediumName === "search--p"
              ? SearchTermInput.isValid && SearchTermInput.value !== ""
              : true) && (
              <div className="d-grid">
                <button className="btn btn-primary" type="button">
                  Create UTM URL
                </button>
              </div>
            )}
        </div>
        <div className="col-2">
          <h5>Previous Base URLs</h5>
        </div>
        <div className="col-2">
          <h5>Previous Audiences</h5>
        </div>
        <div className="col-2">
          <h5>Previous Content</h5>
        </div>
      </div>
    </main>
  );
}
