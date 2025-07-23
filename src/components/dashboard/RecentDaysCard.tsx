import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DayEntry {
  date: string;
  hasEntries: boolean;
  hours?: number;
}

const mockRecentDays: DayEntry[] = [
  { date: "2024-01-22", hasEntries: true, hours: 8.5 },
  { date: "2024-01-21", hasEntries: false },
  { date: "2024-01-20", hasEntries: true, hours: 7.0 },
  { date: "2024-01-19", hasEntries: true, hours: 8.0 },
  { date: "2024-01-18", hasEntries: false },
];

export function RecentDaysCard() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      weekday: "short", 
      month: "short", 
      day: "numeric" 
    });
  };

  return (
    <Card className="chronos-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-primary" />
          <span>Recent Days Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockRecentDays.map((day) => (
            <div key={day.date} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                {day.hasEntries ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-medium">{formatDate(day.date)}</p>
                  {day.hasEntries && day.hours && (
                    <p className="text-xs text-muted-foreground">
                      {day.hours}h logged
                    </p>
                  )}
                </div>
              </div>
              {!day.hasEntries && (
                <Button variant="outline" size="sm" className="text-xs">
                  Add Entry
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}