import React from 'react';
import useTests from "./hooks/test.hook";
import useStatus from "./hooks/status.hook";
import Header from './components/header/header.component';
import TestBanner from './components/testBanner/testBanner.component';
import ProcessButton from './components/processButton/processButton.component';
import makeReport from './utilities/report.utils';

const Dashboard = () => {
  const [status, updateStatus, statusActions] = useStatus();
  const [tests, updateTest, testActions] = useTests();

  const startTest = response => {
    updateStatus(statusActions.initTesting(response.serialNumber));
    updateTest(testActions.initFlags);
  };

  const markTestFlag = response => {
    console.log(response);
    updateTest(testActions.passTest(response));
  };

  const generateReport = () => {
    const report = makeReport('Reporte de Pruebas', {});
    report.save('reporte.pdf');
  };  

  return (
    <div className="flex flex-col h-screen">
      <header>
        <Header />
      </header>
      <main className="mb-auto flex">
        <div className="w-6/12 flex h-full">
          <div className="m-auto">
            <h5 className="text-xl text-center">{status.snBanner}</h5>
            <h1 className="text-3xl text-center">{status.mainBanner}</h1>
          </div>
        </div>
        <div className="w-6/12 flex flex-col">
          <TestBanner name={tests.test1.name} flag={tests.test1.flag} />
          <TestBanner name={tests.test2.name} flag={tests.test2.flag} />
          <TestBanner name={tests.test3.name} flag={tests.test3.flag} />
          <TestBanner name={tests.test4.name} flag={tests.test4.flag} />
          <TestBanner name={tests.test5.name} flag={tests.test5.flag} />
          <TestBanner name={tests.test6.name} flag={tests.test6.flag} />
        </div>
      </main>
      <footer>
        <ProcessButton
          startTest={startTest}
          testHaveFinished={markTestFlag}
          allTestHaveFinished={generateReport}
        />
      </footer>
    </div>
  );
};

export default Dashboard;