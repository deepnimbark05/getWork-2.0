import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';

const HomeCarousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/home-images');
        const data = await response.json();
        
        // Filter and sort images by order
        const sortedImages = data
          .filter(img => img.isActive)
          .sort((a, b) => a.order - b.order);
        
        setImages(sortedImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={500}
        className="rounded-lg shadow-lg"
      >
        {images.map((image) => (
          <div key={image._id} className="relative">
            <img
              src={`http://localhost:3001/${image.imagePath}`}
              alt={image.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <h3 className="text-white text-xl font-semibold">{image.name}</h3>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarousel;