import image1 from "./images/image1.jpg"
import image2 from "./images/image2.jpg"
import image3 from "./images/image3.jpg"
import image4 from "./images/image4.jpg"
import image5 from "./images/image5.jpg"
import image6 from "./images/image6.jpg"
import image7 from "./images/image7.jpg"
import image8 from "./images/image8.jpg"
import image9 from "./images/image9.jpg"
import image10 from "./images/image10.jpg"
import image11 from "./images/image11.jpg"
import image12 from "./images/image12.jpg"
import image13 from "./images/image13.jpg"
import image14 from "./images/image14.jpg"
import image15 from "./images/image15.jpg"
// import image16 from "./images/image16.jpg"
import image17 from "./images/image17.jpg"
import image18 from "./images/image18.jpg"
import image20 from "./images/image20.jpg"
import image21 from "./images/image21.jpg"
import image22 from "./images/image22.jpg"
import image23 from "./images/image23.jpg"
import image24 from "./images/image24.jpg"
import image25 from "./images/image25.jpg"
import image26 from "./images/image26.jpg"
import image27 from "./images/image27.jpg"
import image28 from "./images/image28.jpg"
import image29 from "./images/image29.jpg"
import image30 from "./images/image30.jpg"
import image31 from "./images/image31.jpg"
import image32 from "./images/image32.jpg"
import image33 from "./images/image33.jpg"
import image34 from "./images/image34.jpg"
import image35 from "./images/image35.jpg"
import image36 from "./images/image36.jpg"
import image37 from "./images/image37.jpg"
import image38 from "./images/image38.jpg"
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   WhatsappShareButton
// } from "react-share";
// import {
//   FacebookIcon,
//   TwitterIcon,
//   WhatsappIcon,
// } from "react-share"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  // faShareNodes,
  faDownload,
  faPhotoFilm,
  faCamera,
  faArrowCircleUp,
  faArrowCircleLeft,
  faArrowCircleRight
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-scroll';
import { useState, useEffect } from "react";

const App = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    // image16,
    image17,
    image18,
    image20,
    image21,
    image22,
    image23,
    image24,
    image25,
    image26,
    image27,
    image28,
    image29,
    image30,
    image31,
    image32,
    image33,
    image34,
    image35,
    image36,
    image37,
    image38
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="App">
      <HeroSection />
      <Heading />
      <Gallery
        images={images}
        openLightbox={openLightbox} />
      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
      <Backup />
      <Footer />
    </div>
  );
};


const HeroSection = () => {
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
  const images = [
    image5,
    image18,
    image23,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImageIndex((backgroundImageIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  });

  const backgroundImage = images[backgroundImageIndex];

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), 
        rgba(0, 0, 0, 0.3)), 
        url(${backgroundImage})`,

      }}
    >

      <div className="hero-content">
        <h1>THE NWOSUS</h1>
        <button className="hero-btn">
          <Link to="gallery" smooth={true} duration={500}>
            View Gallery <FontAwesomeIcon icon={faPhotoFilm} />
          </Link>
        </button>

      </div>
    </div>
  );
};


function Heading() {
  return <section className="Gallery-heading" id="gallery">
    <h2>My Gallery  <FontAwesomeIcon icon={faCamera} /> </h2>
    <span className="underline"></span>
    <p>
      "Explore the stunning collection of the Nwosu's photos. Click to view in a beautiful lightbox gallery. Show your appreciation by liking, and download your favorite images to cherish forever."</p>
  </section>
}

function Gallery({ images, openLightbox }) {
  // const [likedImages, setLikedImages] = useState([]); // State to track liked images

  const [likedImages, setLikedImages] = useState(
    JSON.parse(localStorage.getItem('likedImages')) || []
  );

  // const shareUrl = images[0];

  function handleLikeClick(index) {
    if (likedImages.includes(index)) {
      // If already liked, remove from likedImages
      const updatedLikedImages = likedImages.filter((likedIndex) => likedIndex !== index);
      setLikedImages(updatedLikedImages);
    } else {
      // If not liked, add to likedImages
      setLikedImages([...likedImages, index]);
    }
  };

  function handleDownloadClick(image) {
    const link = document.createElement('a');
    link.href = image;
    link.download = image;
    link.click();
  }


  useEffect(() => {
    localStorage.setItem('likedImages', JSON.stringify(likedImages));
  }, [likedImages]);


  return (
    <div className="gallery yes">
      {images.map((image, index) => (
        <div
          key={index}
          className="thumbnail"
          onClick={() => openLightbox(index)} // Trigger the lightbox on image click
        >
          <img src={image} alt={index} className="chi" />
          <div className="thumbnail-actions">
            <button
              className={`like-button ${likedImages.includes(index) ? 'liked' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent lightbox from opening
                handleLikeClick(index);
              }}
            >
              {likedImages.includes(index) ?
                <FontAwesomeIcon icon={faHeart}
                  style={{ color: "red" }}
                  className="fa" /> :
                <FontAwesomeIcon icon={faHeart} className="fa" />}
            </button>
            {/*  */}
            {/* <FontAwesomeIcon icon={faCode} /> */}
            {/* <ShareButtons image={image} shareUrl={shareUrl} title={`Image ${index}`} /> */}
            {/*  */}

            <button
              className="download-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent lightbox from opening
                handleDownloadClick(image);
              }}
            >
              <FontAwesomeIcon icon={faDownload} className="fa" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};


const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  return (
    <div className="lightbox">
      <span className="close-button" onClick={onClose}>
        &#x2715;
      </span>
      <div className="lightbox-content">
        <img src={images[currentIndex]} alt={`${currentIndex}`} className="chi" />
        <div className="lightbox-navigation">
          <button onClick={onPrev}>
            <FontAwesomeIcon icon={faArrowCircleLeft} className="fa" />
          </button>
          <button onClick={onNext}>
            <FontAwesomeIcon icon={faArrowCircleRight} className="fa" />
          </button>
        </div>
      </div>
    </div>
  );
};


// const ShareButtons = ({ image, shareUrl, title }) => (
//   <div className="share-buttons container">
//     <span>
//       <FontAwesomeIcon
//         icon={faShareNodes}
//         className="fa" /></span>
//     <ul className="socials">
//       <li>
//         <WhatsappShareButton
//           url={shareUrl}
//           subject={title}
//           body={`Check out this image: ${image}`}
//           onClick={(e) => e.stopPropagation()}>
//           <WhatsappIcon size={32} round={true} />
//         </WhatsappShareButton>
//       </li>
//       <li>
//         <FacebookShareButton
//           url={shareUrl}
//           quote={title}
//           onClick={(e) => e.stopPropagation()}>
//           <FacebookIcon size={32} round={true} />
//         </FacebookShareButton>
//       </li>
//       <li>
//         <TwitterShareButton
//           url={shareUrl}
//           title={title} separator=":: "
//           onClick={(e) => e.stopPropagation()}>
//           <TwitterIcon size={32} round={true} />
//         </TwitterShareButton>
//       </li>
//     </ul>

//   </div>
// );
function Backup() {
  return <Link to="gallery" smooth={true} duration={500} className="upButton">
    Back to Top <FontAwesomeIcon icon={faArrowCircleUp} />
  </Link>
}
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2023 Patty's Gallery </p>
    </footer>
  );
};
export default App;
