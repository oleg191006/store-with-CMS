import { DollarSign, Package, FolderTree, Star } from "lucide-react";

export const getIcon = (id: number) => {
  switch (id) {
    case 1:
      return DollarSign;
    case 2:
      return Package;
    case 3:
      return FolderTree;
    case 4:
      return Star;
    default:
      return Package;
  }
};
