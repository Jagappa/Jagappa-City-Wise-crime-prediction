
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CrimeStatsCard from "@/components/CrimeStatsCard";
import CrimeChart from "@/components/CrimeChart";
import { getTopCities } from "@/utils/mockData";
import { Shield, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  const topCities = getTopCities(5);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Cyber Crime Dashboard</h1>
          <div className="text-sm text-muted-foreground">Last updated: April 2, 2025</div>
        </div>
        
        <CrimeStatsCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <CrimeChart type="line" />
          <CrimeChart type="pie" cityName={topCities[0].city} />
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Cities by Crime Rate</CardTitle>
              <CardDescription>Cities with the highest reported cyber crime incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCities.map((city, index) => (
                  <div key={city.city} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-cyber-primary/10 text-cyber-primary font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{city.city}</div>
                        <div className="text-sm text-muted-foreground">
                          Most common: Fraud ({Math.round(city.fraud / city.total * 100)}%)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{city.total}</div>
                        <div className="text-sm text-muted-foreground">Total Cases</div>
                      </div>
                      <div className="flex justify-center items-center h-8 w-8 rounded-full bg-cyber-danger/10 text-cyber-danger">
                        <TrendingUp className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12 mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Shield className="h-5 w-5" />
            <span>CrimeSight - Cyber Crime Analytics Platform</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
