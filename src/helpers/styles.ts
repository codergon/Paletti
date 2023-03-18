type numStr = number | string;

const padding = (a: numStr, b?: numStr, c?: numStr, d?: numStr) => ({
  paddingTop: a,
  paddingRight: b ?? a,
  paddingBottom: c ?? a,
  paddingLeft: d ?? b ?? a,
});

const edges = (a: number, b?: number, c?: number, d?: number) => ({
  borderTopLeftRadius: a,

  borderTopRightRadius: c ?? a,

  borderBottomRightRadius: b ?? a,

  borderBottomLeftRadius: d ?? b ?? a,
});

export {padding, edges};
