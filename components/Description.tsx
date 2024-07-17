import React from 'react'
import FeaturesGallery from './FeaturesGallery'
const Description = () => {
  return (
    <section id='description'>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-none my-8">
                    <h1 className="text-6xl font-bold text-gray-900 dark:text-white mt-6 mb-6 text-center">Introducing NewsPodify</h1>
                    <p className="text-gray-700 dark:text-gray-300 text-xl mb-6 text-center">
                    NewsPodify is your ultimate news companion that transforms the way you consume information. NewsPodify collects the latest news from a variety of newsletters, curating and summarizing the most important stories into a personalized podcast just for you.
                    </p>
                </div>
                <FeaturesGallery/>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-none my-8">
                    <p className="text-gray-700 dark:text-gray-300 text-2xl mt-4 mb-4 text-center">
                    Stay informed, stay ahead, and enjoy the convenience of audio news with NewsPodify.<br></br>Transform your news consumption today and experience the future of personalized podcasts.
                    </p>
                </div>
    </section>
  )
}

export default Description