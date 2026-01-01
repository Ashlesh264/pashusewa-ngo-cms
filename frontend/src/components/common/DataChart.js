import { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Loader from "./Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

function DataChart(props) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.users && props.users.length > 0) {
      const counts = { admin:0, volunteer: 0, staff: 0, donor: 0 };
      props.users.forEach(u => {
        const role = u.role?.toLowerCase();
        if (counts[role] !== undefined) counts[role]++;
      });
      setChartData ({
        labels: ['Admin', 'Volunteer', 'Donor', 'Staff'],
        datasets: [{
          label: 'User Roles',
          data: [counts.admin, counts.volunteer, counts.donor, counts.staff],
          backgroundColor: ['#E74C3C', '#2ECC71', '#3498DB', '#F39C12'],
          hoverOffset: 10,
          hoverBackgroundColor: ['#df2d19', '#27ae60', '#2980b9', '#e67e22'],
          borderWidth: 1,
          hoverBorderWidth: 4,
          hoverBorderColor: '#ffffff'
        }]
      });
      setLoading(false);
    }
  }, [props.users]);

  if (loading && !chartData) return <Loader />;

  return (
    <div className="dashboard-content-inner">
      <div className="admin-analytics-section">
        <div className="dashboard-grid">
          <div className="stat-card chart-card">
            <h3>User Role Distribution</h3>
            <div style={{ width: '250px', margin: '0 auto' }}>
              {chartData ? (
                <Pie data={chartData} />
              ) : (<p>No data available</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataChart;
