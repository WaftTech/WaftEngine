export const normalizeMedia = (media = []) =>
  media.reduce((acc, val) => ({ ...acc, [val._id]: val }), {});
