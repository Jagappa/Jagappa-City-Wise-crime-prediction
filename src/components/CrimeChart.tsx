import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { getCrimePercentages } from "@/utils/mockData";

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

const CrimePieChart = ({ cityName }: { cityName: string }) => {
  const crimePercentages = getCrimePercentages(cityName);
  
  // Filter out categories with very small percentages to keep chart readable
  const significantCategories = crimePercentages
    .filter(item => item.percentage > 1)
    .map(item => ({
      name: item.category,
      value: parseFloat(item.percentage.toFixed(1))
    }));
  
  // Group small categories as "Other"
  const smallCategories = crimePercentages.filter(item => item.percentage <= 1);
  if (smallCategories.length > 0) {
    const otherValue = smallCategories.reduce((sum, item) => sum + item.percentage, 0);
    significantCategories.push({
      name: "Other",
      value: parseFloat(otherValue.toFixed(1))
    });
  }

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Crime Categories for {cityName}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={significantCategories}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {significantCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// This is a placeholder for a trends chart that would show crime over time
const CrimeTrendsChart = () => {
  const data = [
    { name: "Jan", fraud: 400, extortion: 240, sexualExploitation: 150 },
    { name: "Feb", fraud: 300, extortion: 139, sexualExploitation: 130 },
    { name: "Mar", fraud: 200, extortion: 180, sexualExploitation: 190 },
    { name: "Apr", fraud: 278, extortion: 220, sexualExploitation: 160 },
    { name: "May", fraud: 189, extortion: 280, sexualExploitation: 140 },
    { name: "Jun", fraud: 239, extortion: 300, sexualExploitation: 120 },
  ];

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Crime Trends (6 Month)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="fraud" stroke="#0088FE" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="extortion" stroke="#00C49F" />
            <Line type="monotone" dataKey="sexualExploitation" stroke="#FFBB28" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// This is a reusable component that can be configured to show different types of charts
interface CrimeChartProps {
  type: "pie" | "line" | "bar";
  cityName?: string;
}

const CrimeChart = ({ type, cityName = "Vishakhapatnam" }: CrimeChartProps) => {
  switch (type) {
    case "pie":
      return <CrimePieChart cityName={cityName} />;
    case "line":
    default:
      return <CrimeTrendsChart />;
  }
};

export default CrimeChart;
