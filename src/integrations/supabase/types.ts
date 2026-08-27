export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      goals: {
        Row: {
          created_at: string
          done: boolean
          id: string
          kind: string
          name: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          done?: boolean
          id?: string
          kind?: string
          name: string
          subject?: string
          user_id: string
        }
        Update: {
          created_at?: string
          done?: boolean
          id?: string
          kind?: string
          name?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      mock_sections: {
        Row: {
          calculation_errors: number
          conceptual_errors: number
          correct: number
          created_at: string
          id: string
          incorrect: number
          silly_mistakes: number
          subject: string
          test_id: string
          time_management_errors: number
          time_minutes: number
          unanswered: number
          updated_at: string
          user_id: string
        }
        Insert: {
          calculation_errors?: number
          conceptual_errors?: number
          correct?: number
          created_at?: string
          id?: string
          incorrect?: number
          silly_mistakes?: number
          subject: string
          test_id: string
          time_management_errors?: number
          time_minutes?: number
          unanswered?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          calculation_errors?: number
          conceptual_errors?: number
          correct?: number
          created_at?: string
          id?: string
          incorrect?: number
          silly_mistakes?: number
          subject?: string
          test_id?: string
          time_management_errors?: number
          time_minutes?: number
          unanswered?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mock_sections_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          advanced_date: string
          college: string
          created_at: string
          daily_target: number
          id: string
          mains_date: string
          monthly_target: number
          name: string
          target_rank: string
          updated_at: string
          weekly_target: number
        }
        Insert: {
          advanced_date?: string
          college?: string
          created_at?: string
          daily_target?: number
          id: string
          mains_date?: string
          monthly_target?: number
          name?: string
          target_rank?: string
          updated_at?: string
          weekly_target?: number
        }
        Update: {
          advanced_date?: string
          college?: string
          created_at?: string
          daily_target?: number
          id?: string
          mains_date?: string
          monthly_target?: number
          name?: string
          target_rank?: string
          updated_at?: string
          weekly_target?: number
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          chapter: string
          created_at: string
          duration_minutes: number
          id: string
          notes: string
          session_goal: string
          study_date: string
          study_type: string
          subject: string
          topic: string
          topic_key: string
          user_id: string
        }
        Insert: {
          chapter?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          notes?: string
          session_goal?: string
          study_date?: string
          study_type?: string
          subject?: string
          topic?: string
          topic_key?: string
          user_id: string
        }
        Update: {
          chapter?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          notes?: string
          session_goal?: string
          study_date?: string
          study_type?: string
          subject?: string
          topic?: string
          topic_key?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          done: boolean
          estimate_minutes: number
          id: string
          name: string
          priority: string
          subject: string
          task_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          done?: boolean
          estimate_minutes?: number
          id?: string
          name: string
          priority?: string
          subject?: string
          task_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          done?: boolean
          estimate_minutes?: number
          id?: string
          name?: string
          priority?: string
          subject?: string
          task_date?: string
          user_id?: string
        }
        Relationships: []
      }
      tests: {
        Row: {
          chemistry: number
          created_at: string
          estimated_rank: number | null
          id: string
          mathematics: number
          max_marks: number
          name: string
          percentile: number | null
          physics: number
          score: number
          test_date: string
          test_type: string
          user_id: string
        }
        Insert: {
          chemistry?: number
          created_at?: string
          estimated_rank?: number | null
          id?: string
          mathematics?: number
          max_marks?: number
          name: string
          percentile?: number | null
          physics?: number
          score?: number
          test_date?: string
          test_type?: string
          user_id: string
        }
        Update: {
          chemistry?: number
          created_at?: string
          estimated_rank?: number | null
          id?: string
          mathematics?: number
          max_marks?: number
          name?: string
          percentile?: number | null
          physics?: number
          score?: number
          test_date?: string
          test_type?: string
          user_id?: string
        }
        Relationships: []
      }
      timetable_completions: {
        Row: {
          completion_date: string
          created_at: string
          done: boolean
          id: string
          slot_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completion_date?: string
          created_at?: string
          done?: boolean
          id?: string
          slot_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completion_date?: string
          created_at?: string
          done?: boolean
          id?: string
          slot_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "timetable_completions_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "timetable_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      timetable_slots: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          label: string
          start_time: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          label?: string
          start_time: string
          subject?: string
          user_id: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          label?: string
          start_time?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      user_chapter_progress: {
        Row: {
          chapter_key: string
          class_level: string
          created_at: string
          dpp_done: boolean
          id: string
          last_updated: string
          lectures_done: boolean
          module_done: boolean
          notes_done: boolean
          revision_done: boolean
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          chapter_key: string
          class_level: string
          created_at?: string
          dpp_done?: boolean
          id?: string
          last_updated?: string
          lectures_done?: boolean
          module_done?: boolean
          notes_done?: boolean
          revision_done?: boolean
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          chapter_key?: string
          class_level?: string
          created_at?: string
          dpp_done?: boolean
          id?: string
          last_updated?: string
          lectures_done?: boolean
          module_done?: boolean
          notes_done?: boolean
          revision_done?: boolean
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          daily_hours: number
          exam_focus: string
          onboarding_complete: boolean
          prep_level: string
          strongest_subject: string
          target_branch: string
          target_percentile: number
          updated_at: string
          user_id: string
          weakest_subject: string
        }
        Insert: {
          created_at?: string
          daily_hours?: number
          exam_focus?: string
          onboarding_complete?: boolean
          prep_level?: string
          strongest_subject?: string
          target_branch?: string
          target_percentile?: number
          updated_at?: string
          user_id: string
          weakest_subject?: string
        }
        Update: {
          created_at?: string
          daily_hours?: number
          exam_focus?: string
          onboarding_complete?: boolean
          prep_level?: string
          strongest_subject?: string
          target_branch?: string
          target_percentile?: number
          updated_at?: string
          user_id?: string
          weakest_subject?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
