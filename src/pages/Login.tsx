import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement login logic here
    toast({
      title: "Login attempted",
      description: "Login functionality will be implemented soon.",
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match.",
        variant: "destructive",
      });
      return;
    }
    // Implement sign up logic here
    toast({
      title: "Sign up attempted",
      description: "Account creation functionality will be implemented soon.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="/assets/logo_chronos.png" 
              alt="Chronos Logo" 
              className="h-12 w-12"
            />
            <img 
              src="/assets/logo_chronos_text.png"
              alt="Chronos" 
              className="h-8"
            />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome to Chronos
          </h2>
          <p className="text-muted-foreground mt-2">
            Track your time with precision and clarity
          </p>
        </div>

        {/* Auth Tabs */}
        <Card className="chronos-card">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your credentials to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="text-right">
                    <Button variant="link" className="p-0 h-auto text-sm text-primary">
                      Forgot password?
                    </Button>
                  </div>
                  <Button type="submit" className="w-full chronos-button-primary">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                  Join Chronos and start tracking your time efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full chronos-button-primary">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}