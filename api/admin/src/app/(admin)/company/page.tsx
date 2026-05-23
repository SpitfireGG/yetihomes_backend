'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Info, Award, FileText, Compass, Building } from 'lucide-react';

const companySections = [
  {
    title: 'Teams',
    description: 'Manage team members and roles',
    link: '/company/teams',
    icon: Users,
  },
  {
    title: 'About Us',
    description: 'Company information and history',
    link: '/company/about-us',
    icon: Info,
  },
];

export default function CompanyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Company</h1>
        <p className="text-muted-foreground">Manage company content</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companySections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.link} href={section.link}>
              <Card className="group cursor-pointer transition-all duration-200 hover:border-border hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                    <Icon
                      className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-tight">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}