
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCitiesList, getCityData } from "@/utils/mockData";
import { BarChart2, Search } from "lucide-react";

const CitiesList = () => {
  const allCities = getCitiesList();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter cities based on search term
  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCities = filteredCities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search cities..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>City Name</TableHead>
              <TableHead className="text-right">Total Crime</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCities.length > 0 ? (
              currentCities.map((city, index) => {
                const cityData = getCityData(city);
                const totalCrime = cityData?.total || 0;
                
                return (
                  <TableRow key={city}>
                    <TableCell className="font-medium">{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>{city}</TableCell>
                    <TableCell className="text-right">{totalCrime}</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/prediction?city=${encodeURIComponent(city)}`}>
                        <Button variant="outline" size="sm" className="h-8">
                          <BarChart2 className="h-4 w-4 mr-1" />
                          Analyze
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No cities found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default CitiesList;
