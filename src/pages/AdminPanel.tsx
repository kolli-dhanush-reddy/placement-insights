import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

// ── Year Wise Placement Tab ──
const YearPlacementTab = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editRow, setEditRow] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { data: rows = [] } = useQuery({
    queryKey: ["year_wise_placement"],
    queryFn: async () => {
      const { data, error } = await supabase.from("year_wise_placement").select("*").order("year");
      if (error) throw error;
      return data;
    },
  });

  const upsert = useMutation({
    mutationFn: async (row: any) => {
      const payload = {
        year: row.year,
        placed: Number(row.placed),
        unplaced: Number(row.unplaced),
        percentage: Number(row.percentage),
        companies_visited: Number(row.companies_visited),
        highest_salary: Number(row.highest_salary),
      };
      if (row.id) {
        const { error } = await supabase.from("year_wise_placement").update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("year_wise_placement").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["year_wise_placement"] });
      toast({ title: "Saved!" });
      setOpen(false);
      setEditRow(null);
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("year_wise_placement").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["year_wise_placement"] });
      toast({ title: "Deleted" });
    },
  });

  const openNew = () => { setEditRow({ year: "", placed: 0, unplaced: 0, percentage: 0, companies_visited: 0, highest_salary: 0 }); setOpen(true); };
  const openEdit = (r: any) => { setEditRow({ ...r }); setOpen(true); };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Year-wise Placement</CardTitle>
        <Button size="sm" onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Add</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Placed</TableHead>
              <TableHead>Unplaced</TableHead>
              <TableHead>%</TableHead>
              <TableHead>Companies</TableHead>
              <TableHead>Highest (LPA)</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.year}</TableCell>
                <TableCell>{r.placed}</TableCell>
                <TableCell>{r.unplaced}</TableCell>
                <TableCell>{r.percentage}%</TableCell>
                <TableCell>{r.companies_visited}</TableCell>
                <TableCell>₹{r.highest_salary}L</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove.mutate(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>{editRow?.id ? "Edit" : "Add"} Placement Data</DialogTitle></DialogHeader>
            {editRow && (
              <form onSubmit={(e) => { e.preventDefault(); upsert.mutate(editRow); }} className="space-y-3">
                <div><Label>Year</Label><Input value={editRow.year} onChange={(e) => setEditRow({ ...editRow, year: e.target.value })} required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Placed</Label><Input type="number" value={editRow.placed} onChange={(e) => setEditRow({ ...editRow, placed: e.target.value })} required /></div>
                  <div><Label>Unplaced</Label><Input type="number" value={editRow.unplaced} onChange={(e) => setEditRow({ ...editRow, unplaced: e.target.value })} required /></div>
                  <div><Label>Percentage</Label><Input type="number" value={editRow.percentage} onChange={(e) => setEditRow({ ...editRow, percentage: e.target.value })} required /></div>
                  <div><Label>Companies Visited</Label><Input type="number" value={editRow.companies_visited} onChange={(e) => setEditRow({ ...editRow, companies_visited: e.target.value })} required /></div>
                  <div><Label>Highest Salary (LPA)</Label><Input type="number" step="0.1" value={editRow.highest_salary} onChange={(e) => setEditRow({ ...editRow, highest_salary: e.target.value })} required /></div>
                </div>
                <Button type="submit" className="w-full" disabled={upsert.isPending}>{upsert.isPending ? "Saving..." : "Save"}</Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

// ── Salary Tab ──
const SalaryTab = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editRow, setEditRow] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { data: rows = [] } = useQuery({
    queryKey: ["salary_data"],
    queryFn: async () => {
      const { data, error } = await supabase.from("salary_data").select("*").order("year");
      if (error) throw error;
      return data;
    },
  });

  const upsert = useMutation({
    mutationFn: async (row: any) => {
      const payload = { year: row.year, min_salary: Number(row.min_salary), avg_salary: Number(row.avg_salary), max_salary: Number(row.max_salary) };
      if (row.id) {
        const { error } = await supabase.from("salary_data").update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("salary_data").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["salary_data"] }); toast({ title: "Saved!" }); setOpen(false); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("salary_data").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["salary_data"] }); toast({ title: "Deleted" }); },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Salary Data</CardTitle>
        <Button size="sm" onClick={() => { setEditRow({ year: "", min_salary: 0, avg_salary: 0, max_salary: 0 }); setOpen(true); }}><Plus className="w-4 h-4 mr-1" /> Add</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Year</TableHead><TableHead>Min (LPA)</TableHead><TableHead>Avg (LPA)</TableHead><TableHead>Max (LPA)</TableHead><TableHead className="w-20">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.year}</TableCell>
                <TableCell>₹{r.min_salary}L</TableCell>
                <TableCell>₹{r.avg_salary}L</TableCell>
                <TableCell>₹{r.max_salary}L</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditRow({ ...r }); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove.mutate(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>{editRow?.id ? "Edit" : "Add"} Salary Data</DialogTitle></DialogHeader>
            {editRow && (
              <form onSubmit={(e) => { e.preventDefault(); upsert.mutate(editRow); }} className="space-y-3">
                <div><Label>Year</Label><Input value={editRow.year} onChange={(e) => setEditRow({ ...editRow, year: e.target.value })} required /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div><Label>Min</Label><Input type="number" step="0.1" value={editRow.min_salary} onChange={(e) => setEditRow({ ...editRow, min_salary: e.target.value })} required /></div>
                  <div><Label>Avg</Label><Input type="number" step="0.1" value={editRow.avg_salary} onChange={(e) => setEditRow({ ...editRow, avg_salary: e.target.value })} required /></div>
                  <div><Label>Max</Label><Input type="number" step="0.1" value={editRow.max_salary} onChange={(e) => setEditRow({ ...editRow, max_salary: e.target.value })} required /></div>
                </div>
                <Button type="submit" className="w-full" disabled={upsert.isPending}>{upsert.isPending ? "Saving..." : "Save"}</Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

// ── Top Recruiters Tab ──
const RecruitersTab = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editRow, setEditRow] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { data: rows = [] } = useQuery({
    queryKey: ["top_recruiters"],
    queryFn: async () => {
      const { data, error } = await supabase.from("top_recruiters").select("*").order("hires", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const upsert = useMutation({
    mutationFn: async (row: any) => {
      const payload = { company: row.company, hires: Number(row.hires), avg_package: Number(row.avg_package) };
      if (row.id) {
        const { error } = await supabase.from("top_recruiters").update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("top_recruiters").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["top_recruiters"] }); toast({ title: "Saved!" }); setOpen(false); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("top_recruiters").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["top_recruiters"] }); toast({ title: "Deleted" }); },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Top Recruiters</CardTitle>
        <Button size="sm" onClick={() => { setEditRow({ company: "", hires: 0, avg_package: 0 }); setOpen(true); }}><Plus className="w-4 h-4 mr-1" /> Add</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Company</TableHead><TableHead>Hires</TableHead><TableHead>Avg Package (LPA)</TableHead><TableHead className="w-20">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.company}</TableCell>
                <TableCell>{r.hires}</TableCell>
                <TableCell>₹{r.avg_package}L</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditRow({ ...r }); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove.mutate(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>{editRow?.id ? "Edit" : "Add"} Recruiter</DialogTitle></DialogHeader>
            {editRow && (
              <form onSubmit={(e) => { e.preventDefault(); upsert.mutate(editRow); }} className="space-y-3">
                <div><Label>Company</Label><Input value={editRow.company} onChange={(e) => setEditRow({ ...editRow, company: e.target.value })} required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Hires</Label><Input type="number" value={editRow.hires} onChange={(e) => setEditRow({ ...editRow, hires: e.target.value })} required /></div>
                  <div><Label>Avg Package</Label><Input type="number" step="0.1" value={editRow.avg_package} onChange={(e) => setEditRow({ ...editRow, avg_package: e.target.value })} required /></div>
                </div>
                <Button type="submit" className="w-full" disabled={upsert.isPending}>{upsert.isPending ? "Saving..." : "Save"}</Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

// ── Predictions Tab ──
const PredictionsTab = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [editRow, setEditRow] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { data: rows = [] } = useQuery({
    queryKey: ["prediction_data"],
    queryFn: async () => {
      const { data, error } = await supabase.from("prediction_data").select("*").order("year");
      if (error) throw error;
      return data;
    },
  });

  const upsert = useMutation({
    mutationFn: async (row: any) => {
      const payload = { year: row.year, predicted: Number(row.predicted), confidence: Number(row.confidence) };
      if (row.id) {
        const { error } = await supabase.from("prediction_data").update(payload).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("prediction_data").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["prediction_data"] }); toast({ title: "Saved!" }); setOpen(false); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("prediction_data").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["prediction_data"] }); toast({ title: "Deleted" }); },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Predictions</CardTitle>
        <Button size="sm" onClick={() => { setEditRow({ year: "", predicted: 0, confidence: 0 }); setOpen(true); }}><Plus className="w-4 h-4 mr-1" /> Add</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader><TableRow><TableHead>Year</TableHead><TableHead>Predicted %</TableHead><TableHead>Confidence %</TableHead><TableHead className="w-20">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.year}</TableCell>
                <TableCell>{r.predicted}%</TableCell>
                <TableCell>{r.confidence}%</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditRow({ ...r }); setOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => remove.mutate(r.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>{editRow?.id ? "Edit" : "Add"} Prediction</DialogTitle></DialogHeader>
            {editRow && (
              <form onSubmit={(e) => { e.preventDefault(); upsert.mutate(editRow); }} className="space-y-3">
                <div><Label>Year</Label><Input value={editRow.year} onChange={(e) => setEditRow({ ...editRow, year: e.target.value })} required /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Predicted %</Label><Input type="number" value={editRow.predicted} onChange={(e) => setEditRow({ ...editRow, predicted: e.target.value })} required /></div>
                  <div><Label>Confidence %</Label><Input type="number" value={editRow.confidence} onChange={(e) => setEditRow({ ...editRow, confidence: e.target.value })} required /></div>
                </div>
                <Button type="submit" className="w-full" disabled={upsert.isPending}>{upsert.isPending ? "Saving..." : "Save"}</Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

// ── Main Admin Panel ──
const AdminPanel = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return <DashboardLayout title="Admin" subtitle="Loading..."><div /></DashboardLayout>;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <DashboardLayout title="Admin Panel" subtitle="Manage placement data">
      <Tabs defaultValue="placement" className="space-y-4">
        <TabsList>
          <TabsTrigger value="placement">Placement</TabsTrigger>
          <TabsTrigger value="salary">Salary</TabsTrigger>
          <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>
        <TabsContent value="placement"><YearPlacementTab /></TabsContent>
        <TabsContent value="salary"><SalaryTab /></TabsContent>
        <TabsContent value="recruiters"><RecruitersTab /></TabsContent>
        <TabsContent value="predictions"><PredictionsTab /></TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminPanel;
