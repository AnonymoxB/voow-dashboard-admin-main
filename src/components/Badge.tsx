import React, { ReactNode } from 'react'

interface BadgeProps {
    children: ReactNode,
    status?: 'Draft' | 'Publish',
}

export default function Badge({children,status}:BadgeProps) {
    let bg = '';
    switch (status) {
        case 'Draft':
            bg = 'badge-neutral';
            break;
        case 'Publish': 
            bg = 'badge-primary';
            break;
    }
  return (
    <div className={`badge ${bg}`}>
         {children}
     </div>
  )
}

