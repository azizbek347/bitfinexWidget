export class Book {
    constructor() {
        this.bids = {};
        this.asks = {};
        this.psnap = [];
        this.empty = true;
    }
    wipe() {
        this.bids = {};
        this.asks = {};
        this.psnap = [];
        this.empty = true;
    }
}

export default Book;