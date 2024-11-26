"use client";

interface RepresentativeCardProps {
  representative: any;
}

export const RepresentativeCard: React.FC<RepresentativeCardProps> = ({
  representative,
}) => {
  return (
    <div className="max-w-[1240px] w-full h-[780px] bg-slate-600">
      기관별 대표자 카드 컴포넌트 {representative?.university}
    </div>
  );
};
