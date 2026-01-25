import { ReactNode } from 'react';

export const Subtitle = ({ children }: { children: ReactNode }) => {
 return (
    <h2 className="text-2xl font-semibold text-gray-200 my-4 tracking-tight">
        {children}
    </h2>
 )
}