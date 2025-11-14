// export default StickyStoryGallery;
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
    bg: "#0f0f0f",
  },
  {
    title: "Misty Mornings",
    description: "A new day. Fog rolls over the hills, revealing hidden valleys.",
    image: "https://images.pexels.com/photos/6602396/pexels-photo-6602396.jpeg",
    layout: "image-right",
    bg: "#eeeeee",
  },
  {
    title: "The Last Trail",
    description: "Every journey ends, but the memories walk beside us forever.",
    image: "https://res.cloudinary.com/dpfqlqewb/image/upload/v1763112724/last_trail.png",
    layout: "full-screen",
    bg: "#111111",
  },
];

const StickyStoryGallery = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(sectionsRef.current, { opacity: 0, scale: 0.95, x: 0 });
      gsap.set(sectionsRef.current[0], { opacity: 1, scale: 1, zIndex: stories.length });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${stories.length * 120}%`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      sectionsRef.current.forEach((section, i) => {
        const direction = stories[i].layout === "image-left" ? -100 : 100;

        // Animate current slide in
        tl.fromTo(
          section,
          { x: direction, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", zIndex: stories.length - i },
          i * 0.8
        );

        // Animate previous slide out
        if (i > 0) {
          tl.to(
            sectionsRef.current[i - 1],
            { opacity: 0, scale: 0.96, x: -direction / 2, duration: 1, ease: "power3.inOut" },
            i * 0.8
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {stories.map((story, i) => (
        <div
          key={crypto.randomUUID()}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="absolute inset-0 flex items-center justify-center px-4 md:px-10 overflow-hidden"
          style={{ backgroundColor: story.bg }}
        >
          {story.layout === "full-screen" && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={`${story.image}?auto=format&fit=crop&w=1600&q=80`}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="relative z-10 max-w-3xl text-center px-4">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
                  {story.title}
                </h2>
                <p className="text-lg md:text-xl text-white/90">{story.description}</p>
              </div>
            </div>
          )}

          {(story.layout === "image-left" || story.layout === "image-right") && (
            <div className={`flex flex-col md:flex-row items-center gap-10 max-w-6xl text-black ${story.layout === "image-right" ? "md:flex-row-reverse" : ""}`}>
              <img
                src={story.image}
                alt={story.title}
                className="w-full md:w-1/2 rounded-xl shadow-2xl object-cover"
              />
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{story.title}</h2>
                <p className="text-lg md:text-xl opacity-80">{story.description}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default StickyStoryGallery;
