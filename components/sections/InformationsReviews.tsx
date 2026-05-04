import Image from "next/image";

const reviews = [
  {
    id: 1,
    text: "A wonderful way to discover the medieval ramparts of Vannes. Comfortable ride with excellent audio commentary in many languages!",
    author: "Walter H.",
    col: 1,
  },
  {
    id: 2,
    text: "It was existential and out of body. All was pretty so so until we reached the megaliths at which I was overtaken by a spirit of wonder and wellness. At some point I was bathed in a bright white light and I felt my spirit leave my body. I became aware of 1000's of beings surrounding me, asking questions in tongues I'd never heard of. Then I woke up in the back of the train on its way back to the car park. Didn't expect all that for 8.50 euros. Well worth it I'd say.",
    author: "Dom L.",
    col: 2,
  },
  {
    id: 3,
    text: "A great way to see the megaliths, and also the added wonderfulness of having some English audio commentary, so that it all makes sense….very good value and totally worthwhile",
    author: "Marc G.",
    col: 2,
  },
  {
    id: 4,
    text: "Very nice people operating the little train, we got separated and they wanted and helped my husband join us. The tour is interesting, the train is comfortable and there are plenty of language options.",
    author: "Judit Benard M.",
    col: 2,
  },
  {
    id: 5,
    text: "We took a wonderful tour around Vannes — the audio guide was also available in Dutch, which made it so much more pleasant! Highly recommended!",
    author: "Carine V.",
    col: 3,
  },
  {
    id: 6,
    text: "A beautiful trip around Vannes! Highly recommended for anyone who wants to discover the medieval city!",
    author: "B Ked.",
    col: 3,
  },
];

function ReviewCard({ text, author }: { text: string; author: string }) {
  return (
    <div className="bg-[#fffcf9] rounded-[6px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.15)] p-5 flex flex-col gap-3">
      <p className="font-['Manrope',sans-serif] text-base leading-[1.3] tracking-[-0.5px] text-[#021538] flex-1">
        {text}
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-[rgba(0,0,0,0.08)]">
        <span className="font-['Manrope',sans-serif] font-bold text-base leading-[1.4] tracking-[-0.5px] text-[#021538]">
          {author}
        </span>
        <div className="relative w-[93px] h-[14px]">
          <Image
            src="/figma-assets/stars.svg"
            alt="5 stars"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default function InformationsReviews() {
  return (
    <section data-anim-section className="bg-[#1c1b29] py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 flex flex-col items-center gap-16">

        {/* Heading + Google badge */}
        <div data-anim-item className="flex flex-col items-center gap-6 text-center max-w-[623px]">
          {/* Section label */}
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image
                src="/figma-assets/icon-train-white.svg"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#ffffff] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              Reviews
            </p>
          </div>

          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[clamp(36px,4vw,48px)] leading-[1.2] tracking-[-3.36px] text-[#ffffff]">
            What visitors say about{" "}
            <em className="font-['Bricolage_Grotesque',sans-serif] italic">the train?</em>
          </h2>

          <p className="font-['Manrope',sans-serif] text-base leading-[1.2] tracking-[-0.48px] text-[#ffffff]">
            <strong>Le Petit Train de Vannes</strong> est noté plus de{" "}
            <a
              href="https://www.google.com/search?q=PETITS+TRAINS+TOURISTIQUES+LE+BAYON+VANNES+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8b800] underline"
            >
              4.7 on Google
            </a>
            , with over 6,000 reviews, making it one of the most popular
            attractions les plus appréciées de Vannes.
          </p>

          {/* Google badge */}
          <div className="rotate-[0.54deg]">
            <div className="bg-white rounded-[8px] flex items-center gap-2 px-2 py-1">
              <div className="relative w-6 h-6">
                <Image
                  src="/figma-assets/google-icon.svg"
                  alt="Google"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <span className="font-['Manrope',sans-serif] font-bold text-[14px] text-black tracking-[-0.42px]">
                    4,7
                  </span>
                  <div className="relative w-[76px] h-[12px]">
                    <Image
                      src="/figma-assets/stars.svg"
                      alt="rating stars"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="font-['Manrope',sans-serif] text-[11px] text-black opacity-60 tracking-[-0.33px]">
                  6,000+ reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-column review grid */}
        <div data-anim-item className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {/* Column 1: gallery image + 2 reviews */}
          <div className="flex flex-col gap-4">
            <div className="relative h-[220px] rounded-[6px] overflow-hidden">
              <Image
                src="/figma-assets/review-gallery-1.jpg"
                alt="Petit Train de Vannes"
                fill
                className="object-cover"
              />
            </div>
            <ReviewCard
              text="A wonderful way to discover the medieval ramparts of Vannes. Comfortable ride with excellent audio commentary in many languages!"
              author="Walter H."
            />
            <div className="relative h-[220px] rounded-[6px] overflow-hidden">
              <Image
                src="/figma-assets/review-gallery-2.jpg"
                alt="Petit Train de Vannes longeant les remparts"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Column 2: 3 text reviews */}
          <div className="flex flex-col gap-4">
            <ReviewCard
              text="It was existential and out of body. All was pretty so so until we reached the megaliths at which I was overtaken by a spirit of wonder and wellness. At some point I was bathed in a bright white light and I felt my spirit leave my body. I became aware of 1000's of beings surrounding me, asking questions in tongues I'd never heard of. Then I woke up in the back of the train on its way back to the car park. Didn't expect all that for 8 euros. Well worth it I'd say."
              author="Dom L."
            />
            <ReviewCard
              text="A great way to see the megaliths, and also the added wonderfulness of having some English audio commentary, so that it all makes sense….very good value and totally worthwhile"
              author="Marc G."
            />
            <ReviewCard
              text="Very nice people operating the little train, we got separated and they wanted and helped my husband join us. The tour is interesting, the train is comfortable and there are plenty of language options."
              author="Judit Benard M."
            />
          </div>

          {/* Column 3: 2 text reviews */}
          <div className="flex flex-col gap-4">
            <ReviewCard
              text="We took a wonderful tour around Vannes — the audio guide was also available in Dutch, which made it so much more pleasant! Highly recommended!"
              author="Carine V."
            />
            <ReviewCard
              text="A beautiful trip around Vannes! Highly recommended for anyone who wants to discover the medieval city!"
              author="B Ked."
            />
          </div>
        </div>

      </div>
    </section>
  );
}
