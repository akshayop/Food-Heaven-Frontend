export const btnClick = {
  whileTap: {
      scale:  0.9
  }
};


export const fadeAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: {scale: 0, opacity: 0},
  transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
  }
}

export const landingPage = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: {
    // delay: 0.1,
    duration: 0.5,
  }
}

export const scaleImage = {
  whileHover: {
    scale: 1.2
  }
} 

