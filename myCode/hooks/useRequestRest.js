import { useEffect, useState } from "react";
import axios from "axios";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const restUrl = "api/speakers";

export function useRequestRest() {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // To use for testing 'failure' of update in updateRecord
  const delayError = (ms) =>
    new Promise((resolve, reject) => setTimeout(reject, ms));

  useEffect(() => {
    async function delayFunc() {
      try {
        const result = await axios.get(restUrl);
        setData(result.data);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      } catch (error) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(error);
      }
    }
    delayFunc();
  }, []);

  function updateRecord(recordUpdated, doneCallback) {
    const originalRecords = [...data];
    const newRecords = data.map((record) => {
      return record.id === recordUpdated.id ? recordUpdated : record;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.put(`${restUrl}/${recordUpdated.id}`, recordUpdated);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  function insertRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = [record, ...data];

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.post(`${restUrl}/99999`, record);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  function deleteRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = data.filter((rec) => rec.id !== record.id);

    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.delete(`${restUrl}/${record.id}`, record);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  return {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  };
}
