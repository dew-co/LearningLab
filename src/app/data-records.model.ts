export type MediaKind = 'image' | 'document' | 'other';

export type MediaAsset = {
  id: string;
  name: string;
  url: string;
  storagePath: string;
  kind: MediaKind;
  contentType: string;
  extension: string;
  size: number;
  createdAt: number;
  updatedAt: number;
};

export type AdmissionStatus = 'new' | 'in-review' | 'contacted' | 'enrolled';

export type AdmissionLog = {
  id: string;
  fullName: string;
  currentClass: string;
  desiredCourse: string;
  schoolName: string;
  board: string;
  phone: string;
  city: string;
  state: string;
  status: AdmissionStatus;
  adminNotes: string;
  createdAt: number;
  updatedAt: number;
};

export type AdmissionLogInput = Omit<AdmissionLog, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'adminNotes'>;

export type ContactLog = {
  id: string;
  studentName: string;
  classLevel: string;
  goal: string;
  phone: string;
  createdAt: number;
  updatedAt: number;
};

export type ContactLogInput = Omit<ContactLog, 'id' | 'createdAt' | 'updatedAt'>;
