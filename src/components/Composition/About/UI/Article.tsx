import { Text } from "@/components/UI/Text/Text";
import { CustomImage } from "@/components/Utilities/Asset/CustomImage";

export const AboutArticle: React.FC = () => {
  return (
    <div>
      <Text
        variant="h2"
        className="text-white text-center !text-[50px] !font-bold !font-['SUIT'] !leading-[65px] mb-11"
      >
        복잡한 문제 해결의 열쇠, 미래를 여는 혁신의 중심
      </Text>
      <div className="content flex flex-wrap">
        <div className="graph bg-[#131313] basis-1/2 pt-7 flex flex-col justify-end items-end pr-[52px] pb-[65px]">
          <div className="w-fit">
            <Text className="text-white !text-2xl !font-bold !font-['SUIT'] !leading-[31.20px] w-full mb-11">
              High Performance
              <br /> Linpack(HPL) Benchmark
            </Text>
            <div className="relative w-[678px] h-[436px]">
              <CustomImage
                src="images/article/graph.png"
                alt="그래프 이미지"
                fill
              />
            </div>
          </div>
        </div>
        <div className="description basis-1/2 md:pl-[74px] md:pr-[83px]  pt-9">
          <div className="w-[803px] flex flex-col gap-[62px]">
            <Text
              variant="b2"
              className="text-white !text-[32px] !font-light !font-['SUIT'] !leading-[48px]"
            >
              엑사급 초고성능컴퓨터는 과학, 기술, 산업 전반에서 혁신적인
              해결책을 제시하며, 에너지, 의학, 기후 변화, 인공지능 등 다양한
              분야에서 새로운 가능성을 열어갑니다.
            </Text>
            <Text
              variant="b2"
              className="text-white !text-[32px] !font-light !font-['SUIT'] !leading-[48px]"
            >
              엑사급 초고성능컴퓨터는 초당 10의 18제곱(1엑사플롭스) 이상의
              연산을 수행할 수 있는 차세대 고성능컴퓨터로, 전통적인 계산 과학
              응용의 복잡도와 데이터 요구량, 그리고 적용 범위의 지속적인 증가에
              대응하기 위해 설계되었습니다.
            </Text>
          </div>
        </div>
        <div className="description basis-1/2 flex flex-col items-end">
          <Text className="text-white !text-[32px] !font-light !font-['SUIT'] !leading-[48px] max-w-[597px] md:pr-[71px] pt-[89px]">
            또한, 인공지능(AI) 및 데이터 중심 응용으로 고성능컴퓨팅(HPC) 영역이
            확장됨에 따라, 이를 뒷받침하는 핵심 기술로 주목받고 있습니다.
          </Text>
        </div>
        <div className="circle-graph basis-1/2 bg-[#131313]  flex flex-col pl-[78px] py-[70px]">
          <div className="w-fit">
            <Text className="text-white !text-2xl !font-bold !font-['SUIT'] !leading-[31.20px] mb-[50px]">
              Global High Performance
              <br /> Computing Market
            </Text>
            <div className="relative w-[558px] h-[330px]">
              <CustomImage
                src="images/article/circle_graph.png"
                alt="원형 그래프 이미지"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
