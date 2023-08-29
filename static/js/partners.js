import React from "react";
import Slider from "react-slick";

export function partners(){
        const settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div>
                <h2> Single Item</h2>
                <Slider {...settings}>
                    <a
                        href="https://kencloud.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/images/partners/kenLabs.svg" alt="Ken Labs Logo" />
                    </a>
                    <a
                        href="https://www.leewayhertz.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/images/partners/LeewayHertz.svg" alt="Leeway Hertz Logo" />
                    </a>
                    <a
                        href="https://www.piknik.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/images/partners/PiKNiK.svg" alt="PiKNiK Logo" />
                    </a>
                    <a
                        href="https://www.filswan.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/images/partners/FilSwan-logo.svg" alt="FilSwan Logo" />
                    </a>
                    <a
                        href="https://www.sxxfuture.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src="/images/partners/SanXiaXingFutureData.svg"
                            alt="San Xia Xing Future Data Logo"
                        />
                    </a>
                    <a href="https://infura.io/" target="_blank" rel="noreferrer">
                        <img src="/images/partners/Infura.svg" alt="Infura Logo" />
                    </a>
                    <a
                        href="https://www.cloudflare.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src="/images/partners/Cloudflare.svg" alt="Cloudflare Logo" />
                    </a>
                </Slider>
            </div>
        );
}

ReactDOM.render(React.createElement(partners),
    document.getElementById("partners"));
