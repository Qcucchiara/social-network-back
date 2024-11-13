export const setLikeDislike = ["like", "dislike"] as const;
export type SetLikeDislike = (typeof setLikeDislike)[number];
