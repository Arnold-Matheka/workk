import ClientProfile from '@/components/sections/client-profile';
import { use } from 'react';
import { notFound } from 'next/navigation';

// Dummy fetch function for demonstration. Replace with real data fetching.
async function getUser(id: string) {
  // You can replace this with a real fetch from your backend
  // For now, return dummy da
  const dummyUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      status: 'Active',
      policies: 3,
      joinDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1987654321',
      status: 'Inactive',
      policies: 1,
      joinDate: '2023-11-22',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '+1122334455',
      status: 'Active',
      policies: 2,
      joinDate: '2024-03-10',
    },
  ];
  return dummyUsers.find(u => u.id.toString() === id) || null;
}

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  if (!user) return notFound();
  return <ClientProfile user={user} />;
}
