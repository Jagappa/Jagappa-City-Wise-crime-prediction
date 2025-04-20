import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Navigate, useNavigate } from "react-router-dom"; // ⬅️ Import useNavigate
import Navbar from "@/components/Navbar";

const UserProfile = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate(); // ⬅️ Hook to navigate

  const handleSignOut = async () => {
    await signOut();      // ⬅️ Call logout
    navigate("/");        // ⬅️ Redirect to your Auth page
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  const avatarText = user.email ? user.email.charAt(0).toUpperCase() : "?";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{avatarText}</AvatarFallback>
              </Avatar>
              <span>Your Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Email</span>
              <span>{user.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Account ID</span>
              <span className="text-sm break-all">{user.id}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignOut} variant="outline" disabled={loading} className="w-full">
              {loading ? "Signing out..." : "Sign Out"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
