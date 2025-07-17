import { Card, CardContent } from '@/components/ui/card';

interface Milestone {
  year: string;
  event: string;
}

export default function CompanyTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="relative">
      {/* 时间线 */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
      
      <div className="space-y-8 pl-12">
        {milestones.map((milestone, index) => (
          <div key={index} className="relative">
            {/* 时间点 */}
            <div className="absolute left-[-28px] top-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">{milestone.year}</span>
            </div>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <p className="text-lg">{milestone.event}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}