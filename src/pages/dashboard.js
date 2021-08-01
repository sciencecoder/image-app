import { useEffect } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar/index';
import Timeline from '../components/timeline/index';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard ImageGram!';
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Sidebar />
        <Timeline />
      </div>
    </div>
  );
}
