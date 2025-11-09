export interface IStore {
  id: string;
  title: string;
  description: string;
}

export type IStoreCreate = Pick<IStore, "title">;

export type IStoreUpdate = Omit<IStore, "id">;
