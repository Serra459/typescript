import Buyable from "./Buyable";

export default class Movie implements Buyable {
    constructor(
        public id: number,
        public price: number,
        public name: string,
        public title: string,
        public year: number,
        public country: string,
        public slogan: string,
        public genre: string,
        public duration: number,
    ) {}

}
