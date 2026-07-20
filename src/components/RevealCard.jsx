"use client";
import React, { useEffect, useRef, useState } from "react";

const RevealCard = ({
  coverImage,
  titleImage,
  characterImage,
  width = 266,
  height = 400,
  hoverRotation = 25,
  titleTranslateY = -50,
  characterTranslateY = -15,
  characterTranslateZ = 100,
  alt = {
    cover: "Cover Image",
    title: "Title",
    character: "Character",
  },
  animation = {
    duration: 500,
    delay: 0,
  },
  priority = false,
  threshold = 0.3,
  className = "",
}) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const currentRef = cardRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasBeenRevealed) {
            setIsRevealed(true);
            setHasBeenRevealed(true);
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, hasBeenRevealed]);

  const handleCardClick = () => {
    setIsRevealed(!isRevealed);
    setHasBeenRevealed(true);
  };

  const animationStyle = {
    transitionDuration: `${animation.duration}ms`,
    transitionDelay: `${animation.delay}ms`,
  };

  const shouldReveal = isMobile
    ? isRevealed
    : isRevealed || (!hasBeenRevealed && isVisible);

  return (
    <div
      ref={cardRef}
      className={`reveal-card-container ${shouldReveal ? "mobile-revealed" : ""} ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={handleCardClick}
    >
      <div className="reveal-card-inner-wrapper">
        <div
          className="reveal-card-transform-box"
          style={
            {
              ...animationStyle,
              "--hover-rotation": `${hoverRotation}deg`,
            }
          }
        >
          <img
            src={coverImage}
            alt={alt.cover || "Cover Image"}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div
            className="absolute bottom-0 left-0 w-full h-10"
            style={{
              ...animationStyle,
              background: "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.45))",
            }}
          ></div>
        </div>
      </div>

      <div className="reveal-card-character-box">
        {React.isValidElement(characterImage) ? (
          <div className="reveal-card-character-img" style={animationStyle}>
            {characterImage}
          </div>
        ) : (
          <img
            src={characterImage}
            alt={alt.character || "Character"}
            className="reveal-card-character-img"
            style={animationStyle}
          />
        )}
      </div>

      <div className="reveal-card-title-box">
        {React.isValidElement(titleImage) ? (
          <div className="reveal-card-title-img" style={animationStyle}>
            {titleImage}
          </div>
        ) : (
          <img
            src={titleImage}
            alt={alt.title || "Title"}
            className="reveal-card-title-img"
            style={animationStyle}
          />
        )}
      </div>

      {isMobile && (
        <div className="reveal-card-indicator" style={{ pointerEvents: "none" }}>
          <span style={{ fontSize: "1rem" }}>{isRevealed ? "×" : "+"}</span>
        </div>
      )}
    </div>
  );
};

export default RevealCard;
