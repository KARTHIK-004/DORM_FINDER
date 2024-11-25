import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 15000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 22000 },
  { month: "Apr", revenue: 20000 },
  { month: "May", revenue: 25000 },
  { month: "Jun", revenue: 28000 },
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Revenue</CardTitle>
        <CardDescription>Your revenue over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <BarChart
            data={revenueData}
            width={500}
            height={300}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  );
}
