import { ImageGallery } from "@/modules/shared/components/ui/icons";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useState, useEffect } from "react";

type GalleryProps = {
  images: {
    absoluteUrl: string;
    thumbnailPath: string;
    path: string;
    title?: string;
  }[];
};

function Gallery({ images }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const openLightBox = (index: number) => {
    setSlideIndex(index);
    setOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 bg-white gap-2 relative">
      {loading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`animate-pulse bg-gray-300 ${
              index ? "hidden md:block md:col-span-1 md:row-span-1 h-40" : "md:col-span-2 md:row-span-2 h-[330px]"
            }`}
          />
        ))
      ) : (
        images.slice(0, 5).map((slide, index) => {
          let extraClass = "";
          if (index === 0) extraClass = "rounded-r-2xl";
          else if (index === 2) extraClass = "rounded-tl-2xl";
          else if (index === 4) extraClass = "rounded-bl-2xl";
          
          return (
            <Image
              key={index}
              priority={!index}
              onContextMenu={(e) => e.preventDefault()}
              src={slide.thumbnailPath || "/images/no-image.jpg"}
              alt={slide.title || "تصویر اقامتگاه"}
              title={slide.title || "تصویر اقامتگاه"}
              width={index ? 287 : 384}
              height={index ? 191 : 288}
              sizes="(max-width: 767px) 100vw, 50vw"
              onClick={() => openLightBox(index)}
              className={`cursor-pointer w-full object-cover max-md:rounded-2xl ${extraClass} ${
                index
                  ? "hidden md:block md:col-span-1 md:row-span-1 h-40"
                  : "md:col-span-2 md:row-span-2 h-[330px]"
              }`}
            />
          );
        })
      )}

      {!loading && (
        <span className="text-xs absolute bottom-3 rtl:left-3 ltr:right-3 bg-black/75 text-white px-5 py-2 rounded-lg pointer-events-none flex gap-2 items-center">
          <ImageGallery className="w-6 h-6 fill-current" />
          +{images.length} عکس
        </span>
      )}

      <Lightbox
        index={slideIndex}
        open={open}
        close={() => setOpen(false)}
        slides={images.map((img) => ({
          src: img.path,
          alt: img.title || "تصویر اقامتگاه",
          title: img.title || "تصویر اقامتگاه",
        }))}
        plugins={[Thumbnails, Captions]}
        captions={{ descriptionTextAlign: "center" }}
        thumbnails={{ width: 80, height: 50 }}
      />
    </div>
  );
}

export default Gallery;
