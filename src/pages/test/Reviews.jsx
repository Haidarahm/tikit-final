import React, { useState } from "react";
import { CardStack } from "../../components/ui/card-stack";

function Reviews() {
  const [currentCard, setCurrentCard] = useState(null);
  const reviewsData = [
    {
      id: 1,
      name: "Sarah Johnson",
      designation: "CEO, TechStart Inc.",
      image:
        "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
      content: (
        <div>
          <p className="text-sm leading-relaxed">
            "Tikit transformed our digital presence completely. Their
            data-driven approach and creative execution helped us increase our
            conversion rates by 300% in just six months. Truly exceptional
            work!"
          </p>
        </div>
      ),
    },
    {
      id: 2,
      name: "Michael Chen",
      designation: "Marketing Director, GrowthCo",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      content: (
        <div>
          <p className="text-sm leading-relaxed">
            "The team at Tikit understands the perfect balance between
            creativity and performance. Our campaign results exceeded all
            expectations, and the collaboration was seamless throughout."
          </p>
        </div>
      ),
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      designation: "Founder, InnovateLab",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      content: (
        <div>
          <p className="text-sm leading-relaxed">
            "Working with Tikit was a game-changer for our brand. They delivered
            innovative solutions that not only looked amazing but drove real
            business results. Highly recommended!"
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="section font-hero-light overflow-visible min-h-[70vh] justify-center  flex flex-col mx-auto z-10 w-6/7  ">
      <h1 className="text-center font-bold text-[32px] mb-[38px]">Reviews</h1>
      <div className="main flex justify-between items-center">
        <h1 className="font-bold text-[48px] leading-[66px] text-white mb-8">
          What our clients <br /> say about us
        </h1>

        <div className="flex justify-center">
          <CardStack
            items={reviewsData}
            offset={10}
            scaleFactor={0.06}
            onCardChange={(frontCard) => {
              setCurrentCard(frontCard);
              console.log("Front card:", frontCard.name);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Reviews;
