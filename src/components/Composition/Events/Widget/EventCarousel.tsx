// "use client";

// import { Button, useDisclosure } from "@nextui-org/react";
// import { Text } from "@/components/UI/Text/Text";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
// import { EventModal } from "@/components/Widget/Modal/EventModal/EventModal";
// import { Post } from "@/hooks/usePosts";
// import { motion } from "framer-motion";
// import { useIsMobile } from "@/hooks/useWindowSize";

// interface EventCarouselProps {
//   posts?: Post[];
// }

// export const EventCarousel: React.FC<EventCarouselProps> = ({ posts }) => {
//   const [selectedPost, setSelectedPost] = useState<Post>();
//   const isMobile = useIsMobile();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const eventModal = useDisclosure();

//   const scrollPrev = useCallback(() => {
//     if (containerRef.current) {
//       const slides = containerRef.current.querySelectorAll(
//         ".event-slide",
//       ) as NodeListOf<HTMLElement>;
//       const currentScrollLeft = containerRef.current.scrollLeft;
//       let targetScrollLeft = 0;

//       for (let i = slides.length - 1; i >= 0; i--) {
//         const slideLeft = slides[i].offsetLeft;
//         if (slideLeft < currentScrollLeft) {
//           targetScrollLeft = slideLeft;
//           break;
//         }
//       }

//       containerRef.current.scrollTo({
//         left: targetScrollLeft,
//         behavior: "smooth",
//       });
//     }
//   }, []);

//   const scrollNext = useCallback(() => {
//     if (containerRef.current) {
//       const slides = containerRef.current.querySelectorAll(
//         ".event-slide",
//       ) as NodeListOf<HTMLElement>;
//       const currentScrollLeft = containerRef.current.scrollLeft;
//       let targetScrollLeft = 0;

//       for (const slide of slides) {
//         const slideLeft = slide.offsetLeft;
//         if (slideLeft > currentScrollLeft) {
//           targetScrollLeft = slideLeft;
//           break;
//         }
//       }

//       containerRef.current.scrollTo({
//         left: targetScrollLeft,
//         behavior: "smooth",
//       });
//     }
//   }, []);

//   const openDetailModal = (post: Post) => {
//     setSelectedPost(post);
//     eventModal.onOpen();
//   };

//   // 스크롤 위치 감지
//   useEffect(() => {
//     const handleScroll = (entries: IntersectionObserverEntry[]) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const index = Number(entry.target.getAttribute("data-index"));
//           setActiveIndex(index);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(handleScroll, {
//       threshold: 0.6,
//       root: null,
//     });

//     const slides = document.querySelectorAll(".event-slide");
//     slides.forEach((slide) => observer.observe(slide));

//     return () => {
//       slides.forEach((slide) => observer.unobserve(slide));
//     };
//   }, [posts]);

//   return (
//     <div className="w-[90%] mx-auto relative">
//       <div
//         ref={containerRef}
//         className={`
//           overflow-x-auto snap-x snap-mandatory scrollbar-hide mx-auto
//           ${
//             isMobile
//               ? "max-md:w-screen max-md:-mx-4 max-md:px-4 max-h-[500px]"
//               : "h-[720px] w-[1194px] hover:w-[1440px] transition-[width] duration-300"
//           }
//         `}
//       >
//         <div
//           className={`
//           flex h-full w-full
//           ${isMobile ? "items-end" : ""}
//         `}
//         >
//           {posts?.map((post, index) => (
//             <motion.div
//               key={index}
//               data-index={index}
//               className={`
//                 event-slide relative cursor-pointer flex-shrink-0 mr-4 snap-center
//                 ${isMobile ? "h-[500px] w-[90%] min-w-[274px]" : "h-full"}
//               `}
//               initial={isMobile ? undefined : { width: "226px" }}
//               whileHover={isMobile ? undefined : { width: "470px" }}
//               style={{
//                 backgroundImage: `url(${post.thumbnail})`,
//                 backgroundPosition: "center",
//                 backgroundSize: "cover",
//               }}
//             >
//               {(isMobile && activeIndex === index) || !isMobile ? (
//                 <OverlayContent
//                   post={post}
//                   openDetailModal={openDetailModal}
//                   isMobile={isMobile}
//                 />
//               ) : null}
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {posts && posts.length > 1 && (
//         <div
//           className={
//             isMobile
//               ? "flex justify-center mt-4 gap-4"
//               : "absolute top-1/2 -translate-y-1/2 w-full"
//           }
//         >
//           <Button
//             className={`
//               bg-transparent
//               ${
//                 isMobile
//                   ? "w-5 h-5"
//                   : "w-10 h-10 absolute left-0 max-lg:-left-12"
//               }
//             `}
//             isIconOnly
//             onClick={scrollPrev}
//           >
//             <CustomImage src="images/icons/left.svg" alt="left" />
//           </Button>
//           <Button
//             className={`
//               bg-transparent
//               ${
//                 isMobile
//                   ? "w-5 h-5"
//                   : "w-10 h-10 absolute right-0 max-lg:-right-12"
//               }
//             `}
//             isIconOnly
//             onClick={scrollNext}
//           >
//             <CustomImage src="images/icons/right.svg" alt="right" />
//           </Button>
//         </div>
//       )}
//       {selectedPost && (
//         <EventModal
//           isOpen={eventModal.isOpen}
//           onClose={eventModal.onClose}
//           post={selectedPost}
//         />
//       )}
//     </div>
//   );
// };

// interface OverlayContentProps {
//   post: Post;
//   openDetailModal: (post: Post) => void;
//   isMobile: boolean;
// }

// const OverlayContent: React.FC<OverlayContentProps> = ({
//   post,
//   openDetailModal,
//   isMobile,
// }) => {
//   return (
//     <>
//       <motion.div
//         className="absolute inset-0"
//         initial={!isMobile ? { opacity: 0 } : undefined}
//         whileHover={!isMobile ? { opacity: 0.8 } : undefined}
//         animate={isMobile ? { opacity: 0.8 } : undefined}
//         style={{
//           background:
//             "linear-gradient(180deg, rgba(101, 65, 242, 0.57) 0%, rgba(13, 0, 181, 0.57) 100%)",
//         }}
//       />
//       <motion.div
//         className={`
//           absolute inset-0 z-[80] flex flex-col cursor-pointer text-white
//           ${isMobile ? "px-5 pt-[50px] pb-5" : "px-[37px] pt-[50px] pb-5"}
//         `}
//         onClick={() => openDetailModal(post)}
//         initial={{ opacity: 0 }}
//         whileHover={!isMobile ? { opacity: 1 } : undefined}
//         animate={isMobile ? { opacity: 1 } : undefined}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="flex-1">
//           <Text
//             variant="h2"
//             className={`break-all ${isMobile ? "text-2xl" : ""}`}
//           >
//             {post.title}
//           </Text>
//           <Text
//             variant="h4"
//             className={`mt-2 font-medium ${isMobile ? "text-lg" : ""}`}
//           >
//             {post.date}
//           </Text>
//         </div>
//         <div className="flex items-center mt-auto gap-2 flex-wrap">
//           {post.tags?.map((tag, idx) => (
//             <Tag key={idx}>{tag}</Tag>
//           ))}
//         </div>
//       </motion.div>
//     </>
//   );
// };

// interface TagProps {
//   children: React.ReactNode;
// }

// const Tag: React.FC<TagProps> = ({ children }) => {
//   return (
//     <div className="bg-tag-primary text-white text-xl max-lg:text-base px-3 py-0.5 rounded-none">
//       {children}
//     </div>
//   );
// };
