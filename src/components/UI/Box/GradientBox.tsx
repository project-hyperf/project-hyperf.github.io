interface GradientBoxProps {
  children: React.ReactNode;
}
export const GradientBox: React.FC<GradientBoxProps> = ({ children }) => {
  return (
    <div className="bg-primary-assistive p-0.5">
      <div className="bg-white pt-[22px] pb-[23px]">{children}</div>
    </div>
  );
};
// =======
//   children: React.ReactNode;
// }
// export const GradientBox: React.FC<GradientBoxProps> = ({ children }) => {
//   return (
//     <div className="w-fit mx-auto max-w-md bg-primary-assistive p-0.5">
//       <div className="bg-white pt-[22px] pb-[23px] pl-[119px] pr-[125px]">
//         {children}
//       </div>
//     </div>
//   );
// };
// >>>>>>> f6b0c24 (Feat: 추진 방법 모달)
