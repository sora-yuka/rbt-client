const STORAGE_KEY = "own_offer_ids";

export const ownOffersService = {
  getIds: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  },

  addId: (id) => {
    if (!id) return;
    const ids = ownOffersService.getIds();
    const nextIds = Array.from(new Set([...ids, Number(id)]));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds));
  },

  removeId: (id) => {
    const nextIds = ownOffersService
      .getIds()
      .filter((offerId) => offerId !== Number(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds));
  },
};
