import React from "react";

const Carousel = () => {
  const slides = [
    {
      id: "slide1",
      src: "https://www.appventurez.com/wp-content/uploads/2020/11/how-to-build-food-delivery-app-like-grubhub.jpg",
      prev: "#slide4",
      next: "#slide2",
    },
    {
      id: "slide2",
      src: "https://rhinopass.s3.amazonaws.com/media/WhatsApp_Image_2024-05-03_at_10.04.09.jpeg",
      prev: "#slide1",
      next: "#slide3",
    },
    {
      id: "slide3",
      src: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
      prev: "#slide2",
      next: "#slide4",
    },
    {
      id: "slide4",
      src: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
      prev: "#slide3",
      next: "#slide1",
    },
  ];

  return (
    <div className="w-full h-64 md:h-80 carousel">
      {slides.map(({ id, src, prev, next }) => (
        <div key={id} id={id} className="relative w-full h-full carousel-item">
          <img src={src} className="object-cover w-full h-full" alt="" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={prev} className="btn btn-circle">
              ❮
            </a>
            <a href={next} className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
