import { getStudents } from '@/lib/data';
import { StudentTable } from '@/components/student-table';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold font-headline tracking-tight mb-8">
        Student Directory
      </h1>
      <Suspense fallback={<StudentTableSkeleton />}>
        <StudentTable students={students} />
      </Suspense>
    </div>
  );
}

function StudentTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-1/3" />
      </div>
      <div className="rounded-md border">
        <div className="w-full">
          <div className="border-b">
            <div className="grid grid-cols-4 h-12 px-4">
              <Skeleton className="h-6 w-24 self-center" />
              <Skeleton className="h-6 w-24 self-center" />
              <Skeleton className="h-6 w-32 self-center" />
              <Skeleton className="h-6 w-20 self-center justify-self-end" />
            </div>
          </div>
          <div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 items-center border-b p-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-8 w-8 justify-self-end" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
