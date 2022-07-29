import * as React from "react";
import { useState } from "react";
import { traffic } from "../utils/traffic";

export default function IndexPage() {
  const [trafficType, setTrafficType] = useState(null);
  const [sourceName, setSourceName] = useState(null);
  const [sources, setSources] = useState([]);
  const [mediums, setMediums] = useState([]);
  const handlePaidVsUnpaidClick = (trafficType) => {
    setTrafficType(trafficType);
    setSourceName(null); // reset source
    setSources(traffic[trafficType]);
  };

  return (
    <main className="container-fluid">
      <title>How To Name UTM Parameters</title>
      <div className="row">
        <div className="col-6">
          <h5>UTM Builder</h5>
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
          <div className="row mt-4">
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
                    onClick={() => setSourceName(sourceRadio.name)}
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
