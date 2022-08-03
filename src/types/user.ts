export type User = {
    username: string | boolean;
    name: string | boolean;
    email: string | boolean;
    password: string | boolean;
    passwordCheck?: string | boolean;
    pendingTasks?: number,
    avatar?: string,
    date?: Date,
    isOnline?: boolean
  };