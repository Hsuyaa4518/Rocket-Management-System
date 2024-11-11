'use client'
import React, { useState } from 'react';
import { AlertTriangle, Clock, Thermometer, Wind, Activity, Package, Radio, Power } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SystemStatus: React.FC<{ icon: React.ReactNode; name: string; status: string }> = ({ icon, name, status }) => (
  <div className="flex items-center space-x-2">
    <div className="w-6 h-6">{icon}</div>
    <div>
      <p className="font-semibold">{name}</p>
      <p>{status}</p>
    </div>
  </div>
);

const Alert: React.FC<{ message: string; type: string }> = ({ message, type }) => (
  <div className={`p-2 rounded-lg ${type === 'success' ? 'bg-green-600' : 'bg-blue-600'}`}>
    <p className="text-white">{message}</p>
  </div>
);

const TelemetryGauge: React.FC<{ title: string; value: number; unit: string }> = ({ title, value, unit }) => (
  <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p>{value} {unit}</p>
  </div>
);

const ControlButton: React.FC<{ title: string; active: boolean; onClick: () => void }> = ({ title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-2 rounded-lg ${active ? 'bg-green-600' : 'bg-gray-600'} hover:bg-green-500`}
  >
    {title}
  </button>
);

const LogEntry: React.FC<{ time: React.ReactNode; message: string }> = ({ time, message }) => (
  <div className="p-2 border-b border-gray-600">
    <span className="font-semibold">{time}</span>: {message}
  </div>
);

const LineChart: React.FC<{ title: string; labels: string[]; data: number[]; color: string }> = ({ title, labels, data, color }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        fill: false,
        borderColor: color,
        tension: 0,
        borderWidth: 2,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#4B5563',
          font: { size: 14 },
          stepSize: 20,
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
      },
      x: {
        ticks: {
          color: '#4B5563',
          font: { size: 14 },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#374151',
          font: { size: 16 },
        },
      },
      tooltip: {
        backgroundColor: '#374151',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
        borderWidth: 1,
        borderColor: '#4B5563',
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px', padding: '20px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

const DashboardLayout = () => {
  const [currentStage, setCurrentStage] = useState(1);

  const handleStageChange = (stage: number) => {
    setCurrentStage(stage);
  };
  const renderStageUI = () => {
    switch (currentStage) {
      case 1:
        return (
          <div className="grid grid-cols-2 gap-4">
            <TelemetryGauge title="Altitude" value={75} unit="km" />
            <TelemetryGauge title="Velocity" value={60} unit="m/s" />
            <TelemetryGauge title="Acceleration" value={45} unit="m/s²" />
            <TelemetryGauge title="Fuel Level" value={82} unit="%" />
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 gap-4">
            <TelemetryGauge title="Engine Temperature" value={850} unit="°C" />
            <TelemetryGauge title="Fuel Flow Rate" value={120} unit="L/s" />
            <TelemetryGauge title="Throttle Position" value={95} unit="%" />
            <TelemetryGauge title="Vibration Level" value={4} unit="g" />
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 gap-4">
            <TelemetryGauge title="Vertical Speed" value={150} unit="m/s" />
            <TelemetryGauge title="Lateral Speed" value={20} unit="m/s" />
            <TelemetryGauge title="Angle of Attack" value={5} unit="°" />
            <TelemetryGauge title="Rocket Orientation" value={180} unit="°" />
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-4">
            <TelemetryGauge title="Stage 1 Fuel Level" value={10} unit="%" />
            <TelemetryGauge title="Stage 2 Ignition Status" value={1} unit="Active" />
            <TelemetryGauge title="Separation Velocity" value={200} unit="m/s" />
            <TelemetryGauge title="Distance from Launch Pad" value={150} unit="km" />
          </div>
        );
      default:
        return <p>Stage data not available.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-4 bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Rocket Control System</h1>
          <div className="flex items-center bg-green-600 px-3 py-1 rounded">
            <Activity className="w-4 h-4 mr-2" />
            System Status: Online
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Clock className="w-6 h-6" />
          <span className="text-lg font-mono">T-00:00:00</span>
          <button className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700">ABORT</button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Critical Systems</h2>
            <div className="space-y-4">
              <SystemStatus icon={<Power />} name="Power Systems" status="Nominal" />
              <SystemStatus icon={<Radio />} name="Communication" status="Strong" />
              <SystemStatus icon={<Package />} name="Payload" status="Secured" />
              <SystemStatus icon={<AlertTriangle />} name="Warnings" status="None" />
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Telemetry</h2>
            <div className="space-y-4">
              <SystemStatus icon={<Thermometer />} name="Temperature" status="72 °C" />
              <SystemStatus icon={<Wind />} name="Wind Speed" status="12 km/h" />
            </div>
          </div>
        </div>

        <div className="col-span-6 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-96">
            <h2 className="text-xl font-bold mb-4">Telemetry Display</h2>
            {renderStageUI()}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Launch Sequence Control</h2>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((stage) => (
                <ControlButton
                  key={stage}
                  title={["Pre-Launch Check", "Engine Ignition", "Launch", "Stage Separation"][stage - 1]}
                  active={currentStage === stage}
                  onClick={() => handleStageChange(stage)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">System Alerts</h2>
            <div className="space-y-2">
              <Alert message="All systems nominal" type="success" />
              <Alert message="Weather conditions optimal" type="info" />
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Activity Log</h2>
            <LogEntry time={<span>10:00:01</span>} message="Pre-launch checks initiated." />
            <LogEntry time={<span>10:15:23</span>} message="Engine ignition sequence started." />
          </div>
        </div>
      </div>

      {/* Thrust Performance and Altitude Line Charts */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Thrust Performance</h2>
          <LineChart title="Thrust" labels={["T0", "T1", "T2", "T3", "T4", "T5"]} data={[20, 40, 60, 80, 100, 120]} color="#FF6384" />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Altitude</h2>
          <LineChart title="Altitude" labels={["T0", "T1", "T2", "T3", "T4", "T5"]} data={[0, 5, 15, 30, 45, 60]} color="#36A2EB" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
