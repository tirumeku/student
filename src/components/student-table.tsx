'use client';

import { useState, useMemo, type FC } from 'react';
import type { Student } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, BrainCircuit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { getAIRecommendation } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { ActivityRecommenderOutput } from '@/ai/flows/activity-recommender';
import { Skeleton } from './ui/skeleton';
import { format } from 'date-fns';

interface StudentTableProps {
  students: Student[];
}

type SortKey = keyof Student | '';

export const StudentTable: FC<StudentTableProps> = ({
  students: initialStudents,
}) => {
  const [students] = useState<Student[]>(initialStudents);
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [recommendation, setRecommendation] =
    useState<ActivityRecommenderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedStudents = useMemo(() => {
    const filtered = students.filter(
      (student) =>
        student.name.toLowerCase().includes(filter.toLowerCase()) ||
        student.studentId.toLowerCase().includes(filter.toLowerCase()) ||
        student.course.toLowerCase().includes(filter.toLowerCase())
    );

    if (!sortKey) return filtered;

    return [...filtered].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortOrder === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [students, filter, sortKey, sortOrder]);

  const handleGetRecommendation = async (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getAIRecommendation(student);
      setRecommendation(result);
    } catch (error) {
      console.error('Failed to get recommendation:', error);
      setRecommendation({
        shouldRecommend: false,
        reason: 'An error occurred while fetching the recommendation.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderSortableHeader = (key: SortKey, label: string) => (
    <TableHead>
      <Button variant="ghost" onClick={() => handleSort(key)}>
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter students by name, ID, or course..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {renderSortableHeader('name', 'Name')}
              {renderSortableHeader('studentId', 'Student ID')}
              {renderSortableHeader('course', 'Course')}
              {renderSortableHeader('createdAt', 'Date Added')}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.course}</TableCell>
                 <TableCell>
                    {format(new Date(student.createdAt), 'PPP')}
                  </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleGetRecommendation(student)}
                    aria-label={`Get recommendation for ${student.name}`}
                  >
                    <BrainCircuit className="h-4 w-4 text-primary" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-headline">
              Activity Recommendation
            </DialogTitle>
            <DialogDescription>
              AI-powered recommendation for {selectedStudent?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ) : recommendation ? (
              <Alert
                variant={
                  recommendation.shouldRecommend ? 'default' : 'destructive'
                }
                className={
                  recommendation.shouldRecommend
                    ? 'border-green-500/50 text-green-700 dark:border-green-500'
                    : ''
                }
              >
                <AlertTitle
                  className={
                    recommendation.shouldRecommend
                      ? 'text-green-800 dark:text-green-400'
                      : ''
                  }
                >
                  {recommendation.shouldRecommend
                    ? 'Recommendation: Consider clubs/activities'
                    : 'Recommendation: Focus on studies for now'}
                </AlertTitle>
                <AlertDescription>{recommendation.reason}</AlertDescription>
              </Alert>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
