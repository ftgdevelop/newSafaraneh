// import React from 'react';
// import SwiperCore, { Navigation, Pagination } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// SwiperCore.use([Navigation, Pagination]);

// type Item = {
//   id: number;
//   image: string;
//   amount: string;
//   title: string;
// };

// type Props = {
//   title: string;
//   items: Item[];
// };

// const CustomSwiper: React.FC<Props> = ({ title, items }) => {
//   return (
//     <div className="custom-swiper-container">
//       <h2 className="text-center text-2xl font-bold mb-6">{title}</h2>
//       <Swiper
//         spaceBetween={30}
//         slidesPerView={3}
//         navigation
//         pagination={{ clickable: true }}
//       >
//         {items.map((item) => (
//           <SwiperSlide key={item.id}>
//             <div className="relative">
//               <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
//               <div className="absolute top-0 left-0 bg-gradient-to-r from-black to-transparent text-white p-2">
//                 {item.amount}
//               </div>
//             </div>
//             <h3 className="text-center mt-4 text-lg font-medium">{item.title}</h3>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default CustomSwiper;