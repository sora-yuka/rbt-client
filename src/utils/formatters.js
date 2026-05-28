export const formatDate = (value) => {
  if (!value) return "Recently";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

export const getCategoryName = (offer) =>
  offer?.category?.category || "other";

const categoryImages = {
  electronics:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  clothings:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
  books:
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
  other:
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80",
};

export const getOfferImage = (offer) => {
  const mediaFile = offer?.media?.[0]?.file;
  if (mediaFile) return mediaFile;

  return categoryImages[getCategoryName(offer)] || categoryImages.other;
};

export const normalizeList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.value)) return data.value;
  return [];
};
