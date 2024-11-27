  const { scrollYProgress } = useScroll();
  const containerVariants = {
    collapsed: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    expanded: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  // 자식 div variants
  const divVariants = {
    collapsed: { width: "2px", opacity: 0.5 },
    expanded: { width: "480px", opacity: 1 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex gap-4 w-[1440px] mx-auto"
      initial="collapsed"
      animate="expanded"
      variants={containerVariants}
    >
      {ABOUT_CONTENT.map((item) => (
        <motion.div
          key={item.key}
          className="h-[480px] border-white border-l-1 shadow-md p-4 flex flex-col justify-end"
          variants={divVariants}
          whileInView="expanded" // 뷰포트에 들어올 때 실행
          initial="collapsed"
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-4"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 0.5, // divVariants가 완료된 후 실행되도록 지연 시간 설정
              duration: 0.3,
            }}
          >
            <Text className="text-white text-xl font-bold">{item.title}</Text>
          </motion.div>
          <motion.div
            className="mb-2"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 0.7, // 텍스트가 순차적으로 나타나도록 지연 시간 설정
              duration: 0.3,
            }}
          >
            <Text className="text-white text-md">{item.key}</Text>
          </motion.div>
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delay: 0.9, // 마지막 텍스트 지연 시간
              duration: 0.3,
            }}
          >
            <Text className="text-white text-sm">{item.content}</Text>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};
