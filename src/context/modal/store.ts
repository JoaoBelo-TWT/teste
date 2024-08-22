import { create } from 'zustand';

type ModalProps = {
  isModalOpen: boolean;
  form?: string;
};

type ModalState<T = unknown> = {
  modal: ModalProps;
  setModal: (modal: string) => void;
  data: T;
  setData: (data: T) => void;
  destroyModal: () => void;
};

const defaultModalData = {
  isModalOpen: false,
  form: undefined
};

const createStore = <T>(defaultData: T) => create<ModalState<T>>((set: (partial: Partial<ModalState<T>>) => void) => ({
  modal: defaultModalData,
  setModal: (modal: string) => {
    set({
      modal: {
        isModalOpen: true,
        form: modal
      }
    });
  },
  data: defaultData,
  setData: (data: T) => {
    set({ data });
  },
  destroyModal: () => {
    set({
      modal: defaultModalData
    });
  }
}));

type Store<T> = () => ModalState<T>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storeMap: Record<string, Store<any>> = {};

export function useModal<T>(defaultData?: T): ModalState<T> {
  const key = typeof defaultData;
  if (!storeMap[key]) {
    storeMap[key] = createStore(defaultData);
  }

  return storeMap[key]();
}
