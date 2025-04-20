import Navbar from "@/components/Navbar";

const Aboutp = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">About of the Project</h1>
          <p className="text-muted-foreground mt-1">
          CrimeSight is an intelligent crime analytics platform designed to predict, visualize, and analyze cyber crime trends across cities using historical data and advanced machine learning models.

Our system offers a robust dashboard that helps users, law enforcement agencies, and researchers gain actionable insights into the nature, frequency, and distribution of cyber crimes.
          </p>
        </div>

        <div className="space-y-6 text-muted-foreground">
        <h1 className="text-3xl font-bold">🔍 Key Features:</h1>
          <p>
          City-wise Crime Rate Prediction:
Uses ML algorithms to forecast the likelihood of cyber crimes in various cities based on historical data trends.


          </p>

          <p>
          Interactive Crime Dashboard:
          A visually engaging dashboard that includes real-time charts (line and pie graphs), top cities with high cyber crime rates, and frequently occurring crime types., responsive, and accessible experiences.
          </p>

          <p>
            <strong>Crime Category Analysis:
            :</strong> Breaks down crime statistics by category (e.g., fraud, hacking, phishing) for each major city to understand the most common threats.
          </p>

          <p>
          Dynamic Visualizations:
Live charts and statistical cards make data interpretation easy. Pie charts display category-wise distributions, while line charts highlight trends over time.

Top Cities List:
Highlights areas with the highest reported cyber crimes and gives deeper insights into each city’s cyber crime patterns.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Aboutp;
