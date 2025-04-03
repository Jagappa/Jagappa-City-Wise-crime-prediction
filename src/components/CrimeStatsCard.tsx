
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTopCities } from "@/utils/mockData";
import { BarChart, LockKeyhole, TrendingUp, AlertCircle } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
}

const StatsCard = ({ title, value, description, icon, trend, trendValue }: StatsCardProps) => {
  return (
    <Card className="card-gradient">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${trend === "up" ? "text-cyber-danger" : "text-green-600"}`}>
            {trend === "up" ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />}
            <span>{trendValue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const CrimeStatsCard = () => {
  const topCities = getTopCities(3);
  const totalIncidents = topCities.reduce((sum, city) => sum + city.total, 0);
  const highestCity = topCities[0];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <StatsCard 
        title="Total Cyber Crime Incidents"
        value={totalIncidents.toString()}
        description="Total reported incidents in top cities"
        icon={<BarChart className="h-4 w-4 text-muted-foreground" />}
        trend="up"
        trendValue="12% from last year"
      />
      
      <StatsCard 
        title="Highest Crime City"
        value={highestCity.city}
        description={`${highestCity.total} total incidents reported`}
        icon={<AlertCircle className="h-4 w-4 text-cyber-danger" />}
      />
      
      <StatsCard 
        title="Most Common Crime"
        value="Fraud"
        description="Accounts for 47% of all cases"
        icon={<LockKeyhole className="h-4 w-4 text-muted-foreground" />}
      />
      
      <StatsCard 
        title="Crime Detection Rate"
        value="78%"
        description="Increase in successful investigations"
        icon={<TrendingUp className="h-4 w-4 text-green-600" />}
        trend="up"
        trendValue="5% from previous quarter"
      />
    </div>
  );
};

export default CrimeStatsCard;
