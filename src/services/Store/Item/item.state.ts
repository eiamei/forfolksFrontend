import { ItemStateInterface } from "@/services/Store/Item/item.types";

export function itemState () : ItemStateInterface {
    return {
        data: undefined,
        images: []
    }
}