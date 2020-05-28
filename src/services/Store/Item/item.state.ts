import { ItemStateInterface } from "@/services/Store/Item/item.types";

export function itemState () : ItemStateInterface {
    return {
        item: {
            link: '',
            image: '',
            rootPath: '',
            selectableProperty: ''
        },
        images: []
    }
}