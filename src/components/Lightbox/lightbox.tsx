import ImageLightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { LightboxNavButton } from "./lightboxNavButton";
import { LightboxCloseButton } from "./lightboxCloseButton";

interface LightboxProps {
  open: boolean;
  index: number;
  setIsOpen: (value: boolean) => void;
  images: any[];
}

export default function Lightbox({
  open,
  index,
  setIsOpen,
  images,
}: LightboxProps) {
  return (
    <ImageLightbox
      styles={{
        container: {
          backgroundColor: "rgba(0, 0, 0, .75)",
        },
      }}
      open={open}
      index={index}
      close={() => setIsOpen(false)}
      slides={images}
      carousel={{
        finite: images.length <= 1,
      }}
      render={{
        slide: (image: any, _offset, rect) => {
          const width = Math.round(
            Math.min(rect.width, (rect.height / image.height) * image.width)
          );
          const height = Math.round(
            Math.min(rect.height, (rect.width / image.width) * image.height)
          );
          return (
            <div
              style={{ position: "relative", width, height, maxWidth: "600px" }}
            >
              <Image
                src={image}
                layout="fill"
                loading="eager"
                placeholder="blur"
                objectFit="contain"
                alt={"alt" in image ? image.alt : ""}
                sizes={
                  typeof window !== "undefined"
                    ? `${Math.ceil((width / window.innerWidth) * 100)}vw`
                    : `${width}px`
                }
                blurDataURL={image.blurDataURL}
              />
            </div>
          );
        },
        buttonPrev: () => {
          if (images.length < 2) return null;
          return <LightboxNavButton direction="prev" />;
        },

        buttonNext: () => {
          if (images.length < 2) return null;
          return <LightboxNavButton direction="next" />;
        },

        buttonClose: () => {
          return <LightboxCloseButton />;
        },
      }}
    />
  );
}
