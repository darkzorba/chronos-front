import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentDaysCard } from "@/components/dashboard/RecentDaysCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { EntriesTable } from "@/components/dashboard/EntriesTable";
import { 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  Zap,
  AlertCircle
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your time tracking overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Hours"
          value="124.5h"
          description="Hours logged this month"
          icon={Clock}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Monthly Goal"
          value="160h"
          description="Your current goal"
          icon={Target}
        />
        <StatsCard
          title="Current Streak"
          value="5 days"
          description="Consecutive days with entries"
          icon={Zap}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Missing Days"
          value="3"
          description="Days without entries this month"
          icon={AlertCircle}
          className="border-warning/20 bg-warning-light/10"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <RecentDaysCard />
          <ProgressCard
            title="Monthly Progress"
            current={124.5}
            target={160}
            unit="h"
            description="You're on track to meet your monthly goal!"
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          <EntriesTable />
        </div>
      </div>
    </div>
  );
}