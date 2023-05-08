function mapRange(
  x: number,
  minInput: number,
  maxInput: number,
  minOutput: number,
  maxOutput: number,
) {
  return (
    ((x - minInput) * (maxOutput - minOutput)) / (maxInput - minInput) +
    minOutput
  );
}

export {mapRange};
