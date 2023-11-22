import { createContextId } from "@builder.io/qwik";

export interface CommonStore {
  category: any[];
  // catLoading: boolean;
  //productLoading: boolean;
  //product: any[];
  //Order: any[];
  //orderLoading: boolean;
}

export const CommonContext = createContextId<CommonStore>("CommonStore");
