export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {};
};

type PublicSchema = Database[Extract<keyof Database, "public">]

