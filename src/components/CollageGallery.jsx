// src/components/StickyStoryGalleryV2.tsx
// src/components/StickyStoryGalleryPolished.tsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    title: "The Journey Begins",
    description: "High up in the Himalayas, the wind whispers stories of adventure.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    layout: "image-left",
    bg: "#f4f1ed",
  },
  {
    title: "Campfire Nights",
    description: "Under starlit skies, strangers become friends and stories are born.",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    layout: "full-screen",
    bg: "#1e1e1e",
  },
  {
    title: "Misty Mornings",
    description: "A new day. Fog rolls over the hills, revealing hidden valleys.",
    image: "https://images.pexels.com/photos/6602396/pexels-photo-6602396.jpeg",
    layout: "image-right",
    bg: "#f0f0f0",
  },
  {
    title: "The Last Trail",
    description: "Every journey ends, but the memories walk beside us forever.",
    image: "https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
    layout: "text-only",
    bg: "#7f6d5f",
  },
];

const CollageGallery = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${stories.length * 70}%`, // tighter scroll
          scrub: 1,
          pin: true,
        },
      });

      // Force first story to show
      sectionsRef.current[0].style.opacity = "1";
      sectionsRef.current[0].style.scale = "1";

      sectionsRef.current.forEach((section, index) => {
        tl.to(
          section,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            onStart: () => {
              sectionsRef.current.forEach((s, i) => {
                s.style.opacity = i === index ? "1" : "0";
                s.style.scale = i === index ? "1" : "0.98";
              });
            },
          },
          index
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {stories.map((story, index) => (
        <div
          key={index}
          ref={(el) => el && (sectionsRef.current[index] = el)}
          // className="absolute inset-0 opacity-0 scale-[0.98] transition-all duration-500 flex items-center justify-center px-6 text-white"
          className="absolute inset-0 opacity-0 scale-[0.98] transition-all duration-500 flex items-center justify-center px-4 text-white overflow-hidden max-w-full"
          style={{ backgroundColor: story.bg }}
        >
          {/* Fullscreen layout */}
          {story.layout === "full-screen" && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={`${story.image}?auto=format&fit=crop&w=1400&q=80`}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="relative z-10 max-w-3xl text-center px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{story.title}</h2>
                <p className="text-lg md:text-xl">{story.description}</p>
              </div>
            </div>
          )}

          {/* Image left */}
          {story.layout === "image-left" && (
            <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl text-black">
              <img
                src={story.image}
                alt={story.title}
                className="w-full md:w-1/2 rounded-xl shadow-xl object-cover"
              />
              <div className="max-w-xl text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{story.title}</h2>
                <p className="text-lg md:text-xl">{story.description}</p>
              </div>
            </div>
          )}

          {/* Image right */}
          {story.layout === "image-right" && (
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 max-w-6xl text-black">
              <img
                src={story.image}
                alt={story.title}
                className="w-full md:w-1/2 rounded-xl shadow-xl object-cover"
              />
              <div className="max-w-xl text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{story.title}</h2>
                <p className="text-lg md:text-xl">{story.description}</p>
              </div>
            </div>
          )}

          {/* Text only */}
          {story.layout === "text-only" && (
            <div className="text-center px-6 max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">{story.title}</h2>
              <p className="text-xl md:text-2xl text-white">{story.description}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default CollageGallery;
