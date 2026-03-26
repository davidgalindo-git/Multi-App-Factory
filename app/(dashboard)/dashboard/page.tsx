import { createClient } from '@/utils/supabase/server';
import {
  getUser,
  getUserDetails,
  getSubscription
} from '@/utils/supabase/queries';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { redirect } from 'next/navigation';

import { APP_CONFIG } from '@/config/app-config';

export default async function DashboardPage() {
  const supabase = createClient();
  const [user, userDetails] = await Promise.all([getUser(supabase), getUserDetails(supabase)]);

  if (!user) {
    return redirect('/signin');
  }

  const subscription = await getSubscription(supabase, user.id);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 gap-4">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>
              Welcome{userDetails?.full_name ? `, ${userDetails.full_name}` : ''}!
            </CardTitle>
            <CardDescription>
              This is your blank-slate dashboard for {APP_CONFIG.metadata.title}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">
                Subscription status
              </div>
              <div className="text-lg font-semibold">
                {subscription?.status ?? 'none'}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/account">
                <Button>Manage account</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline">View pricing</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
