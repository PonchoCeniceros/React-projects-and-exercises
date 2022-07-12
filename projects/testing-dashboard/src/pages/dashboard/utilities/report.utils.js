import jsPDF from 'jspdf';
import imLogoDark from '../assets/imLogoDark.png'

const makeReport = (title, tests) => {
  

  let report = new jsPDF();
  report.setFontSize(18);
  report.text(20, 20, `${title}`);
  report.addImage(imLogoDark, 'JPEG', 155, 12);
  return report;
};

export default makeReport;
