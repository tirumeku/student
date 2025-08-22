
'use server';

import type { Student, StudentFirestore } from '@/types';
import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  Timestamp,
  orderBy,
  query,
} from 'firebase/firestore';

// Helper to convert Firestore timestamp to a serializable format
const studentFromFirestore = (doc: any): Student => {
  const data = doc.data() as StudentFirestore;
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
};

export const getStudents = async (): Promise<Student[]> => {
  const studentsCol = collection(db, 'students');
  const q = query(studentsCol, orderBy('createdAt', 'desc'));
  const studentsSnapshot = await getDocs(q);
  const studentList = studentsSnapshot.docs.map(studentFromFirestore);
  return studentList;
};

export const addStudent = async (studentData: {
  name: string;
  studentId: string;
  course: string;
  interests: string;
}): Promise<Student> => {
  const newStudentData: Omit<StudentFirestore, 'id'> = {
    ...studentData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
  const docRef = await addDoc(collection(db, 'students'), newStudentData);

  return {
    id: docRef.id,
    ...studentData,
    createdAt: newStudentData.createdAt.toDate(),
    updatedAt: newStudentData.updatedAt.toDate(),
  };
};

export const getStudentById = async (id: string): Promise<Student | null> => {
  const studentDoc = doc(db, 'students', id);
  const studentSnapshot = await getDoc(studentDoc);
  if (studentSnapshot.exists()) {
    return studentFromFirestore(studentSnapshot);
  } else {
    return null;
  }
};
