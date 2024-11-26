interface GradientBoxProps {
    children: React.ReactNode;
  }
  export const GradientBox: React.FC<GradientBoxProps> = ({ children }) => {
    return (
      <div className="bg-primary-assistive p-0.5">
        <div className="bg-white pt-[22px] pb-[23px]">
          {children}
        </div>
      </div>
    );
  };