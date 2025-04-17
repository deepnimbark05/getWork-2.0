import {
    Chart,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    BarController,
    Title,
    Tooltip,
    Legend
  );
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let workersChartInstance = null;
let usersChartInstance = null;

const Dashboard = () => {
  const [workerData, setWorkerData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userStats, setUserStats] = useState({ totalUsers: 0, usersByMonth: [] });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'count'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch worker data
        const workersResponse = await axios.get('http://localhost:3001/api/workers');
        const workers = workersResponse.data;
        
        // Count workers by category
        const categoryCounts = workers.reduce((acc, worker) => {
          acc[worker.category] = (acc[worker.category] || 0) + 1;
          return acc;
        }, {});

        setWorkerData(categoryCounts);

        // Fetch user statistics
        const userStatsResponse = await axios.get('http://localhost:3001/api/users/stats');
        setUserStats(userStatsResponse.data);

        // Format user data for chart
        const formattedUserData = userStatsResponse.data.usersByMonth.map(item => ({
          month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          count: item.count,
          year: item._id.year,
          monthNum: item._id.month
        }));

        // Sort the data based on current sort settings
        const sortedData = sortUserData(formattedUserData);
        setUserData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortUserData = (data) => {
    return [...data].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.year, a.monthNum - 1);
        const dateB = new Date(b.year, b.monthNum - 1);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a.count - b.count : b.count - a.count;
      }
    });
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      // Toggle sort order if clicking the same sort type
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Change sort type and reset to ascending order
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    // Re-sort the data when sort settings change
    const sortedData = sortUserData(userData);
    setUserData(sortedData);
  }, [sortBy, sortOrder]);

  useEffect(() => {
    // Initialize charts when component mounts or data changes
    const initCharts = () => {
      // Workers Chart
      const ctx1 = document.getElementById('workersChart')?.getContext('2d');
      if (ctx1) {
        if (workersChartInstance) {
          workersChartInstance.destroy();
        }

        const categories = Object.keys(workerData);
        const counts = Object.values(workerData);

        workersChartInstance = new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: categories,
            datasets: [{
              label: 'Workers',
              data: counts,
              backgroundColor: 'orange'
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: { 
                ticks: { 
                  font: { size: 12 },
                  maxRotation: 45,
                  minRotation: 45
                } 
              },
              y: { 
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
      }

      // Users Chart
      const ctx2 = document.getElementById('usersChart')?.getContext('2d');
      if (ctx2) {
        if (usersChartInstance) {
          usersChartInstance.destroy();
        }

        const userMonths = userData.map(item => item.month);
        const userCounts = userData.map(item => item.count);

        usersChartInstance = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: userMonths,
            datasets: [{
              label: 'User Signups',
              data: userCounts,
              backgroundColor: 'red'
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: { 
                ticks: { 
                  font: { size: 12 },
                  maxRotation: 45,
                  minRotation: 45
                } 
              },
              y: { 
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
        });
      }
    };

    if (!loading) {
      initCharts();
    }

    // Cleanup on unmount
    return () => {
      if (workersChartInstance) {
        workersChartInstance.destroy();
        workersChartInstance = null;
      }
      if (usersChartInstance) {
        usersChartInstance.destroy();
        usersChartInstance = null;
      }
    };
  }, [workerData, userData, loading]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Top Bar */}
      <div className="bg-white flex justify-between items-center p-3 border-b-2 border-black h-12 fixed top-0 w-full left-0 z-50">
        <h2 className="text-orange-600 m-0 text-xl">
          get<span className="text-black">Work</span>
        </h2>
        <h2 className="m-0 text-xl">Admin Panel</h2>
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Home
        </Link>
      </div>

      {/* Container Wrapper */}
      <div className="flex pt-12">
        {/* Sidebar */}
        <div className="w-40 h-[calc(100vh-3rem)] bg-gray-900 text-white fixed top-12 left-0 overflow-y-auto pt-5 shadow-lg">
          <Link
            to="/dashboard"
            className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold"
          >
            Dashboard
          </Link>
          <Link
            to="/Carousel"
            className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold"
          >
            Carousel
          </Link>
          <Link
            to="/Reviews"
            className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold"
          >
            Reviews
          </Link>
          <Link
            to="/Workers"
            className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold"
          >
            Workers
          </Link>
        </div>

        {/* Main Content */}
        <div className="ml-40 w-[calc(100%-10rem)]">
          <div className="p-5">
            <div className="container mt-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1">
                  <div className="flex flex-row items-center p-5 bg-white rounded shadow hover:shadow-md transition-shadow">
                    <img src="images/user.png" alt="Users" className="w-12 h-12 rounded-full" />
                    <div className="ml-4">
                      <h4 className="text-xl font-bold">{userStats.totalUsers}</h4>
                      <p className="text-gray-600">Total Users</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-row items-center p-5 bg-white rounded shadow hover:shadow-md transition-shadow">
                    <img src="images/worker.png" alt="Workers" className="w-12 h-12 rounded-full" />
                    <div className="ml-4">
                      <h4 className="text-xl font-bold">{Object.values(workerData).reduce((a, b) => a + b, 0)}</h4>
                      <p className="text-gray-600">Total Workers</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-row items-center p-5 bg-white rounded shadow hover:shadow-md transition-shadow">
                    <img src="images/cancel.png" alt="Canceled" className="w-12 h-12 rounded-full" />
                    <div className="ml-4">
                      <h4 className="text-xl font-bold">65</h4>
                      <p className="text-gray-600">Total Canceled</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-row items-center p-5 bg-white rounded shadow hover:shadow-md transition-shadow">
                    <img src="images/revenue.png" alt="Revenue" className="w-12 h-12 rounded-full" />
                    <div className="ml-4">
                      <h4 className="text-xl font-bold">$128</h4>
                      <p className="text-gray-600">Total Revenue</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="flex flex-col md:flex-row justify-around mt-12 gap-4">
                <div className="bg-white p-5 rounded-lg shadow-md w-full md:w-[48%] flex flex-col items-center gap-4">
                  <img src="images/graph.png" alt="Graph" className="w-12 h-12 rounded-full" />
                  <h4 className="text-lg font-bold">Workers by Category</h4>
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                  ) : (
                    <canvas id="workersChart"></canvas>
                  )}
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md w-full md:w-[48%] flex flex-col items-center gap-4">
                  <div className="flex justify-between items-center w-full">
                    <img src="images/graph.png" alt="Graph" className="w-12 h-12 rounded-full" />
                    <h4 className="text-lg font-bold">User Signups by Month</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSortChange('date')}
                        className={`px-3 py-1 rounded ${
                          sortBy === 'date'
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                      <button
                        onClick={() => handleSortChange('count')}
                        className={`px-3 py-1 rounded ${
                          sortBy === 'count'
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Count {sortBy === 'count' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </button>
                    </div>
                  </div>
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                    </div>
                  ) : (
                    <canvas id="usersChart"></canvas>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
