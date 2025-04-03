
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getCityData, getCrimePercentages, getPredictedCrimeRate } from "@/utils/mockData";
import CrimeChart from "./CrimeChart";
import { Search, AlertTriangle } from "lucide-react";

const CrimePrediction = () => {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "";
  
  const [cityName, setCityName] = useState(initialCity);
  const [inputValue, setInputValue] = useState(initialCity);
  const [predictedTotal, setPredictedTotal] = useState<number | null>(null);
  const [crimeBreakdown, setCrimeBreakdown] = useState<{ category: string; percentage: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // When the component mounts or when initialCity changes, update the prediction if a city is provided
  useEffect(() => {
    if (initialCity) {
      handleSubmit();
    }
  }, [initialCity]);

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setCityName(inputValue);

    // Simulate API call with timeout
    setTimeout(() => {
      const cityData = getCityData(inputValue);
      
      if (!cityData) {
        toast({
          title: "City not found",
          description: `No data available for "${inputValue}"`,
          variant: "destructive"
        });
        setIsLoading(false);
        setPredictedTotal(null);
        setCrimeBreakdown([]);
        return;
      }

      const predicted = getPredictedCrimeRate(inputValue);
      setPredictedTotal(predicted);
      setCrimeBreakdown(getCrimePercentages(inputValue));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cyber Crime Rate Prediction</CardTitle>
          <CardDescription>
            Enter a city name to predict the cyber crime rate and view breakdown by category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter city name..."
                className="pl-8"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Submit"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {predictedTotal !== null && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-cyber-primary/10 to-cyber-secondary/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <span>Prediction Results for {cityName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-2xl font-bold flex items-center">
                  Predicted Total Crimes: <span className="ml-2 text-cyber-secondary">{predictedTotal}</span>
                </div>
                
                <div className="bg-cyber-primary/5 p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Percentage Breakdown of Crimes by Category:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {crimeBreakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.category}:</span>
                        <span className="font-medium">{item.percentage.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    This prediction is based on historical data and statistical modeling. Actual crime rates may vary based on current socioeconomic factors, law enforcement efforts, and reporting practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <CrimeChart type="pie" cityName={cityName} />
        </div>
      )}
    </div>
  );
};

export default CrimePrediction;
