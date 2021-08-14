import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar/index';
import Timeline from '../components/timeline';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard ImageGram!';
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-2 gap-1 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
