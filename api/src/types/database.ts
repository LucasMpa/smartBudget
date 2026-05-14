export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      expenses: {
        Row: {
          id: string;
          title: string;
          amount: number;
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          amount: number;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          amount?: number;
          category?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'expenses_category_fkey';
            columns: ['category'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
