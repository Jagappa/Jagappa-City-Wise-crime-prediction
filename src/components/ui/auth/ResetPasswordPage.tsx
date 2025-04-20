import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ useNavigate added
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");

    const setSession = async () => {
      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (error) {
          setError("Failed to validate session. Please try again.");
        }
      } else {
        setError("Missing access token. Try requesting a new reset link.");
      }
    };

    setSession();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully!");
      setTimeout(() => {
        navigate("/auth"); // ✅ Change this to your actual sign-in route
      }, 2000); // Redirect after 2 seconds
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleReset}
        className="space-y-4 bg-white p-6 rounded-md shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold">Reset Your Password</h2>
        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full">Reset Password</Button>

        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">Back to login?</p>
          <Link to="/auth" className="text-blue-600 hover:underline">
            Go to Auth Page
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
