import { supabase } from "@/lib/supabase";

export default async function TestSupabase() {
  const { data, error } = await supabase
    .from("clinic_schedule")
    .select("*")
    .order("day_of_week");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Supabase Test
      </h1>

      <pre className="mt-6">
        {JSON.stringify({ data, error }, null, 2)}
      </pre>
    </div>
  );
}