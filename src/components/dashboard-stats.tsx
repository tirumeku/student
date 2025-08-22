'use client';

import type { Student } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';
import { format } from 'date-fns';

interface DashboardStatsProps {
  students: Student[];
}

const chartConfig = {
  students: {
    label: 'Students',
  },
  'Computer Science': {
    label: 'Computer Science',
    color: 'hsl(var(--chart-1))',
  },
  'Business Administration': {
    label: 'Business Admin',
    color: 'hsl(var(--chart-2))',
  },
  'Graphic Design': {
    label: 'Graphic Design',
    color: 'hsl(var(--chart-3))',
  },
  'Mechanical Engineering': {
    label: 'Mech. Engineering',
    color: 'hsl(var(--chart-4))',
  },
  Psychology: {
    label: 'Psychology',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function DashboardStats({ students }: DashboardStatsProps) {
  const studentsByCourse = useMemo(() => {
    const courseCounts = students.reduce((acc, student) => {
      acc[student.course] = (acc[student.course] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(courseCounts).map(([course, count]) => ({
      course,
      students: count,
    }));
  }, [students]);

  const recentStudents = students.slice(0, 5);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{students.length}</div>
          <p className="text-xs text-muted-foreground">
            Registered in the system
          </p>
        </CardContent>
      </Card>
      <Card className="lg:col-span-5">
        <CardHeader>
          <CardTitle>Students by Course</CardTitle>
          <CardDescription>
            Distribution of students across different courses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart
              accessibilityLayer
              data={studentsByCourse}
              margin={{ top: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="course"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  (chartConfig[value as keyof typeof chartConfig]
                    ?.label as string) || value
                }
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar
                dataKey="students"
                radius={4}
                fill="var(--color-primary)"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-7">
        <CardHeader>
          <CardTitle>Recently Added Students</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead className="hidden md:table-cell">Course</TableHead>
                <TableHead className="hidden md:table-cell">Date Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {student.course}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(student.createdAt), 'PPP')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
