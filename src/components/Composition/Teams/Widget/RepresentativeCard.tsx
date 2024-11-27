"use client";

interface RepresentativeCardProps {
  representative: any;
}

export const RepresentativeCard: React.FC<RepresentativeCardProps> = ({
  representative,
}) => {
  return (
    <div className="max-w-[1240px] w-full h-[780px] bg-slate-600">
      <div className="agency"></div>
      <div className="tags"></div>
    </div>
  );
};
