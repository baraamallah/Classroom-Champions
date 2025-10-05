
'use client';

import { useUser } from '@/firebase/provider';
import { doc } from 'firebase/firestore';
import { useFirestore, useDoc } from '@/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { updateProfile } from '@/lib/actions';

const profileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
});

export function UserProfile() {
  const { user } = useUser();
  const firestore = useFirestore();
  const userDocRef = user ? doc(firestore, `users/${user.uid}`) : null;
  const { data: userProfile, isLoading } = useDoc<{ displayName: string }>(userDocRef);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    values: {
      displayName: userProfile?.displayName || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (!user) return;
    await updateProfile(user.uid, values);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update Profile</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
