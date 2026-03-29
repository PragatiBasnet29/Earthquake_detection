import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import Chart from 'react-apexcharts';

// ─── Constants ────────────────────────────────────────────────────────────────
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '/api';
const POLL_INTERVAL_MS = 500;
const MAX_HISTORY_POINTS = 60; // keep last 60 points on the chart
const QUAKE_THRESHOLD = 3;

// ─── DataCard ─────────────────────────────────────────────────────────────────
const DataCard = ({ label, value, unit = '' }) => {
  const prevRef = useRef(value);
  const isRising = value >= prevRef.current;
  useEffect(() => { prevRef.current = value; }, [value]);

  return (
    <div className="flex-1 min-w-[160px] max-w-[220px] bg-white border border-gray-100 p-6 rounded-2xl shadow-md
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-center">
      <div className="flex items-center justify-center mb-3 text-[#0492c2]">
        <FontAwesomeIcon
          icon={faTachometerAlt}
          style={{
            fontSize: '2.5rem',
            transition: 'transform 0.4s ease',
            transform: isRising ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        />
      </div>
      <h3 className="text-base font-semibold text-gray-600 mb-1">{label} Axis</h3>
      <p className={`text-3xl font-bold transition-colors duration-300 ${isRising ? 'text-emerald-500' : 'text-red-500'}`}>
        {typeof value === 'number' ? value.toFixed(3) : '—'}{unit}
      </p>
    </div>
  );
};

// ─── EarthquakeAlert Banner ───────────────────────────────────────────────────
const AlertBanner = ({ active }) => {
  if (!active) return null;
  return (
    <div className="mb-8 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-6 py-4 animate-pulse">
      <span className="text-2xl">⚠️</span>
      <div>
        <p className="font-bold text-lg">Earthquake Detected!</p>
        <p className="text-sm font-medium">Sensor readings exceed safety threshold. Stay safe!</p>
      </div>
    </div>
  );
};

// ─── LiveData page ────────────────────────────────────────────────────────────
const LiveData = () => {
  const [latestData, setLatestData] = useState({ x: 0, y: 0, z: 9.81 });
  const [quakeAlert, setQuakeAlert] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting'); // 'connecting' | 'live' | 'error'

  // Use refs for history so the interval closure always sees up-to-date arrays
  // without triggering infinite re-renders.
  const histXRef = useRef([]);
  const histYRef = useRef([]);
  const histZRef = useRef([]);
  const labelsRef = useRef([]);

  // Dedicated chart state — updated only when we have new points
  const [chartSeries, setChartSeries] = useState([
    { name: 'X Axis', data: [] },
    { name: 'Y Axis', data: [] },
    { name: 'Z Axis', data: [] },
  ]);

  const chartOptions = {
    colors: ['#E91E63', '#FF9800', '#0492c2'],
    chart: {
      id: 'seismograph',
      type: 'line',
      animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 400 } },
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: { width: 2, curve: 'smooth' },
    xaxis: {
      type: 'datetime',
      labels: { datetimeFormatter: { minute: 'HH:mm', second: 'HH:mm:ss' } },
      title: { text: 'Time' },
    },
    yaxis: { title: { text: 'Acceleration (g)' }, decimalsInFloat: 3 },
    legend: { position: 'top' },
    tooltip: { x: { format: 'HH:mm:ss' } },
    grid: { borderColor: '#e5e7eb' },
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/`);
      const { x, y, z } = response.data;

      setLatestData({ x, y, z });
      setConnectionStatus('live');

      // Check quake threshold
      const isQuake =
        Math.abs(x) > QUAKE_THRESHOLD ||
        Math.abs(y) > QUAKE_THRESHOLD ||
        Math.abs(z - 9.81) > QUAKE_THRESHOLD; // compare Z against gravity baseline
      setQuakeAlert(isQuake);

      // Append to refs (no re-render on change)
      const now = new Date().getTime();
      labelsRef.current = [...labelsRef.current, now].slice(-MAX_HISTORY_POINTS);
      histXRef.current  = [...histXRef.current,  x].slice(-MAX_HISTORY_POINTS);
      histYRef.current  = [...histYRef.current,  y].slice(-MAX_HISTORY_POINTS);
      histZRef.current  = [...histZRef.current,  z].slice(-MAX_HISTORY_POINTS);

      // Build [timestamp, value] pairs for ApexCharts datetime x-axis
      const xSeries = labelsRef.current.map((t, i) => [t, histXRef.current[i]]);
      const ySeries = labelsRef.current.map((t, i) => [t, histYRef.current[i]]);
      const zSeries = labelsRef.current.map((t, i) => [t, histZRef.current[i]]);

      setChartSeries([
        { name: 'X Axis', data: xSeries },
        { name: 'Y Axis', data: ySeries },
        { name: 'Z Axis', data: zSeries },
      ]);
    } catch (error) {
      console.error('Error fetching seismic data:', error);
      setConnectionStatus('error');
    }
  }, []); // stable — no dependencies on state

  useEffect(() => {
    fetchData(); // initial fetch immediately
    const intervalId = setInterval(fetchData, POLL_INTERVAL_MS);
    return () => clearInterval(intervalId); // cleanup on unmount
  }, [fetchData]); // only re-runs if fetchData changes (it won't)

  return (
    <div className="px-6 py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-[#0492c2]">Live Sensor Data</h1>
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
            ${connectionStatus === 'live'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : connectionStatus === 'error'
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
            <span className={`w-2 h-2 rounded-full ${
              connectionStatus === 'live' ? 'bg-emerald-500 animate-pulse'
              : connectionStatus === 'error' ? 'bg-red-500'
              : 'bg-yellow-500 animate-pulse'}`} />
            {connectionStatus === 'live' ? 'Live' : connectionStatus === 'error' ? 'Backend Offline' : 'Connecting…'}
          </span>
        </div>

        {/* Earthquake Alert Banner */}
        <AlertBanner active={quakeAlert} />

        {/* Data Cards */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <DataCard label="X" value={latestData.x} />
          <DataCard label="Y" value={latestData.y} />
          <DataCard label="Z" value={latestData.z} unit=" g" />
        </div>

        {/* Seismograph Chart */}
        <div className="bg-gray-50 rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#0492c2]">Seismograph</h2>
            <span className="text-xs text-gray-400">Last {MAX_HISTORY_POINTS} readings · polling every {POLL_INTERVAL_MS}ms</span>
          </div>
          {chartSeries[0].data.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
              {connectionStatus === 'error'
                ? '⚠️ Cannot connect to backend at ' + BACKEND_URL
                : '⏳ Waiting for data…'}
            </div>
          ) : (
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="line"
              height={320}
              width="100%"
            />
          )}
        </div>

        {/* Backend info */}
        {connectionStatus === 'error' && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5 text-sm text-red-700">
            <p className="font-semibold mb-1">Backend not reachable</p>
            <p>Make sure the backend server is running:</p>
            <pre className="mt-2 bg-red-100 rounded-lg p-3 text-xs overflow-auto">cd backend{'\n'}node app.js</pre>
            <p className="mt-2">Expected backend URL: <code className="font-mono">{BACKEND_URL}</code></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveData;
