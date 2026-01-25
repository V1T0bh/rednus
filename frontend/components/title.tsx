import { ReactNode } from 'react';

export const Title = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
 return (
    <h1 className={`font-sans text-5xl font-bold text-gray-100 my-8 tracking-tight ${className}`}>
        {children}
    </h1>
 )
}