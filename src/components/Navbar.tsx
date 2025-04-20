
import { Link } from "react-router-dom";
import { Shield, BarChart, List } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-cyber-primary text-white p-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="text-xl font-bold">Crime Rate Prediction</span>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/index" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors">
            <BarChart className="h-4 w-4" />
            <span className="text-1xl ">Home</span>
          </Link>
         
          <Link to="/cities" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors">
            <List className="h-4 w-4" />
            <span>Cities</span>
          </Link>
          <Link to="/prediction" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors">
            <Shield className="h-4 w-4" />
            <span>Prediction</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors">
            <BarChart className="h-4 w-4" />
            <span>Profile</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors">
  <Shield className="h-4 w-4" />
  <span>About</span>
</Link>

          {/* <Link to="/" className="flex items-center space-x-1 hover:text-cyan-200 transition-colors">
            <BarChart className="h-4 w-4" />
            <span>Logout</span>
          </Link> */}
          
        </div>
        
        <div className="md:hidden">
          {/* Mobile menu button - in a real app would toggle a dropdown */}
          <button className="focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
