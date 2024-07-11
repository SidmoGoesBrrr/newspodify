import React from 'react';

const HeroCard = () => {
  return (
    <div className="bg-black text-white rounded-lg shadow-lg p-8">
      <h1 className="text-6xl font-extrabold text-center lg:text-left mb-6">
        Your News, Your Way
      </h1>
      <p className="text-xl font-medium text-slate-400 max-w-4xl leading-relaxed lg:leading-snug text-center lg:text-left mx-auto lg:mx-0 mb-8">
        With Newspodify, stay updated effortlessly by turning your favorite
        newsletters into a unique podcast tailored to your interests.
      </p>
      <img
        src="/hero.jpg"
        alt="Newspodify in action"
        className="max-w-full h-auto object-cover rounded-lg shadow-lg mb-8"
      />
    </div>
  );
};

export default HoverBoardGradient;
