'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button
      size='sm'
      className='font-normal w-full'
      variant='link'
      asChild={true}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
