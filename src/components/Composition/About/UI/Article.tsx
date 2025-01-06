import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";
import { useIsMobile } from "@/hooks/useWindowSize";
import { PropsWithChildren, useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const FadeInUpSection: React.FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10% 0px",
  });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export const AboutArticle: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div>
      <FadeInUpSection>
        <Text
          variant="h2"
          className="text-white text-center md:!text-[50px] !font-bold !font-['SUIT'] !leading-[41.2px] md:!leading-[65px] mb-11 !text-[32px] max-[1400px]:px-5"
        >
          복잡한 문제 해결의 열쇠, 미래를 여는 혁신의 중심
        </Text>
      </FadeInUpSection>
      <div className="flex flex-col min-[1400px]:flex-row flex-wrap">
        <div className="w-full min-[1400px]:w-1/2 p-4 md:px-[74px] md:pt-9 max-[1400px]:block hidden">
          <FadeInUpSection>
            <Text
              variant="b2"
              className="text-white text-min-[1400px] md:!text-[32px] font-light font-['SUIT'] leading-relaxed md:!leading-[48px] max-md:!text-[20px] "
            >
              엑사급 초고성능컴퓨터는 과학, 기술, 산업 전반에서 혁신적인
              해결책을 제시하며, 에너지, 의학, 기후 변화, 인공지능 등 다양한
              분야에서 새로운 가능성을 열어갑니다.
            </Text>
          </FadeInUpSection>
        </div>
        <div className="w-full min-[1400px]:w-1/2 bg-[#131313] p-4 md:pt-7 md:pr-[52px] md:pb-[65px] flex flex-col justify-end items-end max-[1400px]:items-center">
          <FadeInUpSection>
            <div className="w-full md:w-fit">
              <Text className="text-white text-xl md:!text-2xl font-bold font-['SUIT'] leading-relaxed mb-6 md:mb-11">
                High Performance
                <br /> Linpack(HPL) Benchmark
              </Text>
              <div className="relative w-full md:w-[678px] aspect-[1.55/1]">
                <CustomImage
                  src="images/article/graph.png"
                  alt="그래프 이미지"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </FadeInUpSection>
        </div>
        <div className="w-full min-[1400px]:w-1/2 p-4 md:px-[74px] md:pt-9">
          <FadeInUpSection>
            <div className="flex flex-col gap-8 md:gap-[62px] max-w-[803px] max-[1400px]:mx-auto ">
              <Text
                variant="b2"
                className="text-white text-min-[1400px] md:!text-[32px] font-light font-['SUIT'] leading-relaxed md:!leading-[48px] min-[1400px]:block hidden "
              >
                엑사급 초고성능컴퓨터는 과학, 기술, 산업 전반에서 혁신적인
                해결책을 제시하며, 에너지, 의학, 기후 변화, 인공지능 등 다양한
                분야에서 새로운 가능성을 열어갑니다.
              </Text>
              <Text
                variant="b2"
                className="text-white text-min-[1400px] md:!text-[32px] font-light font-['SUIT'] leading-relaxed md:!leading-[48px] max-md:!text-[20px]"
              >
                엑사급 초고성능컴퓨터는 초당 10의 18제곱(1엑사플롭스) 이상의
                연산을 수행할 수 있는 차세대 고성능컴퓨터로, 전통적인 계산 과학
                응용의 복잡도와 데이터 요구량, 그리고 적용 범위의 지속적인
                증가에 대응하기 위해 설계되었습니다.
              </Text>
            </div>
          </FadeInUpSection>
        </div>

        <div className="w-full min-[1400px]:w-1/2 flex flex-col items-end p-4 md:pt-[89px]">
          <FadeInUpSection>
            <Text className="text-white text-min-[1400px] md:!text-[32px] font-light font-['SUIT'] leading-relaxed md:!leading-[48px] min-[1400px]:max-w-[597px] min-[1400px]:pr-[71px] max-w-[803px] max-[1400px]:mx-auto max-[1400px]:hidden ">
              또한, 인공지능(AI) 및 데이터 중심 응용으로 고성능컴퓨팅(HPC)
              영역이 확장됨에 따라, 이를 뒷받침하는 핵심 기술로 주목받고
              있습니다.
            </Text>
          </FadeInUpSection>
        </div>

        <div className="w-full min-[1400px]:w-1/2 bg-[#131313] p-4 md:pl-[78px] md:py-[70px]">
          <FadeInUpSection>
            <div className="w-full md:w-fit">
              <Text className="text-white text-xl md:!text-2xl font-bold font-['SUIT'] leading-relaxed mb-6 md:mb-[50px]">
                Global High Performance
                <br /> Computing Market
              </Text>
              <div className="relative w-full md:w-[558px] aspect-[1.69/1]">
                {isMobile ? (
                  <CustomImage
                    src="images/article/mobile_circle_graph.png"
                    alt="원형 그래프 이미지"
                    fill
                    className="object-contain"
                  />
                ) : (
                  <CustomImage
                    src="images/article/circle_graph.png"
                    alt="원형 그래프 이미지"
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            </div>
          </FadeInUpSection>
        </div>
        <div className="w-full min-[1400px]:w-1/2 flex flex-col items-end p-4 md:pt-[89px] mb-10">
          <FadeInUpSection>
            <Text className="text-white text-min-[1400px] md:!text-[32px] font-light font-['SUIT'] leading-relaxed md:!leading-[48px] min-[1400px]:max-w-[597px] min-[1400px]:pr-[71px] max-w-[803px] max-[1400px]:mx-auto min-[1400px]:hidden md:px-[74px] max-md:!text-[20px]">
              또한, 인공지능(AI) 및 데이터 중심 응용으로 고성능컴퓨팅(HPC)
              영역이 확장됨에 따라, 이를 뒷받침하는 핵심 기술로 주목받고
              있습니다.
            </Text>
          </FadeInUpSection>
        </div>
      </div>
    </div>
  );
};
