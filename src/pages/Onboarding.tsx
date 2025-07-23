import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, Target, Calendar, Globe, CheckCircle2 } from "lucide-react";

const WEEKDAYS = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Asia/Shanghai", label: "China Standard Time (CST)" },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    monthlyGoal: "",
    dailyHours: "",
    workingDays: [] as string[],
    timezone: "",
  });

  const { toast } = useToast();

  const handleWorkingDayChange = (dayId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        workingDays: [...formData.workingDays, dayId],
      });
    } else {
      setFormData({
        ...formData,
        workingDays: formData.workingDays.filter((id) => id !== dayId),
      });
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinish = () => {
    // Implement onboarding completion logic here
    toast({
      title: "Welcome to Chronos!",
      description: "Your preferences have been saved. Redirecting to dashboard...",
    });
    // Redirect to dashboard
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.monthlyGoal.trim() !== "";
      case 2:
        return formData.dailyHours.trim() !== "";
      case 3:
        return formData.workingDays.length > 0;
      case 4:
        return formData.timezone !== "";
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="text-center mb-8">
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
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            Let's set up your workspace
          </h1>
          <p className="text-muted-foreground">
            Help us customize Chronos to fit your working style
          </p>
          
          {/* Progress Bar */}
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    stepNumber <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <Card className="chronos-card">
          <CardHeader>
            <div className="flex items-center space-x-3">
              {step === 1 && <Target className="h-6 w-6 text-primary" />}
              {step === 2 && <Clock className="h-6 w-6 text-primary" />}
              {step === 3 && <Calendar className="h-6 w-6 text-primary" />}
              {step === 4 && <Globe className="h-6 w-6 text-primary" />}
              <div>
                <CardTitle>
                  {step === 1 && "Monthly Goal"}
                  {step === 2 && "Daily Work Hours"}
                  {step === 3 && "Working Days"}
                  {step === 4 && "Timezone"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Set your monthly time tracking goal"}
                  {step === 2 && "Define your default daily working hours"}
                  {step === 3 && "Select your preferred working days"}
                  {step === 4 && "Choose your timezone for accurate tracking"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-goal">Monthly Goal (in hours)</Label>
                  <Input
                    id="monthly-goal"
                    type="number"
                    placeholder="e.g., 160"
                    value={formData.monthlyGoal}
                    onChange={(e) => setFormData({ ...formData, monthlyGoal: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    This helps us track your progress and provide insights
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="daily-hours">Default Daily Work Hours</Label>
                  <Input
                    id="daily-hours"
                    type="number"
                    step="0.5"
                    placeholder="e.g., 8"
                    value={formData.dailyHours}
                    onChange={(e) => setFormData({ ...formData, dailyHours: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    This will be used as the default when creating new entries
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Label>Select your preferred working days</Label>
                <div className="grid grid-cols-2 gap-4">
                  {WEEKDAYS.map((day) => (
                    <div key={day.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={day.id}
                        checked={formData.workingDays.includes(day.id)}
                        onCheckedChange={(checked) => 
                          handleWorkingDayChange(day.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={day.id}>{day.label}</Label>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  This helps us understand your work schedule and provide better insights
                </p>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={formData.timezone}
                    onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Ensures accurate time tracking across different locations
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              
              {step < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="chronos-button-primary"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  disabled={!isStepValid()}
                  className="chronos-button-primary"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Finish Setup
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}