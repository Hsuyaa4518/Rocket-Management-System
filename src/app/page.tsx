'use client'
import React, { useState } from 'react';
import {AlertTriangle, Clock, Thermometer, Wind, Activity, Package, Radio, Power } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC = () => {
  const data = {
    labels: ['T-3', 'T-2', 'T-1', 'Launch', 'T+1', 'T+2', 'T+3','T+4','T+5','T+6','T+7', 'T+8'],
    datasets: [
      {
        label: 'Thrust Level (%)',
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        borderRadius: 8,
        data: [20, 35, 60, 100, 80, 55, 30, 76, 53, 23, 54, 78 ],
        barPercentage: 0.5,
        categoryPercentage: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
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
    <div style={{ width: '100%', height: '500px', padding: '20px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

interface SystemStatusProps {
  icon: React.ReactNode;
  name: string;
  status: string;
}

interface TelemetryGaugeProps {
  title: string;
  value: number;
  unit: string;
}

interface ControlButtonProps {
  stage: string;
  title: string;
  active: boolean;
  onClick: () => void;
}

interface AlertProps {
  message: string;
  type: string;
}

interface LogEntryProps {
  time: React.ReactNode;
  message: string;
}



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
      {/* Header Bar */}
      <header className="flex justify-between items-center mb-4 bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Rocket Control System</h1>
          <div className="flex items-center bg-green-600 px-3 py-1 rounded">
            <Activity className="w-4 h-4 mr-2" />
            System Status: Online
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <Clock className="w-6 h-6" />
          <span>T-00:00:00</span>
          <button className="bg-red-600 px-4 py-2 rounded font-bold">ABORT</button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Critical Systems</h2>
            <div className="space-y-4">
              <SystemStatus icon={<Power />} name="Power Systems" status="Nominal" />
              <SystemStatus icon={<Radio />} name="Communication" status="Strong" />
              <SystemStatus icon={<Package />} name="Payload" status="Secured" />
              <SystemStatus icon={<AlertTriangle />} name="Warnings" status="None" />
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Environmental</h2>
            <div className="space-y-4">
              <SystemStatus icon={<Thermometer />} name="Temperature" status="24°C" />
              <SystemStatus icon={<Wind />} name="Wind Speed" status="12 km/h" />
            </div>
          </div>
        </div>

        <div className="col-span-6 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg h-96">
            <h2 className="text-xl font-bold mb-4">Telemetry Display</h2>
            {renderStageUI()}
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Launch Sequence Control</h2>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((stage) => (
                <ControlButton
                  key={stage}
                  stage={`${stage}`}
                  title={["Pre-Launch Check", "Engine Ignition", "Launch", "Stage Separation"][stage - 1]}
                  active={currentStage === stage}
                  onClick={() => handleStageChange(stage)}
                />
              ))
              }
              {currentStage === 3 && (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Thrust Level Over Time</h2>
    <BarChart />
  </div>
)}

            </div>
          </div>
        </div>

        <div className="col-span-3 space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">System Alerts</h2>
            <div className="space-y-2">
              <Alert message="All systems nominal" type="success" />
              <Alert message="Weather conditions optimal" type="info" />
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg h-64">
            <h2 className="text-xl font-bold mb-4">Data Log</h2>
            <div className="space-y-2 text-sm">
              <LogEntry time="10:45:23" message="Telemetry system check complete" />
              <LogEntry time="10:45:20" message="Navigation systems initialized" />
              <LogEntry time="10:45:15" message="Power systems online" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemStatus: React.FC<SystemStatusProps> = ({ icon, name, status }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      {icon}
      <span className="ml-2">{name}</span>
    </div>
    <span className="text-green-400">{status}</span>
  </div>
);

const TelemetryGauge: React.FC<TelemetryGaugeProps> = ({ title, value, unit }) => (
  <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
    <div className="flex justify-between items-center mb-2">
      <span>{title}</span>
      <span className="text-green-400">{value}{unit}</span>
    </div>
    <div className="w-full bg-gray-600 rounded-full h-2">
      <div 
        className="bg-green-500 rounded-full h-2"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const ControlButton: React.FC<ControlButtonProps> = ({ stage, title, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-lg text-center ${
      active ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
    }`}
  >
    <h3 className="text-lg font-bold">{title}</h3>
    <p className="text-sm text-gray-300">Stage {stage}</p>
  </button>
);

const Alert: React.FC<AlertProps> = ({ message, type }) => (
  <div className={`p-2 rounded ${type === 'success' ? 'bg-green-600' : type === 'info' ? 'bg-blue-600' : 'bg-red-600'}`}>
    {message}
  </div>
);

const LogEntry: React.FC<LogEntryProps> = ({ time, message }) => (
  <div className="flex justify-between">
    <span className="text-gray-400">{time}</span>
    <span>{message}</span>
  </div>
);

export default DashboardLayout;
