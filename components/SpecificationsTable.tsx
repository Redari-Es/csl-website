import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Specification {
  name: string;
  value: string;
}

export default function SpecificationsTable({ specs }: { specs: Specification[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Parameter</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {specs.map((spec, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{spec.name}</TableCell>
            <TableCell>{spec.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}