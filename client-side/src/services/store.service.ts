import { axiosClassic, axiosWithAuth } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import { IColorInput } from "@/shared/types/color.interface";
import { IStore, IStoreCreate } from "@/shared/types/store.interface";

class StoreService {
  async getById(id: string) {
    const { data } = await axiosClassic<IStore>({
      url: API_URL.stores(`/by-id/${id}`),
      method: "GET",
    });
    return data;
  }

  async create(data: IStoreCreate) {
    const { data: createdStore } = await axiosWithAuth<IStore>({
      url: API_URL.stores(""),
      method: "POST",
      data,
    });
    return createdStore;
  }

  async update(id: string, data: IColorInput) {
    const { data: updatedStore } = await axiosWithAuth<IStore>({
      url: API_URL.stores(`/${id}`),
      method: "PUT",
      data,
    });
    return updatedStore;
  }

  async delete(id: string) {
    const { data: deletedStore } = await axiosWithAuth<IStore>({
      url: API_URL.stores(`/${id}`),
      method: "DELETE",
    });
    return deletedStore;
  }
}

export const storeService = new StoreService();
