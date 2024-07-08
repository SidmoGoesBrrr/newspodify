// pages/index.tsx

import FeedbackForm from '@/components/FeedbackForm';
import { BackgroundBeams } from "@/components/ui/background-beams";

const Home = () => {
  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center relative">
      <BackgroundBeams />
      <div className="relative z-10 p-4 bg-white shadow-md rounded-md">
        <FeedbackForm />
      </div>
    </div>
  );
};

export default Home;
