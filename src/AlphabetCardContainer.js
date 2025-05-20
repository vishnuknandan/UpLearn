import React, { useState, useEffect, useMemo } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import AlphabetCard from "./AlphabetCard";
import Modal from "./Modal"; // Import a modal component
import "./Modal.css";
import "./AlphabetCardContainer.css";

const AlphabetCardContainer = () => {
  const { speak } = useSpeechSynthesis();

  const imageMap = useMemo(
    () => ({
      A: ["aeroplane.jpeg", "ant.jpeg", "apple.png"],
      B: ["ball.jpeg", "bat.jpeg", "boat.jpeg"],
      C: ["cat.jpeg", "car.jpeg", "cup.jpeg"],
      D: ["dog.jpeg", "drum.jpeg", "duck.jpeg"],
      E: ["elephand.jpeg", "egg.jpeg", "eraser.jpeg"],
      F: ["fish.jpeg", "flower.jpeg", "flag.jpeg"],
      G: ["goat.jpeg", "grass.jpeg", "guitar.jpeg"],
      H: ["hat.jpeg", "helicopter.jpeg", "house.jpeg"],
      I: ["icecream.jpeg", "ice.jpeg", "island.jpeg"],
      J: ["jacket.jpg", "jam.jpg", "juice.jpg"],
      K: ["kangaroo.jpg", "kite.jpg", "king.jpg"],
      L: ["lion.jpg", "leaf.jpg", "ladder.jpg"],
      M: ["milk.jpg", "monkey.jpg", "mango.jpg"],

      N: ["nest.jpg", "nut.jpg", "necklace.jpg"],
      O: ["octopus.jpg", "orange.jpg", "onion.jpg"],
      P: ["pigeon.jpg", "pillow.jpg", "pumpkin.jpg"],
      Q: ["queen.jpg", "question.jpg", "queue.jpg"],
      R: ["rabbit.jpg", "rose.jpg", "ring.jpg"],

      S: ["snake.jpg", "ship.jpg", "sheep.jpg"],
      T: ["telephone.jpg", "tree.jpg", "truck.jpg"],
      U: ["umberlla.jpg", "unicorn.jpg", "uniform.jpg"],
      V: ["vase.jpg", "van.jpg", "violin.jpg"],
      W: ["wallet.jpg", "watch.jpg", "watermelon.jpg"],
      X: ["x-mas tree.jpg", "x-mas crib.jpeg", "xylophone.jpg"],
      Y: ["yak.jpg", "yam.jpg", "yarn.jpg"],
      Z: ["zebra.jpg", "zoo.jpg", "zip.jpg"],
    }),
    [],
  );

  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Store the selected random image

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // Preload all images when the component mounts
  useEffect(() => {
    const preloadImages = () => {
      Object.keys(imageMap).forEach((letter) => {
        imageMap[letter].forEach((imageName) => {
          const img = new Image();
          img.src = `/img/images/${letter}/${imageName}`;
        });
      });
    };
    preloadImages();
  }, [imageMap]);

  const handleCardClick = (letter) => {
    setSelectedLetter(letter);

    // Select a random image for the letter and store it in state
    const images = imageMap[letter];
    if (images) {
      const randomIndex = Math.floor(Math.random() * images.length);
      setSelectedImage(images[randomIndex]);
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const handleSpeak = () => {
    if (selectedImage) {
      const imageName = selectedImage.split(".")[0]; // Get the name of the image
      const message = `${selectedLetter.toUpperCase()} for ${imageName.toUpperCase()}`;
      speak({ text: message });
    }
  };

  return (
    <div className="alphabet-card-container">
      {alphabet.split("").map((letter) => (
        <AlphabetCard
          imageSrc={`/img/alphabet/${letter}.png`}
          key={letter}
          letter={letter}
          onClick={() => handleCardClick(letter)}
        />
      ))}

      {isModalOpen && selectedImage && (
        <Modal onClose={closeModal}>
          <div className="modal-content">
            <img
              src={`/img/images/${selectedLetter}/${selectedImage}`}
              alt={`Object for ${selectedLetter}`}
              className="modal-image"
            />
            <h2 className="image-title">
              {selectedImage.split(".")[0].toUpperCase()}
            </h2>
            <div className="modal-buttons">
              <button className="speak-button" onClick={handleSpeak}>
                Speak
              </button>
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AlphabetCardContainer;
