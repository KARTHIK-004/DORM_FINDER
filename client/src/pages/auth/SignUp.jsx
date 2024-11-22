import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Check,
  X,
  UserPlus,
  GraduationCap,
  Building2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { signUp } from "@/utils/api.js";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      { regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score) => {
    if (score === 0) return "bg-gray-200";
    if (score <= 2) return "bg-red-500";
    if (score <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (score) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score <= 4) return "Medium password";
    return "Strong password";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !userType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (strengthScore < 5) {
      toast({
        title: "Weak Password",
        description: "Please choose a stronger password.",
        variant: "warning",
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = await signUp(name, email, password, userType);
      localStorage.setItem("token", data.token);
      toast({
        title: "Account Created",
        description: "Your account has been successfully created!",
        variant: "success",
      });
      navigate("/sign-in");
    } catch (err) {
      setError(err.message || "An error occurred during sign up");
      toast({
        title: "Sign Up Failed",
        description: err.message || "An error occurred during sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    toast({
      title: "Google Sign-Up",
      description: "Google Sign-Up functionality not implemented yet.",
      variant: "warning",
    });
  };

  const userTypeOptions = [
    {
      value: "student",
      label: "Student",
      icon: <GraduationCap className="mb-3 h-6 w-6" />,
    },
    {
      value: "agent",
      label: "Agent",
      icon: <Building2 className="mb-3 h-6 w-6" />,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen py-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center">
            Sign up to start using our services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>I am a</Label>
              <RadioGroup
                options={userTypeOptions}
                value={userType}
                onChange={setUserType}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  className="pr-10"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {isVisible ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            {password && (
              <>
                <div className="space-y-2">
                  <div
                    className="h-2 w-full rounded-full bg-gray-200"
                    role="progressbar"
                    aria-valuenow={strengthScore}
                    aria-valuemin={0}
                    aria-valuemax={5}
                  >
                    <div
                      className={`h-full rounded-full ${getStrengthColor(
                        strengthScore
                      )} transition-all duration-300`}
                      style={{ width: `${(strengthScore / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium">
                    {getStrengthText(strengthScore)}
                  </p>
                </div>

                <ul className="space-y-1 text-sm">
                  {strength.map((req, index) => (
                    <li key={index} className="flex items-center">
                      {req.met ? (
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <X className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span
                        className={req.met ? "text-green-700" : "text-gray-600"}
                      >
                        {req.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignUp}
            >
              Sign Up with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
