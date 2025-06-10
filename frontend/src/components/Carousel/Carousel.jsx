import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import s from "./Carousel.module.scss";
import {BASE_URL} from "../../api/api";

export const Carousel = ({ photos = [], price }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className={s.embla}>
      <div className={s.embla__viewport} ref={emblaRef}>
        <div className={s.embla__container}>
          {photos.map((photo, index) =>
            <div className={s.embla__slide} key={index}>
              <img className={s.embla__slide__img} src={`${BASE_URL}/${photo}`} alt="img"/>
            </div>
          )}
        </div>
        <div className={s.embla__viewport__price}>${price}</div>
      </div>
      <div className={s.embla__controls}>
        <button className={s.embla__button} onClick={scrollPrev}>‹</button>
        <div className={s.embla__dots}>
          {photos.map((_, index) => (
            <button
              key={index}
              className={`${s.embla__dot} ${index === selectedIndex ? s["is-selected"] : ""}`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>
        <button className={s.embla__button} onClick={scrollNext}>›</button>
      </div>
    </div>
  );
};

