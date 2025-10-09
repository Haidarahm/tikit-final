import React from "react";
import CardSwap, { Card } from "../../components/CardSwap";
import card1Image1 from "../../assets/images/card-1.jpg";
import card1Image2 from "../../assets/images/card-2.jpg";
import card1Image3 from "../../assets/images/card-3.jpg";

export const Connections = () => {
  const cardData = [
    {
      id: 1,
      image: card1Image3,
      title: "Card 1",
      description: "Your content here",
    },
    {
      id: 2,
      image: card1Image1,
      title: "Card 2",
      description: "Your content here",
    },
    {
      id: 3,
      image: card1Image2,
      title: "Card 3",
      description: "Your content here",
    },
  ];

  return (
    <div className="section relative font-hero-light flex items-center mx-auto justify-between min-h-screen w-6/7   rounded-2xl">
      <div className="text w-1/2 relative z-10">
        <h1 className="title font-bold text-[48px] text-white">
          Bold, data-led <br /> marketing <br /> crafted by experts
        </h1>
        <p className=" font-light text-[20px] text-gray-300">
          Today's consumers expect more than ads — they expect connection. We
          blend data with creativity to help brands reach and resonate with the
          right audience.
        </p>
      </div>

      <div className="relative w-1/2 h-[600px] z-10 ">
        <CardSwap
          width={600}
          cardDistance={60}
          verticalDistance={80}
          delay={5000}
          pauseOnHover={false}
        >
          {cardData.map((card) => (
            <Card key={card.id} customClass="overflow-hidden ">
              <div
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
};
