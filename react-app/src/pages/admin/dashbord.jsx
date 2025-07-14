import { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/adminsidebar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AdminDashboard() {
  const [charts, setCharts] = useState({
    purpose: null,
    gender: null,
    age: null,
    state: null,
  });

  const chartsRef = useRef(null); // Reference to the charts div

  useEffect(() => {
    async function fetchCharts() {
      try {
        const purposeChart = await fetch("http://127.0.0.1:8000/admin/charts/purpose.png");
        const genderChart = await fetch("http://127.0.0.1:8000/admin/charts/gender.png");
        const ageChart = await fetch("http://127.0.0.1:8000/admin/charts/age.png");
        const stateChart = await fetch("http://127.0.0.1:8000/admin/charts/state.png");

        setCharts({
          purpose: URL.createObjectURL(await purposeChart.blob()),
          gender: URL.createObjectURL(await genderChart.blob()),
          state: URL.createObjectURL(await stateChart.blob()),
          age: URL.createObjectURL(await ageChart.blob()),
        });
      } catch (err) {
        console.error("Failed to load charts:", err);
      }
    }

    fetchCharts();
  }, []);

  // Function to capture charts div and generate PDF
  const downloadPDF = async () => {
    const element = chartsRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("charts.pdf");
  };

  return (
    <div className="flex h-max">
      <Sidebar />
      <div className="w-5/6 bg-bg-light flex flex-col">
        <div className="w-full justify-center flex border-b-border border-b-2 items-center">
          <span className="text-blue mt-2 p-3 text-5xl font-semibold tracking-wide">
            Dashboard
          </span>
        </div>
        <div className="flex w-full">
          <button onClick={downloadPDF} className="ml-auto m-5 p-2 text-xl text-white bg-blue rounded-lg hover:cursor-pointer">
            Print PDF
          </button>
        </div>

        {/* Charts Section */}
        <div ref={chartsRef} className="grid grid-cols-2 gap-6 px-16 py-5">
          {/* Purpose */}
          <div className="pb-5 border-border shadow-xl rounded-2xl border-1 bg-white">
            <span className="flex justify-center text-4xl font-semibold text-blue pt-5">
              Purpose
            </span>
            {charts.purpose && (
              <img src={charts.purpose} alt="purposechart" className="w-3/4 mx-auto mt-4" />
            )}
          </div>

          {/* Gender */}
          <div className="pb-5 border-border shadow-xl rounded-2xl border-1 bg-white">
            <span className="flex justify-center text-4xl font-semibold text-blue pt-5">
              Gender
            </span>
            {charts.gender && (
              <img src={charts.gender} alt="genderchart" className="w-3/4 mx-auto mt-4" />
            )}
          </div>

          {/* State */}
          <div className="pb-5 border-border shadow-xl rounded-2xl border-1 bg-white">
            <span className="flex justify-center text-4xl font-semibold text-blue pt-5">
              State
            </span>
            {charts.state && (
              <img src={charts.state} alt="statechart" className="w-3/4 mx-auto mt-4" />
            )}
          </div>

          {/* Age */}
          <div className="pb-5 border-border shadow-xl rounded-2xl border-1 bg-white">
            <span className="flex justify-center text-4xl font-semibold text-blue pt-5">
              Age
            </span>
            {charts.age && (
              <img src={charts.age} alt="agechart" className="w-3/4 mx-auto mt-4" />
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="flex mx-auto mb-8 mt-2 text-2xl gap-32 text-blue font-medium">
          <span>Total Users: 56</span>
          <span>Total Communities: 12</span>
        </div>
      </div>
    </div>
  );
}
