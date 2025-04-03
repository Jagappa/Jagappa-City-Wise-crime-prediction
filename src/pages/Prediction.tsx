
import Navbar from "@/components/Navbar";
import CrimePrediction from "@/components/CrimePrediction";

const Prediction = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Crime Rate Prediction</h1>
          <p className="text-muted-foreground mt-1">
            Predict cyber crime rates and analyze crime category distribution for specific cities.
          </p>
        </div>
        
        <CrimePrediction />
      </main>
    </div>
  );
};

export default Prediction;
