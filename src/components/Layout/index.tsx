import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import type { ViewType } from '../../types';

interface LayoutProps {
  children: ReactNode;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  title: string;
  subtitle?: string;
}

export function Layout({ children, currentView, onViewChange, title, subtitle }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />
      <div className="ml-64">
        <Header title={title} subtitle={subtitle} />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
