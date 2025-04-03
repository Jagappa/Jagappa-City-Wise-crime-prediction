
import Navbar from "@/components/Navbar";
import CitiesList from "@/components/CitiesList";

const Cities = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">List of Cities</h1>
          <p className="text-muted-foreground mt-1">
            Browse the list of cities with cyber crime data. Click "Analyze" to view detailed statistics.
          </p>
        </div>
        
        <CitiesList />
      </main>
    </div>
  );
};

export default Cities;
