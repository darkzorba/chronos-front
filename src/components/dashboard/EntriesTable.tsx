import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2, Clock, Plus } from "lucide-react";

interface TimeEntry {
  id: string;
  date: string;
  description: string;
  hours: number;
  project?: string;
}

const mockEntries: TimeEntry[] = [
  {
    id: "1",
    date: "2024-01-22",
    description: "Frontend development - Dashboard components",
    hours: 4.5,
    project: "Chronos App"
  },
  {
    id: "2",
    date: "2024-01-22",
    description: "Code review and bug fixes",
    hours: 2.0,
    project: "Chronos App"
  },
  {
    id: "3",
    date: "2024-01-21",
    description: "Client meeting and planning",
    hours: 1.5,
    project: "Project Alpha"
  },
  {
    id: "4",
    date: "2024-01-20",
    description: "Database optimization",
    hours: 3.0,
    project: "Backend API"
  },
  {
    id: "5",
    date: "2024-01-20",
    description: "Testing and documentation",
    hours: 2.5,
    project: "Backend API"
  },
];

export function EntriesTable() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  const handleEdit = (entryId: string) => {
    console.log("Edit entry:", entryId);
  };

  const handleDelete = (entryId: string) => {
    console.log("Delete entry:", entryId);
  };

  return (
    <Card className="chronos-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <span>Recent Entries</span>
          </CardTitle>
          <Button className="chronos-button-primary" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    {formatDate(entry.date)}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {entry.description}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-light text-primary">
                      {entry.project || "No Project"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {entry.hours}h
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(entry.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(entry.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}