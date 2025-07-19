// components/ContactInfo.tsx
'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactInfo({ address, phone, email, hours }: {
  address: string;
  phone: string;
  email: string;
  hours: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <p className="text-muted-foreground">{address}</p>
      </div>
      <div className="flex items-center gap-2">
        <Phone className="h-5 w-5 text-primary" />
        <p className="text-muted-foreground">{phone}</p>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary" />
        <p className="text-muted-foreground">{email}</p>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <p className="text-muted-foreground">{hours}</p>
      </div>
    </div>
  );
}