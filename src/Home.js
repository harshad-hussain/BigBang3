import React, { useEffect } from 'react';
import SwiperCore, { EffectCoverflow } from 'swiper';
import 'swiper/swiper.min.css';
import Swiper from 'swiper';
import Searchbar from './searchbar';
import firefoxlogo from '../src/img/logooo.webp'
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import { Helmet } from 'react-helmet';
import ScrollReveal from 'scrollreveal';
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import styles from '../src/css/styles.css';
import { Link } from 'react-router-dom';
import home1 from '../src/img/home1.jpg';
import Card2 from './AgentDashboard/Card2';
import home2 from '../src/img/home2.jpg';
import about1 from '../src/img/about1.jpg';
import about2 from '../src/img/about2.jpg';
import discover1 from '../src/img/discover1.jpg';
import discover2 from '../src/img/discover2.jpg';
import discover3 from '../src/img/discover3.jpg';
import discover4 from '../src/img/discover4.jpg';
import experience1 from '../src/img/experience1.jpg';
import experience2 from '../src/img/experience2.jpg';
import video from '../src/video/video.mp4';
import place1 from '../src/img/place1.jpg';
import place2 from '../src/img/place2.jpg';
import place3 from '../src/img/place3.jpg';
import place4 from '../src/img/place4.jpg';
import place5 from '../src/img/place5.jpg';
import sponsors1 from '../src/img/sponsors1.png';
import sponsors2 from '../src/img/sponsors2.png';
import sponsors3 from '../src/img/sponsors3.png';
import sponsors4 from '../src/img/sponsors4.png';
import sponsors5 from '../src/img/sponsors5.png';
import Contact from './Contactus';






function Home() {
    useEffect(() => {
        // ==================== SHOW MENU ====================
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        const navClose = document.getElementById('nav-close');

        // MENU SHOW
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.add('show-menu');
            });
        }

        // MENU HIDDEN
        if (navClose) {
            navClose.addEventListener('click', () => {
                navMenu.classList.remove('show-menu');
            });
        }

        // REMOVE MENU MOBILE
        const navLink = document.querySelectorAll('.nav__link');
        function linkAction() {
            navMenu.classList.remove('show-menu');
        }
        navLink.forEach((n) => n.addEventListener('click', linkAction));

        // CHANGE BACKGROUND HEADER
        function scrollHeader() {
            const header = document.getElementById('header');
            if (this.scrollY >= 100) header.classList.add('scroll-header');
            else header.classList.remove('scroll-header');
        }
        window.addEventListener('scroll', scrollHeader);

        // SWIPER DISCOVER
        const swiper = new Swiper('.discover__container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 32,
            coverflowEffect: {
                rotate: 0,
            },
        });

        // VIDEO
        const videoFile = document.getElementById('video-file');
        const videoButton = document.getElementById('video-button');
        const videoIcon = document.getElementById('video-icon');

        function playPause() {
            if (videoFile.paused) {
                videoFile.play();
                videoIcon.classList.add('ri-pause-line');
                videoIcon.classList.remove('ri-play-line');
            } else {
                videoFile.pause();
                videoIcon.classList.remove('ri-pause-line');
                videoIcon.classList.add('ri-play-line');
            }
        }

        videoButton.addEventListener('click', playPause);

        function finalVideo() {
            videoIcon.classList.remove('ri-pause-line');
            videoIcon.classList.add('ri-play-line');
        }
        videoFile.addEventListener('ended', finalVideo);

        // SHOW SCROLL UP
        function scrollUp() {
            const scrollUp = document.getElementById('scroll-up');
            if (this.scrollY >= 200) scrollUp.classList.add('show-scroll');
            else scrollUp.classList.remove('show-scroll');
        }
        window.addEventListener('scroll', scrollUp);

        // SCROLL SECTIONS ACTIVE LINK
        const sections = document.querySelectorAll('section[id]');
        function scrollActive() {
            const scrollY = window.pageYOffset;

            sections.forEach((current) => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document
                        .querySelector('.nav__menu a[href*=' + sectionId + ']')
                        .classList.add('active-link');
                } else {
                    document
                        .querySelector('.nav__menu a[href*=' + sectionId + ']')
                        .classList.remove('active-link');
                }
            });
        }
        window.addEventListener('scroll', scrollActive);

        // SCROLL REVEAL ANIMATION
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2800,
        });

        sr.reveal(
            `.home__data, .home__social-link, .home__info,
             .discover__container,
             .experience__data, .experience__overlay,
             .place__card,
             .sponsor__content,
             .footer__data, .footer__rights`,
            {
                origin: 'top',
                interval: 100,
            }
        );

        sr.reveal(
            `.about__data, 
             .video__description,
             .subscribe__description`,
            {
                origin: 'left',
            }
        );

        sr.reveal(
            `.about__img-overlay, 
             .video__content,
             .subscribe__form`,
            {
                origin: 'right',
                interval: 100,
            }
        );
    }, []);

    return (
        <div className="App">
            {/* HEADER */}
            <header className="header" id="header">
                <nav className="nav container">
                <img src={firefoxlogo} alt="" className="logo" /> 
                    <a href="#" className="nav__logo">Travel</a>

                    <div className="nav__menu" id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <a href="#home" className="nav__link active-link">Home</a>
                            </li>
                            <li className="nav__item">
                                <a href="#about" className="nav__link">About</a>
                            </li>
                            <li className="nav__item">
                                <a href="#discover" className="nav__link">Discover</a>
                            </li>
                            <li className="nav__item">
                                <a href="#place" className="nav__link">Places</a>
                            </li>
                            <li className="nav__item">
                                <Link to="/Gallery" className="nav__link">
                                    <i className="ri-user-line"></i> Gallery
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link to="/Booking" className="nav__link">
                                    <i className="ri-user-line"></i> Book
                                </Link>
                            </li>
                            <li className="nav__item">
                                <Link to="/ChooseLogin" className="nav__link">
                                    <i className="ri-user-line"></i> Sign-in
                                </Link>
                            </li>
                        </ul>

                        <div className="nav__dark">
                            {/* Theme change button */}
                            <span className="change-theme-name">Dark mode</span>
                            <i className="ri-moon-line change-theme" id="theme-button"></i>
                        </div>

                        <i className="ri-close-line nav__close" id="nav-close"></i>
                    </div>

                    <div className="nav__toggle" id="nav-toggle">
                        <i className="ri-function-line"></i>
                    </div>
                </nav>
            </header>

            <main className="main">
            
                <section className="home" id="home">
                   
                    <img src={home1} alt="" className="home__img" />

                    <div className="home__container container grid">
                        <div className="home__data">
                            <span className="home__data-subtitle">Discover your place</span>
                            <h1 className="home__data-title">Explore The <br /> Best <b>Beautiful <br /> Beaches</b></h1>
                            <a href="#" className="button">Explore</a>
                        </div>

                        <div className="home__social">
                            <a href="https://www.facebook.com/" target="_blank" className="home__social-link">
                                <i className="ri-facebook-box-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" className="home__social-link">
                                <i className="ri-instagram-fill"></i>
                            </a>
                            <a href="https://twitter.com/" target="_blank" className="home__social-link">
                                <i className="ri-twitter-fill"></i>
                            </a>
                        </div>

                        <div className="home__info">
                            <div>
                                <span className="home__info-title">5 best places to visit</span>
                                <a href="" className="button button--flex button--link home__info-button">
                                    More <i className="ri-arrow-right-line"></i>
                                </a>
                            </div>

                            <div className="home__info-overlay">
                                <img src={home2} alt="" className="home__info-img" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section className="about section" id="about">
                    <div className="about__container container grid">
                        <div className="about__data">
                            <h2 className="section__title about__title">More Information <br /> About The Best Beaches</h2>
                            <p className="about__description">You can find the most beautiful and pleasant places at the best
                                prices with special discounts, you choose the place we will guide you all the way to wait, get your
                                place now.
                            </p>
                            <a href="#" className="button">Reserve a place</a>
                        </div>

                        <div className="about__img">
                            <div className="about__img-overlay">
                                <img src={about1} alt="" className="about__img-one" />
                            </div>

                            <div className="about__img-overlay">
                                <img src={about2} alt="" className="about__img-two" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* DISCOVER */}
                <section className="discover section" id="discover">
                    <h2 className="section__title">Discover the most <br /> attractive places</h2>

                    <div className="discover__container container swiper-container">
                        <div className="swiper-wrapper">
                            {/* DISCOVER 1 */}
                            <div className="discover__card swiper-slide">
                                <img src={discover1} alt="" className="discover__img" />
                                <div className="discover__data">
                                    <h2 className="discover__title">Bali</h2>
                                    <span className="discover__description">24 tours available</span>
                                </div>
                            </div>

                            {/* DISCOVER 2 */}
                            <div className="discover__card swiper-slide">
                                <img src={discover2} alt="" className="discover__img" />
                                <div className="discover__data">
                                    <h2 className="discover__title">Hawaii</h2>
                                    <span className="discover__description">15 tours available</span>
                                </div>
                            </div>

                            {/* DISCOVER 3 */}
                            <div className="discover__card swiper-slide">
                                <img src={discover3} alt="" className="discover__img" />
                                <div className="discover__data">
                                    <h2 className="discover__title">Hvar</h2>
                                    <span className="discover__description">18 tours available</span>
                                </div>
                            </div>

                            {/* DISCOVER 4 */}
                            <div className="discover__card swiper-slide">
                                <img src={discover4} alt="" className="discover__img" />
                                <div className="discover__data">
                                    <h2 className="discover__title">Whitehaven</h2>
                                    <span className="discover__description">32 tours available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* EXPERIENCE */}
                <section className="experience section">
                    <h2 className="section__title">With Our Experience <br /> We Will Serve You</h2>

                    <div className="experience__container container grid">
                        <div className="experience__content grid">
                            <div className="experience__data">
                                <h2 className="experience__number">20</h2>
                                <span className="experience__description">Year <br /> Experience</span>
                            </div>

                            <div className="experience__data">
                                <h2 className="experience__number">75</h2>
                                <span className="experience__description">Complete <br /> tours</span>
                            </div>

                            <div className="experience__data">
                                <h2 className="experience__number">650+</h2>
                                <span className="experience__description">Tourist <br /> Destination</span>
                            </div>
                        </div>

                        <div className="experience__img grid">
                            <div className="experience__overlay">
                                <img src={experience1} alt="" className="experience__img-one" />
                            </div>

                            <div className="experience__overlay">
                                <img src={experience2} alt="" className="experience__img-two" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* VIDEO */}
                <section className="video section">
                    <h2 className="section__title">Video Tour</h2>

                    <div className="video__container container">
                        <p className="video__description">Find out more with our video of the most beautiful and
                            pleasant places for you and your family.
                        </p>

                        <div className="video__content">
                            <video id="video-file" controls>
                                <source src={video} type="video/mp4" />
                            </video>

                            <button className="button button--flex video__button" id="video-button">
                                <i className="ri-play-line video__button-icon" id="video-icon"></i>
                            </button>
                        </div>
                    </div>
                </section>

                {/* PLACES */}
                <section className="place section" id="place">
                    <h2 className="section__title">Choose Your Place</h2>

                    <div className="place__container container grid">
                        {/* PLACES CARD 1 */}
                        <div className="place__card">
                            <img src={place1} alt="" className="place__img" />

                            <div className="place__content">
                                <span className="place__rating">
                                    <i className="ri-star-line place__rating-icon"></i>
                                    <span className="place__rating-number">4,8</span>
                                </span>

                                <div className="place__data">
                                    <h3 className="place__title">Bali</h3>
                                    <span className="place__subtitle">Indonesia</span>
                                    <span className="place__price">$2499</span>
                                </div>
                            </div>

                            <button className="button button--flex place__button">
                                <i className="ri-arrow-right-line"></i>
                            </button>
                        </div>

                        {/* PLACES CARD 2 */}
                        <div className="place__card">
                            <img src={place2} alt="" className="place__img" />

                            <div className="place__content">
                                <span className="place__rating">
                                    <i className="ri-star-line place__rating-icon"></i>
                                    <span className="place__rating-number">5,0</span>
                                </span>

                                <div className="place__data">
                                    <h3 className="place__title">Bora Bora</h3>
                                    <span className="place__subtitle">Polinesia</span>
                                    <span className="place__price">$1599</span>
                                </div>
                            </div>

                            <button className="button button--flex place__button">
                                <i className="ri-arrow-right-line"></i>
                            </button>
                        </div>

                        {/* PLACES CARD 3 */}
                        <div className="place__card">
                            <img src={place3} alt="" className="place__img" />

                            <div className="place__content">
                                <span className="place__rating">
                                    <i className="ri-star-line place__rating-icon"></i>
                                    <span className="place__rating-number">4,9</span>
                                </span>

                                <div className="place__data">
                                    <h3 className="place__title">Hawaii</h3>
                                    <span className="place__subtitle">EE.UU</span>
                                    <span className="place__price">$3499</span>
                                </div>
                            </div>

                            <button className="button button--flex place__button">
                                <i className="ri-arrow-right-line"></i>
                            </button>
                        </div>

                        {/* PLACES CARD 4 */}
                        <div className="place__card">
                            <img src={place4} alt="" className="place__img" />

                            <div className="place__content">
                                <span className="place__rating">
                                    <i className="ri-star-line place__rating-icon"></i>
                                    <span className="place__rating-number">4,8</span>
                                </span>

                                <div className="place__data">
                                    <h3 className="place__title">Whitehaven</h3>
                                    <span className="place__subtitle">Australia</span>
                                    <span className="place__price">$2499</span>
                                </div>
                            </div>

                            <button className="button button--flex place__button">
                                <i className="ri-arrow-right-line"></i>
                            </button>
                        </div>

                        {/* PLACES CARD 5 */}
                        <div className="place__card">
                            <img src={place5} alt="" className="place__img" />

                            <div className="place__content">
                                <span className="place__rating">
                                    <i className="ri-star-line place__rating-icon"></i>
                                    <span className="place__rating-number">4,8</span>
                                </span>

                                <div className="place__data">
                                    <h3 className="place__title">Hvar</h3>
                                    <span className="place__subtitle">Croacia</span>
                                    <span className="place__price">$1999</span>
                                </div>
                            </div>

                            <button className="button button--flex place__button">
                                <i className="ri-arrow-right-line"></i>
                            </button>
                        </div>
                    </div>
                </section>

                {/* SUBSCRIBE */}
                <section className="subscribe section">
                    <div className="subscribe__bg">
                        <div className="subscribe__container container">
                            <h2 className="section__title subscribe__title">Subscribe Our <br /> Newsletter</h2>
                            <p className="subscribe__description">Subscribe to our newsletter and get a
                                special 30% discount.
                            </p>

                            <form action="" className="subscribe__form">
                                <input type="text" placeholder="Enter email" className="subscribe__input" />

                                <button className="button">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* SPONSORS */}
                <section className="sponsor section">
                    <div className="sponsor__container container grid">
                        <div className="sponsor__content">
                            <img src={sponsors1} alt="" className="sponsor__img" />
                        </div>
                        <div className="sponsor__content">
                            <img src={sponsors2} alt="" className="sponsor__img" />
                        </div>
                        <div className="sponsor__content">
                            <img src={sponsors3} alt="" className="sponsor__img" />
                        </div>
                        <div className="sponsor__content">
                            <img src={sponsors4} alt="" className="sponsor__img" />
                        </div>
                        <div className="sponsor__content">
                            <img src={sponsors5} alt="" className="sponsor__img" />
                        </div>
                        
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="footer section">
                <div className="footer__container container grid">
                    <div className="footer__content grid">
                        <div className="footer__data">
                            <h3 className="footer__title">Travel</h3>
                            <p className="footer__description">Get out and experience the world</p>
                        </div>

                        <div className="footer__data">
                            <h3 className="footer__subtitle">About</h3>
                            <ul>
                                <li className="footer__item">
                                    <a href="#" className="footer__link">About us</a>
                                </li>
                                <li className="footer__item">
                                    <a href="#" className="footer__link">Features</a>
                                </li>
                                <li className="footer__item">
                                    <a href="#" className="footer__link">News</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer__data">
                            <h3 className="footer__subtitle">Support</h3>
                            <ul>
                                <li className="footer__item">
                                    <a href="#" className="footer__link">FAQ</a>
                                </li>
                                <li className="footer__item">
                                    <a href="#" className="footer__link">Contact us</a>
                                </li>
                                <li className="footer__item">
                                    <a href="#" className="footer__link">Privacy policy</a>
                                </li>
                                <li className="footer__item">
                                    <a href="#" className="footer__link">Terms of service</a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer__data">
                            <h3 className="footer__subtitle">Social</h3>
                            <a href="https://www.facebook.com/" target="_blank" className="footer__social">
                                <i className="ri-facebook-box-fill"></i>
                            </a>
                            <a href="https://www.instagram.com/" target="_blank" className="footer__social">
                                <i className="ri-instagram-fill"></i>
                            </a>
                            <a href="https://twitter.com/" target="_blank" className="footer__social">
                                <i className="ri-twitter-fill"></i>
                            </a>
                        </div>
                    </div>

                    <p className="footer__copy">&#169; 2023 Travel. All right reserved</p>
                </div>
            </footer>

            {/* SCROLL UP */}
            <a href="#" className="scrollup" id="scroll-up">
                <i className="ri-arrow-up-s-line scrollup__icon"></i>
            </a>
        </div>
    );
}

export default Home;
