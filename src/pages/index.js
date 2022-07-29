import * as React from "react";
import { useState } from "react";
import { traffic } from "../utils/traffic";
import {
  checkIsValidUrl,
  checkIsValidUtmValue,
  getUtmUrlPayload,
} from "../utils/utils";
import Storage from "store2";

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
  const [prevBaseUrls, setPrevBaseUrls] = useState(
    Storage.get("baseUrls") || []
  );
  const [prevAudiences, setPrevAudiences] = useState(
    Storage.get("audiences") || []
  );
  const [prevContents, setPrevContents] = useState(
    Storage.get("contents") || []
  );

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
  const handleButtonClick = () => {
    const Payload = getUtmUrlPayload({
      baseUrl: BaseUrlInput.value,
      source: sourceName,
      medium: mediumName,
      campaign: AudienceInput.value,
      content: ContentInput.value,
      term: SearchTermInput.value,
      id: adId,
    });
    console.log(Payload);

    // UPDATE PREV BASE URLS
    const storedBaseUrls = Storage.get("baseUrls") || [];
    const updatedBaseUrls = [
      ...new Set([Payload.baseUrl, ...storedBaseUrls]),
    ].slice(0, 20); // add new content to front of array, remove duplicates, and limit to 20
    Storage.set("baseUrls", updatedBaseUrls);
    setPrevBaseUrls(updatedBaseUrls);

    // UPDATE PREV AUDIENCES
    const storedAudiences = Storage.get("audiences") || [];
    const updatedAudiences = [
      ...new Set([Payload.campaign, ...storedAudiences]),
    ].slice(0, 20); // add new content to front of array, remove duplicates, and limit to 20
    Storage.set("audiences", updatedAudiences);
    setPrevAudiences(updatedAudiences);

    // UPDATE PREV CONTENTS
    const storedContents = Storage.get("contents") || [];
    const updatedContents = [
      ...new Set([Payload.content, ...storedContents]),
    ].slice(0, 20); // add new content to front of array, remove duplicates, and limit to 20
    Storage.set("contents", updatedContents);
    setPrevContents(updatedContents);

    // TODO: Display results
  };

  return (
    <main className="container-fluid">
      <title>How To Name UTM Parameters</title>
      <div className="row">
        <div className="col-5">
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
                  rel="noopener"
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
                a-z, 0-9, dashes, and spaces only
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
                a-z, 0-9, dashes, and spaces only
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
                  a-z, 0-9, dashes, and spaces only
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
              <span className="h6">Ad ID (Optional)</span>
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
          {
            /*trafficType &&
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
              : true) && */ <div className="d-grid">
              <button
                className="btn btn-success"
                type="button"
                onClick={() => handleButtonClick()}
              >
                Create UTM URL
              </button>
            </div>
          }
        </div>
        <div className="col-7">
          <h5>Previous Base URLs</h5>
          {prevBaseUrls.map((baseUrl) => (
            <p className="text-break mb-1">
              {baseUrl}{" "}
              <button
                type="button"
                className="btn btn-sm btn-success px-2 py-0"
                onClick={() => handleBaseUrlInput(baseUrl)}
              >
                Add
              </button>
            </p>
          ))}
          <div className="row">
            <div className="col-6">
              <h5 className="mt-4">Previous Audiences</h5>
              {prevAudiences.map((audience) => (
                <p className="text-break mb-1">
                  {audience}{" "}
                  <button
                    type="button"
                    className="btn btn-sm btn-success px-2 py-0"
                    onClick={() => handleAudienceInput(audience)}
                  >
                    Add
                  </button>
                </p>
              ))}
            </div>
            <div className="col-6">
              <h5 className="mt-4">Previous Content</h5>
              {prevContents.map((content) => (
                <p className="text-break mb-1">
                  {content}{" "}
                  <button
                    type="button"
                    className="btn btn-sm btn-success px-2 py-0"
                    onClick={() => handleContentInput(content)}
                  >
                    Add
                  </button>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
