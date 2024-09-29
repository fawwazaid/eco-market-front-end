// hooks/useImageStore.ts
import create from "zustand";

interface ImageStore {
  images: string[];
  addImage: (url: string) => void;
  removeImage: (url: string) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  addImage: (url) => set((state) => ({ images: [...state.images, url] })),
  removeImage: (url) =>
    set((state) => ({
      images: state.images.filter((image) => image !== url),
    })),
}));
