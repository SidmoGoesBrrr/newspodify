"use client"
import React from 'react'
import FeaturesGallery from './FeaturesGallery'
import { LayoutGrid } from "./ui/layout-grid";
import SectionHeader from './ui/section-headers';
import Link from 'next/link';

const Description = () => {
  return (
    <section id='description'>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-none my-8">

        <SectionHeader text="Introducing Newspodify" />
        <p className="text-xl">
          Newspodify is an innovative app designed to revolutionize your content consumption experience. By seamlessly aggregating articles, blogs, newsletters, and more from your favorite sources, Newspodify converts written content into engaging audio format. Now, you can stay informed and entertained simply by listening—whether you&apos;re on the go, at the gym, or relaxing at home. With Newspodify, you receive all your favorite content in audio form, making it easier than ever to stay up-to-date and enjoy diverse information without having to read a single word. Experience content like never before—anytime, anywhere, with Newspodify.
        </p>
        <div className="h-screen py-20 w-full">
          <LayoutGrid cards={cards} />
        </div>
        <div className="flex flex-col items-center mt-2">
          <p className="text-center font-bold mb-2">
            We include popular newsletters like The Hustle, The 3-2-1 Newsletter and more.
          </p>
          <p className="text-center text-sm mb-4">
            We&apos;re always open to suggestions! If you have a favorite newsletter you want to hear on Newspodify, let us know.
          </p>
          <Link href="/suggestions">
            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Suggest a Newsletter
            </button>
          </Link>
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
        The Hustle
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        The Hustle is a daily newsletter that promises &quot;business and tech in 5 minutes or less.&quot;
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Why We Buy
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Why We Buy is a biweekly (twice a week) newsletter in which &quot;Customer Whisperer&quot; Katelyn Bourgoin shares tips that help marketers understand buyer psychology.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        NYT&apos;s The Morning
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        NYT&apos;s The Morning, with 17 million readers, is the world's top newsletter, offering a daily briefing on global news, insights, and diverse topics.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        The 3-2-1 Newsletter by James Clear
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        James Clear, the mind behind the blockbuster productivity book, Atomic Habits, delivers his 3-2-1 newsletter every Thursday. It&apos;s a quick read packed with 3 insights, 2 quotes, and 1 thought-provoking question.
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
      "/hustle.png",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "/whywebuy_2.png",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "nyt.jpeg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "123.jpg",
  },
];