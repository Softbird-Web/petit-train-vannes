import Image from "next/image";

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
            sizes="64px"
              className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default function InformationsReviews() {
  return (
    <section data-anim-section className="bg-[#f5ebdd] py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 xl:px-0 flex flex-col items-center gap-16">

        {/* Heading + Google badge */}
        <div data-anim-item className="flex flex-col items-center gap-6 text-center max-w-[623px]">
          {/* Section label */}
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 w-[19px] h-[19px]">
              <Image
                src="/figma-assets/icon-train.svg"
                alt=""
                fill
                sizes="64px"
              className="object-contain"
                aria-hidden="true"
              />
            </div>
            <p className="font-['Bricolage_Grotesque',sans-serif] italic text-[#1c1b29] text-base leading-6 tracking-[-0.48px] whitespace-nowrap">
              Reviews
            </p>
          </div>

          <h2 className="font-normal font-['Bricolage_Grotesque',sans-serif] text-[clamp(36px,4vw,48px)] leading-[1.2] tracking-[-3.36px] text-[#1c1b29]">
            What visitors say about{" "}
            <em className="font-['Bricolage_Grotesque',sans-serif] italic text-[#f7a427]">the train?</em>
          </h2>

          <p className="font-['Manrope',sans-serif] text-base leading-[1.2] tracking-[-0.48px] text-[#1c1b29]">
            <strong>Le Petit Train de Vannes</strong> has a rating over{" "}
            <a
              href="https://www.google.com/search?q=PETITS+TRAINS+TOURISTIQUES+LE+BAYON+VANNES+Reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8b800] underline"
            >
              4.7 on Google
            </a>
            , with over 1,300 reviews, making it one of the most popular
            tourist attractions in Vannes.
          </p>

          {/* Google badge */}
          <div className="rotate-[0.54deg]">
            <div className="bg-white rounded-[8px] flex items-center gap-2 px-2 py-1">
              <div className="relative w-6 h-6">
                <Image
                  src="/figma-assets/google-icon.svg"
                  alt="Google"
                  fill
                  sizes="64px"
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
                      sizes="64px"
              className="object-contain"
                    />
                  </div>
                </div>
                <span className="font-['Manrope',sans-serif] text-[11px] text-black opacity-60 tracking-[-0.33px]">
                  1,300+ reviews
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
                sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              />
            </div>
            <ReviewCard
              text="charming little tour for a fair price. i would recommend walking around town a bit and reading about the town's history and then getting this train for the cherry on top!"
              author="Lener"
            />
            <div className="relative h-[220px] rounded-[6px] overflow-hidden">
              <Image
                src="/figma-assets/review-gallery-2.jpg"
                alt="Petit Train de Vannes longeant les remparts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              />
            </div>
          </div>

          {/* Column 2: 3 text reviews */}
          <div className="flex flex-col gap-4">
            <ReviewCard
              text="Very nice experience to (re)discover the beautiful Vannes. A train trip in history and culture that be missed if you visit Vannes."
              author="Simon LE LARGE"
            />
            <ReviewCard
              text="Lovely to have a guided tour of vannes. Would definitely recommend. A fun thing to do with the kids."
              author="fatima werner"
            />
            <ReviewCard
              text="A great little walk right in the heart of Vannes' tourist center. The commentary is excellent, and the children's route along Canal 21 makes it interesting for little ones."
              author="Nadine POTIER"
            />
          </div>

          {/* Column 3: 2 text reviews */}
          <div className="flex flex-col gap-4">
            <ReviewCard
              text="A good option for a quick visit to Vannes and its city center. The driver was excellent, as some streets are very narrow. It's very helpful for finding the monuments you want to see."
              author="Gorce Romain"
            />
            <ReviewCard
              text="A lovely little train that goes everywhere, even through the narrow streets of old Vannes! A must-do when you're in Vannes 😄 The driver is friendly. Headphones are available to listen to the guided tour in many different languages. Departure from the Port and then just let yourself be guided!"
              author="marjory coll"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
