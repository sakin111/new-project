import PlatformFeatures from "./otherSections/PlatformFeatures";
import TestimonialSlider from "./otherSections/TestimonialSlider";
import Section1 from "./Section1/Section1";
import Section2 from "./Section2/Section2";
import Slider from "./Slider/Slider";


const HomePage = () => {
    return (
        <div>
        <Slider></Slider>
        <Section1></Section1>
        <Section2></Section2>
        <PlatformFeatures></PlatformFeatures>
        <TestimonialSlider></TestimonialSlider>
        </div>
    );
};

export default HomePage;