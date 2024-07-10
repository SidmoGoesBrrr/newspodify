import { useState } from 'react';
import NextImage from 'next/image';

const TABS = [
  {
    title: 'Find relevant media contacts - multiline title',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem ipsam ratione dicta quis cupiditate consequuntur laborum ducimus iusto velit.',
    imageUrl: '/demo-illustration-3.png',
    baseColor: 'bg-red-400',
    secondColor: 'bg-red-600',
  },
  {
    title: 'Another amazing feature',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem ipsam ratione dicta quis cupiditate consequuntur laborum ducimus iusto velit.',
    imageUrl: '/demo-illustration-4.png',
    baseColor: 'bg-blue-400',
    secondColor: 'bg-blue-600',
  },
  {
    title: 'And yet... another truly fascinating feature',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem ipsam ratione dicta quis cupiditate consequuntur laborum ducimus iusto velit.',
    imageUrl: '/demo-illustration-5.png',
    baseColor: 'bg-green-400',
    secondColor: 'bg-green-600',
  },
];

export default function FeaturesGallery() {
  const [currentTab, setCurrentTab] = useState(TABS[0]);

  const handleTabClick = (idx: number) => {
    setCurrentTab(TABS[idx]);
  };

  return (
    <div className="container mx-auto py-12 text-center">
      <div>
        <span className="text-sm font-bold uppercase text-gray-500">features</span>
        <h2 className="mt-2 text-3xl font-bold">What are you signing in for?</h2>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center">
        <div className="flex-1 space-y-4">
          {TABS.map((tab, idx) => {
            const isActive = tab.title === currentTab.title;
            return (
              <div
                key={idx}
                onClick={() => handleTabClick(idx)}
                className={`p-6 rounded-lg shadow-md cursor-pointer ${
                  isActive ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full ${tab.baseColor} mr-4`} />
                  <h4 className="text-lg font-bold">{tab.title}</h4>
                </div>
                {isActive && <p className="mt-4">{tab.description}</p>}
              </div>
            );
          })}
        </div>
        <div className="flex-1">
          {TABS.map((tab, idx) => (
            <div key={tab.title} className={`relative ${currentTab.title === tab.title ? 'block' : 'hidden'}`}>
              <NextImage src={tab.imageUrl} alt={tab.title} width={500} height={300} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
