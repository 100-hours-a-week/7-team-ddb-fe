import { PropsWithChildren } from 'react';

import { Card, Checkbox } from '@/shared/components';

export interface ConsentCardProps extends PropsWithChildren {
  title: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ConsentCard({
  title,
  label,
  checked,
  children,
  onCheckedChange,
}: ConsentCardProps) {
  return (
    <div>
      <Card className="p-6">
        <div className="scrollbar-hide h-[200px] overflow-y-auto pr-4">
          <h2 className="heading-2 mb-4">{title}</h2>
          {children}
        </div>
      </Card>
      <div className="mt-4 flex items-center space-x-2">
        <Checkbox
          id={label}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <label htmlFor={label} className="body-text">
          {label}
        </label>
      </div>
    </div>
  );
}
