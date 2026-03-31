import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Settings, Quote, X,
  FlaskConical, Dna, UtensilsCrossed, Stethoscope, BriefcaseMedical
} from 'lucide-react';

const products = [
  { 
    title: "PW Generation System",
    description: "Delivers high-purity water using RO & EDI system ensuring compliance with USP, EP, and IP standards, featuring heat sanitization for enhanced microbial control, in a compact SS316L skid-mounted, automated, and validation-ready design.",
    img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80"
  }, 
  { 
    title: "PW/WFI Storage & Dist. System",
    description: "Ensures hygienic/sterile storage and continuous high-velocity recirculation (>1.2 m/s) of PW/WFI through a sanitary SS316L loop, maintaining microbial control and compliance with USP/EP/IP standards, with heat sanitization capability and PLC-based automation for full regulatory compliance.",
    img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80"
  }, 
  { 
    title: "WFI Generation System",
    description: "Delivers pyrogen-free Water for Injection using Multi-Effect Distillation process, ensuring compliance with global pharmacopeia standards, with continuous endotoxin control, in a sanitary design with advanced PLC-SCADA automation.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  }, 
  { 
    title: "Process Vessels",
    description: "Designed for controlled processing, mixing, storage, and reaction of pharmaceutical and biotech industry using hygienic SS316L construction, ensuring compliance with GMP, ASME BPE, and global regulatory standards, with optimized agitation, temperature control, and CIP/SIP compatibility, in a skid-integrated or standalone automated design.",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Pure Steam Generator",
    description: "Provides sterile, pyrogen-free pure steam using controlled evaporation and separation processes, ensuring compliance with global pharmacopeia standards, with superior endotoxin control and optimized thermal efficiency, in a SS316L compact skid-mounted system with advanced PLC-based automation.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  }, 
  { 
    title: "WIP Skid",
    description: "Provides automated, high-efficiency cleaning of process equipment using controlled spray systems, ensuring compliance with GMP and regulatory standards, with optimized water and chemical usage, in a compact SS316L skid-mounted design with PLC-based automation.",
    img: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Ducting for Process Equipment",
    description: "Provides contamination-free air handling for FBD, Coater, and allied equipment with superior internal finish and enhanced cleanability via integrated spray balls and inspection view glasses, in a leak-proof and modular design.",
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80"
  }, 
  { 
    title: "Utility Pendants",
    description: "Provides centralized and hygienic utility distribution for cleanroom operations, integrating process gases, electrical, and service connections, ensuring compliance with GMP and cleanroom standards.",
    img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Process Piping",
    description: "The Process Piping System is a critical backbone of pharmaceutical and high-purity process plants, designed to enable safe, contamination-free transfer of process fluids, ensuring compliance with GMP and ASME BPE standards.",
    img: "https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&w=800&q=80"
  }, 
  { 
    title: "Hygienic Filter Housings",
    description: "Provides Air/liquid filtration using precision cartridge elements, ensuring efficient removal of suspended particles in pharmaceutical and critical process applications, compliant with GMP and FDA standards, with SS316L electro-polished construction and CIP/SIP-compatible design.",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Clean Steam Separator",
    description: "Provides efficient separation of entrained moisture from clean steam using high-efficiency centrifugal and gravity-based separation mechanisms, ensuring delivery of dry, high-purity steam suitable for pharmaceutical applications, with compliance to GMP and international standards, in a hygienic SS316L design with optimized condensate removal and minimal pressure drop.",
    img: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80"
  }, 
  { 
    title: "Pure Steam Sampler Cooler",
    description: "Provides safe and efficient cooling of high-temperature pure steam samples using controlled heat exchange, ensuring representative and condensable samples for analysis in compliance with pharmaceutical standards, with hygienic SS316L construction and compact inline design suitable for sterile sampling applications.",
    img: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=800&q=80"
  }
];

// Reusable Animation Variant
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const ImagePlaceholder = ({ text, className }) => (
  <div className={`flex items-center justify-center bg-gray-200 border-2 border-dashed border-gray-400 text-gray-500 font-semibold ${className}`}>
    {text}
  </div>
);

const LogoPlaceholder = ({ className = '', isScrolled = false }) => (
  <div className={`flex flex-col transition-transform duration-300 ${isScrolled ? 'scale-90 origin-left' : ''} ${className}`}>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-syne font-extrabold text-[#1A6FB0] tracking-tight">Fayme</span>
      <span className="text-3xl font-syne font-extrabold text-[#2ECC71]">✦</span>
    </div>
    <span className="text-[#2ECC71] text-[10px] uppercase font-bold tracking-widest leading-none mt-1">ENGINEERING PVT. LTD.</span>
  </div>
);

const Navbar = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md h-16' : 'bg-white shadow-sm h-24 border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <LogoPlaceholder isScrolled={isScrolled} />
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-600 uppercase tracking-wide">
          {['Home', 'About', 'Industries', 'Why Us', 'Products', 'Partners'].map((item) => {
            const id = item.toLowerCase().replace(' ', '-');
            const isActive = activeSection === id;
            return (
              <a 
                key={item} 
                href={`#${id}`} 
                className={`transition-colors py-2 border-b-2 ${isActive ? 'text-[#2ECC71] border-[#2ECC71]' : 'border-transparent hover:text-[#2ECC71]'}`}
              >
                {item}
              </a>
            );
          })}
        </div>
        <div className="hidden md:block">
          <a href="#contact" className={`border-2 border-[#1A6FB0] text-[#1A6FB0] hover:bg-[#1A6FB0] hover:text-white rounded-full font-bold transition-all ${isScrolled ? 'px-5 py-1.5 text-sm' : 'px-6 py-2'}`}>
            Request a Quote
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex bg-gray-900 group">
      {/* Background Images Layer */}
      <div className="absolute inset-0 z-0">
         {/* Right Side Base */}
         <div className="absolute inset-0 bg-slate-800">
             <img src="/hero-right.jpg" alt="Customized Solutions" className="w-full h-full object-cover opacity-80" />
             <div className="absolute inset-0 bg-black/30"></div>
         </div>
         {/* Left Side Diagonal Cut */}
         <div className="absolute inset-0 z-10 bg-slate-700" style={{ clipPath: 'polygon(0 0, 55% 0, 45% 100%, 0% 100%)' }}>
            <img src="/hero-left.jpg" alt="Purified Water Generation" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-black/40"></div>
         </div>
      </div>

      {/* Decorative Diagonal Strips */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[#2ECC71]" style={{ clipPath: 'polygon(55% 0, 56.5% 0, 46.5% 100%, 45% 100%)' }}></div>
        <div className="absolute inset-0 bg-[#1A6FB0]" style={{ clipPath: 'polygon(56.5% 0, 60% 0, 50% 100%, 46.5% 100%)' }}></div>
      </div>

      {/* Text Content Safely Floating Above Everything */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 h-full flex pt-32 pb-24 items-center justify-between box-border pointer-events-none">
        {/* Left Bottom Text */}
        <motion.div 
           initial={{ x: -50, opacity: 0 }} 
           animate={{ x: 0, opacity: 1 }} 
           transition={{ duration: 0.8, delay: 0.2 }}
           className="self-end max-w-[40%] pointer-events-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white mb-2 font-syne leading-[1.15]">PURIFIED WATER<br/>GENERATION</h2>
          <p className="text-white/90 text-[15px] font-medium drop-shadow-md">Technology consulting provides<br/>a total end to end solution"</p>
        </motion.div>

        {/* Right Top Text */}
        <motion.div 
           initial={{ x: 50, opacity: 0 }} 
           animate={{ x: 0, opacity: 1 }} 
           transition={{ duration: 0.8, delay: 0.4 }}
           className="self-start text-right max-w-[40%] mt-8 pointer-events-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white mb-2 font-syne leading-[1.15]">CUSTOMIZED SOLUTION<br/>FOR YOUR BUSINESS NEEDS</h2>
          <p className="text-white/90 text-[15px] font-medium drop-shadow-md">Technology consulting provides<br/>a total end to end solution"</p>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden font-inter">
      <div className="max-w-[78rem] mx-auto px-6 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-8 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="relative z-10 lg:pr-8"
        >
          <h2 className="text-[#58A05B] text-3xl sm:text-4xl lg:text-[2.8rem] font-bold mb-1 tracking-tight">Welcome to</h2>
          <h2 className="text-[#3975A0] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold mb-6 leading-[1.15] tracking-tight">Fayme Engineering</h2>
          
          <p className="text-gray-700 leading-relaxed md:leading-[2] mb-8 text-sm sm:text-[15px] font-medium text-justify sm:text-left">
            <strong className="text-gray-900 font-bold">Fayme Engineering Pvt. Ltd.</strong> is specialized in Life care segment like <strong className="text-gray-900 font-bold">Purified water generation systems</strong> for pharmaceutical manufacturing units and hospitals for operation of high-end medical devices. Fayme Engineering provides customized solutions for water purification, storage and distribution system. Fayme ranges its products for fulfilling requirements of water for industrial use, drinking water and ultra-pure water for sensitive industries like semiconductor, electronics etc.
          </p>
          <button className="bg-[#58A05B] hover:bg-[#4a8a4e] text-white px-8 py-3 rounded text-sm font-semibold shadow-sm transition-all mt-2">
            Read More...
          </button>
        </motion.div>

        {/* Visual Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, type: "spring" }} 
          viewport={{ once: true }}
          className="relative h-[450px] lg:h-[550px] flex items-center justify-center w-full mt-10 lg:mt-0"
        >
          {/* Decorative Dotted Grid (Top Right) */}
          <div className="absolute right-4 lg:-right-8 top-12 lg:top-16 w-32 lg:w-48 h-32 lg:h-48 bg-[radial-gradient(#a1a1aa_2.5px,transparent_2.5px)] [background-size:18px_18px] opacity-40 z-0"></div>
          
          {/* Solid Green accent on the right edge */}
          <div className="absolute -right-6 lg:-right-12 top-1/2 w-16 lg:w-20 h-32 lg:h-40 bg-[#66B050] rounded-l-3xl z-0 transform -translate-y-1/2"></div>

          {/* Large Circle (Main Image) */}
          <div className="absolute right-4 lg:right-12 top-0 lg:top-4 w-[300px] h-[300px] lg:w-[460px] lg:h-[460px] rounded-full overflow-hidden shadow-2xl z-10 bg-white">
             <img src="https://picsum.photos/seed/faymefactory/800/800" className="w-full h-full object-cover" alt="Large Plant Aerial" />
          </div>

          {/* Small Circle (Overlapping Image) */}
          <div className="absolute left-0 bottom-0 lg:bottom-8 w-[200px] h-[200px] lg:w-[280px] lg:h-[280px] rounded-full overflow-hidden border-[10px] lg:border-[16px] border-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.3)] z-20 bg-white">
             <img src="https://picsum.photos/seed/faymetanks/600/600" className="w-full h-full object-cover" alt="Storage Tanks Interior" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Industries = () => {
  const industries = [
    { name: "Pharmaceuticals", icon: <BriefcaseMedical className="w-8 h-8"/> },
    { name: "Biotechnology", icon: <Dna className="w-8 h-8"/> },
    { name: "Food & Beverage", icon: <UtensilsCrossed className="w-8 h-8"/> },
    { name: "Chemicals", icon: <FlaskConical className="w-8 h-8"/> },
    { name: "Healthcare", icon: <Stethoscope className="w-8 h-8"/> },
  ];

  return (
    <section id="industries" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <p className="text-[#1A6FB0] text-sm uppercase tracking-wider font-semibold mb-2">Industries We Serve</p>
          <h2 className="text-4xl text-gray-900 font-syne font-medium pb-4">Serving Critical Sectors Including</h2>
        </motion.div>
      </div>
      
      {/* Marquee effect wrapper */}
      <div className="relative flex w-full overflow-hidden py-4 group">
         <motion.div 
            className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24 min-w-max"
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
         >
            {[...industries, ...industries, ...industries, ...industries].map((ind, i) => (
               <div key={i} className="flex flex-col items-center flex-1 w-32 group/ind">
                 <div className="w-20 h-20 rounded-full bg-[#4CAF50] flex items-center justify-center text-white mb-4 shadow-lg group-hover/ind:scale-110 group-hover/ind:-translate-y-2 transition-transform duration-500 cursor-pointer lg:w-24 lg:h-24">
                   {React.cloneElement(ind.icon, { className: 'w-8 h-8 lg:w-10 lg:h-10' })}
                 </div>
                 <p className="text-gray-800 font-medium text-center whitespace-nowrap text-sm lg:text-base">{ind.name}</p>
               </div>
            ))}
         </motion.div>
         {/* Gradients to fade edges */}
         <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
         <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

const Reliability = () => {
  const pointsLeft = [
    { title: "Over a decade of engineering expertise" },
    { title: "Custom-engineered solutions" },
    { title: "Complete project lifecycle support" }
  ];
  
  const pointsRight = [
    { title: "GMP-compliant, pharma-grade systems" },
    { title: "Global certifications and audits support" },
    { title: "Uncompromising Quality and Performance Across Industries" }
  ];

  return (
    <section id="why-us" className="py-24 bg-gradient-to-b from-[#0b1320] to-[#040810] text-white overflow-hidden relative font-inter">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] opacity-60 z-0 pointer-events-none"></div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#1A6FB0] rounded-full blur-[180px] z-0 opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-16">
          <p className="text-[#5DB065] text-sm uppercase tracking-[0.25em] font-bold mb-4 font-syncopate">Why Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Reliability That Flows Through Our Systems</h2>
        </motion.div>
        
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-16 items-center mt-12 max-w-[85rem] mx-auto">
          
          {/* Left Column - 3 Points */}
          <div className="flex flex-col gap-10 lg:gap-14 relative z-20 w-full items-center lg:items-end order-2 lg:order-1">
             {pointsLeft.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ x: -80, opacity: 0 }} 
                   whileInView={{ x: 0, opacity: 1 }} 
                   transition={{ duration: 0.7, delay: i * 0.15, type: 'spring', bounce: 0.3 }} 
                   viewport={{ once: true, amount: 0.8 }}
                   className="flex items-center justify-start lg:justify-end gap-5 group w-full lg:max-w-[340px]"
                >
                   <p className="font-semibold text-base sm:text-lg text-gray-200 leading-snug text-left lg:text-right group-hover:text-white transition-colors flex-1 drop-shadow-sm">{p.title}</p>
                   <div className="w-[3.5rem] h-[3.5rem] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A6FB0]/30 transition-colors order-first lg:order-last border border-white/10 shadow-lg">
                     <ShieldCheck className="w-6 h-6 text-[#5DB065] group-hover:scale-110 transition-transform shadow-red-200" strokeWidth={2.5} />
                   </div>
                </motion.div>
             ))}
          </div>

          {/* Center Column - Circular Image */}
          <motion.div 
             initial={{ scale: 0.7, opacity: 0, y: 30 }} 
             whileInView={{ scale: 1, opacity: 1, y: 0 }} 
             transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }} 
             viewport={{ once: true, amount: 0.4 }} 
             className="relative z-10 rounded-full overflow-hidden shadow-[0_0_80px_rgba(26,111,176,0.25)] border-4 border-white/10 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] mx-auto order-1 lg:order-2 group"
          >
             <img src="https://picsum.photos/seed/faymereliability/800/800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" alt="Reliability Check" />
             <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.6)] pointer-events-none"></div>
          </motion.div>

          {/* Right Column - 3 Points */}
          <div className="flex flex-col gap-10 lg:gap-14 relative z-20 w-full items-center lg:items-start order-3">
             {pointsRight.map((p, i) => (
                <motion.div 
                   key={i} 
                   initial={{ x: 80, opacity: 0 }} 
                   whileInView={{ x: 0, opacity: 1 }} 
                   transition={{ duration: 0.7, delay: i * 0.15 + 0.3, type: 'spring', bounce: 0.3 }} 
                   viewport={{ once: true, amount: 0.8 }}
                   className="flex items-center justify-start gap-5 group w-full lg:max-w-[340px]"
                >
                   <div className="w-[3.5rem] h-[3.5rem] rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A6FB0]/30 transition-colors border border-white/10 shadow-lg">
                     <ShieldCheck className="w-6 h-6 text-[#5DB065] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                   </div>
                   <p className="font-semibold text-base sm:text-lg text-gray-200 leading-snug text-left group-hover:text-white transition-colors flex-1 drop-shadow-sm">{p.title}</p>
                </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductsGallery = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProduct]);

  return (
    <section id="products" className="py-24 bg-gray-50 border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-[#1A6FB0] text-sm uppercase tracking-wider font-semibold mb-4">Our Products</p>
            <h2 className="text-4xl text-gray-900 font-light mb-4">Pharmaceutical Process Equipment Solutions</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Explore our diverse range of high-quality engineered solutions tailored to meet the rigorous demands of the pharmaceutical industry.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 4) * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 border border-gray-100/50 flex flex-col group cursor-pointer"
              onClick={() => setSelectedProduct(p)}
            >
              <div className="w-full h-64 bg-[#f4f5f8] overflow-hidden relative shrink-0">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-[#f4f5f8]">
                  <span className="text-[#64748b] font-medium text-[15px] tracking-wide relative z-10 w-full text-center">Product Image</span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1 relative bg-white">
                <div className="text-[2.5rem] font-light text-[#2ECC71] mb-4 font-syne leading-none tracking-tight">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="text-[1.35rem] font-bold text-[#1A6FB0] mb-4 leading-tight font-syne">{p.title}</h3>
                <p className="text-gray-500 text-[15px] line-clamp-3 mb-8 flex-1 leading-relaxed font-inter">
                  {p.description}
                </p>
                
                <button 
                  className="mt-auto flex items-center gap-2 text-[#2ECC71] font-bold text-sm tracking-wider uppercase group-hover:translate-x-1 transition-transform w-fit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(p);
                  }}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-[#030b26]/70 backdrop-blur-sm pointer-events-auto"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row relative z-10 pointer-events-auto"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 hover:text-red-500 transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-auto bg-gray-100 relative shrink-0">
                <img 
                  src={selectedProduct.img}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center bg-gray-100">
                  <ImagePlaceholder text="Product Image" className="w-full h-full bg-transparent border-none" />
                </div>
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-1 overflow-y-auto">
                <div className="text-6xl font-light text-[#2ECC71]/20 mb-2 font-syne leading-none absolute top-8 right-8 pointer-events-none select-none">
                  {(products.findIndex(p => p.title === selectedProduct.title) + 1).toString().padStart(2, '0')}
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-bold text-[#1A6FB0] mb-6 pr-16 font-syne leading-tight">
                  {selectedProduct.title}
                </h3>
                
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-600 leading-relaxed text-base mb-8">
                    {selectedProduct.description}
                  </p>
                  
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-[#2ECC71]" /> Technical Highlights
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1A6FB0] mt-1.5 shrink-0" />
                        Built to rigorous GMP, ASME BPE, and FDA standards.
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1A6FB0] mt-1.5 shrink-0" />
                        Premium SS316L construction with hygienic, electro-polished finishes.
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1A6FB0] mt-1.5 shrink-0" />
                        Seamless integration with existing facility automation protocols.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-auto flex gap-4 pt-4 border-t border-gray-100">
                  <a href="#contact" onClick={() => setSelectedProduct(null)} className="px-8 py-3 bg-[#1A6FB0] text-white font-bold rounded-full hover:bg-[#155a8f] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 group">
                    Request Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

const GlobalReach = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Keep parallax motion but constrained smoothly
  const mapY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Dots for the world map
  const mapLocations = [
    { top: '26%', left: '22%', country: 'United States' },
    { top: '55%', left: '46%', country: 'Liberia' },
    { top: '68%', left: '55%', country: 'Zambia' },
    { top: '42%', left: '68%', country: 'India' },
    { top: '58%', left: '85%', country: 'Papua New Guinea' }
  ];

  return (
    <section ref={ref} className="pt-16 md:pt-24 bg-white border-y border-gray-100 overflow-hidden relative">
      {/* Decorative Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <p className="text-[#1A6FB0] text-sm uppercase tracking-wider font-semibold mb-2">Global Reach</p>
          <h2 className="text-4xl md:text-5xl text-gray-900 font-syne font-medium pb-2">Operational Across More Than Ten Countries</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-4 text-sm mt-4">Bringing cutting-edge systems and uncompromising reliability to pharmaceutical facilities worldwide.</p>
        </motion.div>
      </div>
        
      {/* STRICT HEIGHT CONTAINER to physically block the image's invisible whitespace from pushing the page apart */}
      <div className="relative w-full h-[350px] sm:h-[450px] md:h-[600px] max-w-7xl mx-auto overflow-hidden pointer-events-none mt-8 flex items-center justify-center">
        
        {/* Framer motion wrapper moving against the scroll direction */}
        <motion.div 
          style={{ y: mapY, opacity: mapOpacity }}
          className="w-full h-full relative flex items-center justify-center p-4 lg:p-8"
        >
           <div className="relative w-full max-w-5xl mx-auto flex shrink-0 pointer-events-none">
             <img src="/world-map.png" alt="Operational Global Reach Map" className="w-full h-auto object-contain mix-blend-multiply opacity-80 drop-shadow-sm" />
             
             {mapLocations.map((loc, i) => (
                <div key={i} className="absolute group pointer-events-auto" style={{ top: loc.top, left: loc.left }}>
                  {/* Inner dot */}
                  <div className="absolute top-0 left-0 w-[14px] h-[14px] md:w-[16px] md:h-[16px] -translate-x-1/2 -translate-y-1/2 bg-[#30b565] rounded-full"></div>
                  
                  {/* Tooltip Always Visible */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 md:mb-4 w-max px-4 py-2 bg-white text-[#030b26] text-xs md:text-sm font-medium tracking-wide rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 z-20 origin-bottom flex items-center justify-center">
                    {loc.country}
                    {/* Arrow */}
                    <div className="absolute top-[99%] left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white"></div>
                  </div>
                </div>
             ))}
           </div>
        </motion.div>
        
        {/* Aggressive Fade overlays to blend the newly cropped top and bottom seamlessly into the page */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white to-transparent z-20"></div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent z-20"></div>
      </div>
    </section>
  );
};

const Partners = () => {
  const placeholderLogos = ["Aneta", "Yash", "Claroid", "XL Labs", "DAC55", "Vail Chemical", "Corona", "Unison"];
  const doubleLogos = [...placeholderLogos, ...placeholderLogos, ...placeholderLogos];
  
  return (
    <section id="partners" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center mb-16 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-[#1A6FB0] text-sm uppercase tracking-wider font-semibold mb-4">Our Partners</p>
          <h2 className="text-4xl md:text-5xl text-gray-900 mb-6 font-light leading-tight">Building Lasting Client Relationships</h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto">
            Through innovation, reliability, and exceptional service, we strive to be a trusted partner for every stage of their journey.
          </p>
        </motion.div>
      </div>
      
      {/* Infinite scrolling marquee */}
      <div className="w-[150%] md:w-[120%] lg:w-full overflow-hidden flex -mx-10 relative">
        <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <motion.div 
           className="flex gap-6 pr-6 w-max"
           animate={{ x: "-50%" }}
           transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
           {doubleLogos.map((logo, i) => (
             <div 
               key={i} 
               className="w-48 h-24 border border-gray-100/80 rounded-[2rem] flex items-center justify-center grayscale opacity-80 hover:opacity-100 hover:grayscale-0 hover:border-gray-300 transition-all shadow-sm hover:shadow-md bg-white shrink-0 cursor-pointer"
             >
                <span className="font-bold text-gray-400 text-lg hover:text-[#1A6FB0] transition-colors">{logo}</span>
             </div>
           ))}
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100 text-center">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <p className="text-[#1A6FB0] text-sm uppercase tracking-wider font-semibold mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-12 font-light">Client Feedback & Success Stories</h2>
        </motion.div>
        
        <div className="bg-white rounded-3xl pt-12 pb-8 px-6 md:px-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100 relative max-w-2xl mx-auto mt-12">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="absolute -top-10 left-1/2 -translate-x-1/2 flex justify-center">
             <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-white shadow-lg bg-gray-300 relative">
               <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80" alt="Client Testimonial" className="w-full h-full object-cover" />
             </div>
          </motion.div>
          
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="text-gray-600 text-base md:text-lg leading-relaxed mt-4 mb-6 italic text-center font-inter">
            "The team has been fantastic to work with. Their expertise and attention to detail have truly made a difference in our operations. We've seen significant growth in efficiency and customer satisfaction. Highly recommended!"
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="text-center">
            <Quote className="w-6 h-6 text-[#4CAF50] mx-auto mb-3" />
            <h4 className="text-lg text-gray-900 font-medium tracking-tight">Ravi Sharma</h4>
            <p className="text-gray-500 text-xs mt-0.5 uppercase tracking-wider font-semibold">CEO, MedInnovations</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-200 pt-16">
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
           <LogoPlaceholder className="mb-6 -ml-2" />
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="flex flex-col gap-3">
          <h4 className="font-bold text-gray-900 mb-2">Quick Links</h4>
          {['Home', 'About Us', 'Products', 'Services', 'Industries', 'Blogs', 'Contact Us'].map(l => (
             <a href="#" key={l} className="text-sm text-gray-500 hover:text-[#4CAF50] transition-colors">{l}</a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="flex flex-col gap-3">
          <h4 className="font-bold text-gray-900 mb-2">Products</h4>
          {['Purified Water Generation System', 'RO Water System', 'Ultrapure Water Purification System', 'Assembly Unit for Water Treatment', 'Mixing Vessel', 'Clean Room Utility Pendant', 'WFI Storage and Distribution'].map(l => (
             <a href="#" key={l} className="text-sm text-gray-500 hover:text-[#4CAF50] transition-colors truncate">{l}</a>
          ))}
          <a href="#" className="font-bold text-gray-900 text-sm mt-2 flex items-center gap-1 hover:text-[#4CAF50] group">Explore All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="flex flex-col gap-3">
          <h4 className="font-bold text-gray-900 mb-2">Contact Us</h4>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Sales:</p>
            <p className="text-gray-900 text-sm font-medium hover:text-[#4CAF50] cursor-pointer transition-colors">sales@faymeengineering.com</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Support:</p>
            <p className="text-gray-900 text-sm font-medium hover:text-[#4CAF50] cursor-pointer transition-colors">support@faymeengineering.com</p>
          </div>
          <div className="mt-2">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone no:</p>
            <p className="text-gray-900 text-sm font-medium">+91 9727411134<br/>+91 9898886853</p>
          </div>
        </motion.div>
      </div>
      
      <div className="border-t border-gray-100 py-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-4">
             <span className="font-bold text-gray-900">Social Links</span>
             <div className="flex gap-2">
                {['f', 'x', 'in'].map(icon => (
                  <div key={icon} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#1A6FB0] hover:bg-[#1A6FB0] hover:text-white transition-all cursor-pointer shadow-sm">{icon}</div>
                ))}
             </div>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0 font-medium">
             <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-gray-900 transition-colors">Terms & Condition</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Section observer hook
const useActiveSection = (sectionIds) => {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Use exactly middle of the screen for reliable intersection
      const scrollPosition = window.scrollY + (window.innerHeight / 3);
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveId(id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeId;
};

function App() {
  const activeSection = useActiveSection(['home', 'about', 'industries', 'products', 'why-us', 'partners']);

  return (
    <div className="relative min-h-screen bg-white selection:bg-[#2ECC71]/20 selection:text-[#030b26]">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Industries />
        <Reliability />
        <ProductsGallery />
        <GlobalReach />
        <Partners />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
