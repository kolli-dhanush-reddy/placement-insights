import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { topRecruiters } from "@/data/placementData";
import { Badge } from "@/components/ui/badge";

const TopRecruitersTable = () => {
  const sorted = [...topRecruiters].sort((a, b) => b.hires - a.hires);

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-display">Top Recruiting Companies</CardTitle>
        <p className="text-sm text-muted-foreground">Companies ranked by number of hires (2024)</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">#</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Hires</TableHead>
              <TableHead className="text-right">Avg Package (LPA)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((company, i) => (
              <TableRow key={company.company}>
                <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                <TableCell className="font-medium">{company.company}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                    {company.hires}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">₹{company.avgPackage}L</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopRecruitersTable;
