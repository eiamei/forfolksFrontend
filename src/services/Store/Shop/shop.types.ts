export interface ItemInterface {
    link: string;
    image: string;
    rootPath: string;
    selectableProperty: any;
    group: string;
}

export interface ItemInterface {
    link: string;
    image: string;
    rootPath: string;
    selectableProperty: any;
}

export interface ShopInterface {
    groups: Object,
    products: Array<ItemInterface>,
    items: Array<ItemInterface>
    itemsByGroup: Object
}