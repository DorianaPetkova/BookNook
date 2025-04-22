'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function StatisticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const allowedUserEmail = "admin@gmail.com";

  // fixed - to be continued
  const stats = {
    dorian: { visits: 582, reads: 143, likes: 89 },
    alibi: { visits: 731, reads: 212, likes: 134 },
    alice: { visits: 74, reads: 38, likes: 28 },
    snezhen: { visits: 825, reads: 385, likes: 255 },
    atomen: { visits: 453, reads: 245, likes: 235 }
  };

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || !session.user?.email) {
      router.push('/login');
    } else if (session.user.email !== allowedUserEmail) {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Зареждане...</div>;
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">📊 Статистика за книги</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BookStats
          title="The Picture of Dorian Gray"
          image="/images/dorian.jpg"
          data={stats.dorian}
        />
        <BookStats
          title="Алиби"
          image="/images/alibi.jpg"
          data={stats.alibi}
        />
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BookStats
          title="Alice in Wonderland"
          image="/images/alice.jpg"
          data={stats.alice}
        />
        <BookStats
          title="Атомният човек"
          image="/images/atomen.jpg"
          data={stats.atomen}
        />
      </div>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BookStats
          title="Снежният човек"
          image="/images/snezhen.jpg"
          data={stats.snezhen}
        />
      </div>
    </main>
  );
}

function BookStats({ title, image, data }: { title: string, image: string, data: { visits: number, reads: number, likes: number } }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row items-center p-4">
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <Image
          src={image}
          alt={title}
          width={200}
          height={300}
          className="rounded-lg mx-auto"
        />
      </div>
      <div className="md:ml-6 w-full">
        <h2 className="text-xl font-semibold mb-3 text-center md:text-left">{title}</h2>
        <ul className="space-y-2 text-gray-700">
          <li>👁️ <strong>{data.visits}</strong> посещения</li>
          <li>📖 <strong>{data.reads}</strong> четения</li>
          <li>❤️ <strong>{data.likes}</strong> харесвания</li>
        </ul>
      </div>
    </div>
  );
}
