import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  position: string;
  bio: string;
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  // 从名字生成首字母作为头像回退
  const initials = member.name.split(' ').map(n => n[0]).join('');
  
  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardHeader className="pb-0">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`/images/team/${member.name.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
            <AvatarFallback className="text-xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.position}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-muted-foreground mb-4">{member.bio}</p>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Linkedin className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}