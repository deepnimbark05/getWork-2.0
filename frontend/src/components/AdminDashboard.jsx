import { Chart } from 'chart.js';
import { useEffect } from 'react';

const AdminDashboard = () => {
  useEffect(() => {
    // Initialize charts when component mounts
    const initCharts = () => {
      // Workers Chart
      const ctx1 = document.getElementById('workersChart')?.getContext('2d');
      if (ctx1) {
        new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: ['Old Care', 'House Cleaning', 'Cook', 'Baby Sitting', 'Home Tuition', 'Physiotherapist'],
            datasets: [{
              label: 'Workers',
              data: [50, 70, 30, 60, 55, 20],
              backgroundColor: 'orange'
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: { ticks: { font: { size: 12 } } },
              y: { beginAtZero: true }
            }
          }
        });
      }

      // Users Chart
      const ctx2 = document.getElementById('usersChart')?.getContext('2d');
      if (ctx2) {
        new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: ['Old Care', 'House Cleaning', 'Cook', 'Baby Sitting', 'Home Tuition', 'Physiotherapist'],
            datasets: [{
              label: 'Users',
              data: [80, 60, 25, 40, 55, 30],
              backgroundColor: 'red'
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: { ticks: { font: { size: 12 } } },
              y: { beginAtZero: true }
            }
          }
        });
      }
    };

    initCharts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Top Bar */}
      <div className="bg-white flex justify-between items-center p-3 border-b-2 border-black h-12 fixed top-0 w-full left-0 z-50">
        <h2 className="text-orange-600 m-0 text-xl">
          get<span className="text-black">Work</span>
        </h2>
        <h2 className="m-0 text-xl">Admin Panel</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Home
        </button>
      </div>

      {/* Container Wrapper */}
      <div className="flex pt-12">
        {/* Sidebar */}
        <div className="w-40 h-[calc(100vh-3rem)] bg-gray-900 text-white fixed top-12 left-0 overflow-y-auto pt-5 shadow-lg">
          <a href="AdminHome.jsp" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Dashboard
          </a>
          <a href="Carousel.jsp" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Carousel
          </a>
          <a href="Reviews.jsp" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Reviews
          </a>
          <a href="Workers.jsp" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Workers
          </a>
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
                      <h4 className="text-xl font-bold">746</h4>
                      <p className="text-gray-600">Total Users</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex flex-row items-center p-5 bg-white rounded shadow hover:shadow-md transition-shadow">
                    <img src="images/worker.png" alt="Workers" className="w-12 h-12 rounded-full" />
                    <div className="ml-4">
                      <h4 className="text-xl font-bold">357</h4>
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
                  <h4 className="text-lg font-bold">Workers</h4>
                  <canvas id="workersChart"></canvas>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-md w-full md:w-[48%] flex flex-col items-center gap-4">
                  <img src="images/graph.png" alt="Graph" className="w-12 h-12 rounded-full" />
                  <h4 className="text-lg font-bold">Users</h4>
                  <canvas id="usersChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
