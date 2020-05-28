export interface ItemInterface {
    link: string;
    image: string;
    rootPath: string;
    selectableProperty: any;
}

export interface ItemStateInterface {
    item: ItemInterface;
}

export interface  RootPropsInterface {
    root: string;
    prop1: string;
    prop2: string;
    prop3: string;
}