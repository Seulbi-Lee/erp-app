export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      schedules: {
        Row: {
          amounts: number | null
          date: string
          end: string
          id: string
          start: string
          store_id: string
          user_id: string
        }
        Insert: {
          amounts?: number | null
          date: string
          end: string
          id?: string
          start: string
          store_id: string
          user_id: string
        }
        Update: {
          amounts?: number | null
          date?: string
          end?: string
          id?: string
          start?: string
          store_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedules_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stocks: {
        Row: {
          id: string
          min_quantity: number | null
          name: string
          price: number | null
          store_id: string
        }
        Insert: {
          id?: string
          min_quantity?: number | null
          name: string
          price?: number | null
          store_id: string
        }
        Update: {
          id?: string
          min_quantity?: number | null
          name?: string
          price?: number | null
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stocks_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      stocks_history: {
        Row: {
          created_at: string
          created_by: string | null
          curr_quantity: number
          id: string
          stocks_id: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          curr_quantity?: number
          id?: string
          stocks_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          curr_quantity?: number
          id?: string
          stocks_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stocks_history_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stocks_history_stocks_id_fkey"
            columns: ["stocks_id"]
            isOneToOne: false
            referencedRelation: "stocks"
            referencedColumns: ["id"]
          },
        ]
      }
      store_members: {
        Row: {
          color: string | null
          created_at: string
          created_by: string
          hourly_rate: number | null
          id: string
          manager: boolean
          position: string | null
          store_id: string
          user_id: string
          verify: boolean | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          created_by?: string
          hourly_rate?: number | null
          id?: string
          manager?: boolean
          position?: string | null
          store_id: string
          user_id?: string
          verify?: boolean | null
        }
        Update: {
          color?: string | null
          created_at?: string
          created_by?: string
          hourly_rate?: number | null
          id?: string
          manager?: boolean
          position?: string | null
          store_id?: string
          user_id?: string
          verify?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "store_members_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_members_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          created_at: string
          created_by: string
          id: string
          owner: string
          password: string
          storename: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          owner?: string
          password: string
          storename: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          owner?: string
          password?: string
          storename?: string
        }
        Relationships: [
          {
            foreignKeyName: "stores_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stores_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          fullname: string
          id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          fullname: string
          id?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          fullname?: string
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
