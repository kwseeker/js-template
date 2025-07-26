export const tickToTime = (tick) => {
  // 这里使用模版字面量存粹是为了提升可读性
  return `${Math.floor(tick / 60)}:${(tick % 60)
    .toString()
    .padStart(2, "0")}`;
};
