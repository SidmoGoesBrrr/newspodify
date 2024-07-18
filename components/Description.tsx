"use client"
import React from 'react'
import FeaturesGallery from './FeaturesGallery'
import { LayoutGrid } from "./ui/layout-grid";

const Description = () => {
  return (
    <section id='description'>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-none my-8">
        <h1 className="text-6xl font-bold text-white mt-6 mb-6 text-center">Introducing Newspodify</h1>
        
        <ul className="text-gray-300 text-xl md:text-2xl lg:text-3xl mb-6 leading-relaxed tracking-wide list-disc list-inside">
          <li className="mb-4">
            Newspodify is your ultimate companion for staying updated with your favorite newsletters.
          </li>
          <li className="mb-4">
            We collect the latest content from various newsletters and transform them into a personalized podcast tailored just for you.
          </li>
          <li className="mb-4">
            We curate and condense the most important insights from the newsletters you trust and enjoy.
          </li>
          <li className="mb-4">
            With Newspodify, you can effortlessly stay informed by listening to the newsletters you want to read.
          </li>
          <li className="mb-4">
            Making it easier than ever to keep up with the content that matters most to you.
          </li>
        </ul>
        <div className="h-screen py-20 w-full">
          <LayoutGrid cards={cards} />
        </div>
      </div>

      <FeaturesGallery />
      {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-none my-8">
        <p className="text-gray-300 text-2xl mt-4 mb-4 text-center leading-relaxed tracking-wide">
          Stay informed, stay ahead, and enjoy the convenience of audio news with NewsPodify.<br />Transform your news consumption today and experience the future of personalized podcasts.
        </p>
      </div> */}
    </section>
  )
}

export default Description

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House in the woods
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House above the clouds
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Greens all over
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Rivers are serene
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];