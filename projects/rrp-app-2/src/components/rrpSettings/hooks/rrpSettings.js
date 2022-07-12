import { useState } from "react";

const useRRPSettings = () => {
  const [rrpData, setRrpData] = useState({
    workId: '',
    items: '',
    issue: '',
    description: '',
    setupStart: '',
    setupEnd: '',
  });


  const setWorkId = (workId) => {
    setRrpData(rrpData => ({
      ...rrpData,
      ...{workId: workId},
    }))
  };

  const setItems = (items) => {
    setRrpData(rrpData => ({
      ...rrpData,
      ...{items: items},
    }))
  };
  
  const setIssue = (issue) => {
    setRrpData(rrpData => ({
      ...rrpData,
      ...{issue: issue},
    }))
  };
  
  const setDescription = (description) => {
    setRrpData(rrpData => ({
      ...rrpData,
      ...{description: description},
    }))
  };
  
  const setSetupStart = (setupStart) => {
    setRrpData(rrpData => ({
      ...rrpData,
      ...{setupStart: setupStart},
    }))
  };
  
  const setSetupEnd = (setupEnd) => {
    setRrpData(rrpData => ({
      ...rrpData,
      ...{setupEnd: setupEnd},
    }))
  };

  return [rrpData, setWorkId, setItems, setIssue, setDescription, setSetupStart, setSetupEnd];
};

export default useRRPSettings;