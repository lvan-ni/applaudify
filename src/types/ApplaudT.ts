export type ApplaudT = {
  applaudId: string;
  receiver: ReceiverT;
  sender: SenderT;
  applaudContent: string;
  isRead: boolean;
  isPublished: boolean;
  createdAt: Date;
};

export type SenderT = {
  userId: string;
  name: string;
  jobTitle: string;
  company?: string;
  avatarURL: string;
};

export type ReceiverT = {
  userId: string;
  name: string;
  jobTitle: string;
  company?: string;
  avatarURL: string;
};
