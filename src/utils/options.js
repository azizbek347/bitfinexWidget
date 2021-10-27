class Options {
    constructor({ event = 'subscribe', channel = '' } = {}) {
        this.event = event;
        this.channel = channel;
    }
}

class BookOptions extends Options {
    constructor({
        channel = 'book',
        symbol = 'tBTCUSD',
        prec = 'P0',
        len = '25',
        freq = 'F0',
    } = {}) {
        super({ channel });
        this._symbol = symbol;
        this._prec = prec;
        this._len = len;
        this._freq = freq;
    }
    set len(val) {
        this._len = val;
    }
    set symbol(val) {
        this._symbol = val;
    }
    set freq(val) {
        this._freq = val;
    }
    set prec(val) {
        this._prec = val;
    }
}

class TickerOptions extends Options {
    constructor({ channel = 'ticker', symbol = 'tBTCUSD' } = {}) {
        super({ channel });
        this._symbol = symbol;
    }
    set symbol(val) {
        this._symbol = val;
    }
}

export const toJSON = (obj) => JSON.stringify(Object.entries({ ...obj }).reduce((acc, [key, value]) => {
    if (key.startsWith('_')) acc[key.slice(1)] = value;
    else acc[key] = value;
    return acc;
}, {}));


export const tickerOptions = new TickerOptions();
export const bookOptions = new BookOptions();