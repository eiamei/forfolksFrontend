export interface ItemInterface {
    rootPath: string;
    group: string;
    name: string;
    type: string;
    category: Array<string>;
    desc: string;
    metaDesc: string;
    shortDesc: string;
    itemProperty: Object;
    price: string;
    link: string;
    image: string;
    selectableProperty: any;
    badges: string;
    availability: number;
}

export interface ShopInterface {
    groups: Object,
    products: Object,
    items: Array<ItemInterface>
    itemsByGroup: Object
}