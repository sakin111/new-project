import FlipLink from "./FlipLink";



const Footer = () => {
    return (
      


<div className="bg-neutral">
<footer className="footer bg-neutral text-neutral-content mx-auto max-w-6xl p-10 mt-14">
  <nav>
    <h6 className="text-xl mb-3 font-semibold font-lato text-white">Best Sale</h6>
    <a className="link link-hover">Sprouted Ragi Mix</a>
    <a className="link link-hover">Sprouted Healthy Mix</a>
    <a className="link link-hover">Little Combo 1</a>
    <a className="link link-hover">Little Combo 2</a>
  </nav>
  <nav>
    <h6 className="text-xl mb-3 font-semibold font-lato text-white">Terms and Policy</h6>
    <a className="link link-hover">About Us</a>
    <a className="link link-hover">Private Policy</a>
    <a className="link link-hover">Refund Policy</a>
    <a className="link link-hover">Our Blogs</a>
  </nav>
<div>
 <div className="max-w-96">
 <h3 className="text-2xl">গুটিগুটিপা</h3>
 <p className="font-banglaFont my-3">আমরা শুধুমাত্র সেই সকল প্রোডাক্ট অফার করি যা বাচ্চাদের মানসিক ও শারীরিক গঠনে সহযোগিতা করে।</p>
 </div>
<section className="grid place-content-start gap-2 text-cyan-500 py-5 ">
      <FlipLink href="#">TikTok</FlipLink>
      <FlipLink href="#">YouTube</FlipLink>
      <FlipLink href="#">Facebook</FlipLink>
      <FlipLink href="#">Instagram</FlipLink>
    </section>
</div>
</footer>

 <div className="max-w-7xl h-[1px] bg-slate-600 mx-auto"></div>
<div className="footer footer-center p-4">
  <aside>
    <p className="text-gray-300">Copyright © {new Date().getFullYear()} - Gutigutipa</p>
  </aside>
</div>

</div>










      
    
  );
};



export default Footer;