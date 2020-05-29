import { link } from "@/global";

export interface ItemInterface {
    link: string;
    image: string;
    rootPath: string;
    selectableProperty: any;
}

export interface ItemStateInterface {
    data?: ItemInterface;
    images: Array<link>;
}

export interface  RoutePropsInterface {
    root: string;
    prop1: string;
    prop2: string;
    prop3: string;
}