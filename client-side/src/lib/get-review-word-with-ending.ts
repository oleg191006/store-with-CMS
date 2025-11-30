export const getReviewWordWithEnding = (reviewCount: number) => {
  const lastDigit = reviewCount % 10;
  const lastTwoDigits = reviewCount % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${reviewCount} reviews`;
  }
  switch (lastDigit) {
    case 1:
      return `${reviewCount} review`;
    case 2:
    case 3:
    case 4:
      return `${reviewCount} reviews`;
    default:
      return `${reviewCount} reviews`;
  }
};
