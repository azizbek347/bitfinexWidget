import { bookOptions, tickerOptions, toJSON } from './options';
import { Book } from './book';

const url = 'wss://api.bitfinex.com/ws/2';
const channels = {};
let book = new Book();
let socket = null;

export const dataHandlerWrapper = (dataHandler = {}) => (data) => {
    if (data?.event === 'subscribed') channels[data.channel] = data.chanId;
    if (data?.event || data?.[1] === 'hb' || data?.[1] === 'cs') return;
    if (data?.[0] === channels['ticker']) dataHandler['ticker'](data[1].slice(4));
    else if (data?.[0] === channels['book']) {
        if (book.empty) {
            data?.[1].forEach((pp) => {
                pp = { price: pp[0], cnt: pp[1], amount: pp[2] };
                const side = pp.amount > 0 ? 'bids' : 'asks';
                pp.amount = Math.abs(pp.amount);
                book[side][pp.price] = pp;
            });
        } else {
            data = data[1];
            let pp = { price: data[0], cnt: data[1], amount: data[2] };
            if (!pp.cnt) {
                if (pp.amount === 1 && book['bids'][pp.price]) delete book['bids'][pp.price];
                else if (pp.amount === -1 && book['asks'][pp.price]) delete book['asks'][pp.price];
            } else {
                let side = pp.amount > 0 ? 'bids' : 'asks';
                pp.amount = Math.abs(pp.amount);
                book[side][pp.price] = pp;
            }
        }
        ['bids', 'asks'].forEach((side) => {
            const prices = Object.keys(book[side]).sort((a, b) => +a <= +b ? -1 : 1);
            book.psnap[side] = prices;
        });
        book.empty = false;
        dataHandler['book']({ ...book });
    }
}

export const connect = (dataHandler) => (connected) => {
    if (!connected) socket?.close();
    else {
        socket = new WebSocket(url);
        socket.onopen = () => {
            socket.send(toJSON(bookOptions));
            socket.send(toJSON(tickerOptions));
        };
        socket.onclose = (e) => {
            console.log(e)
            book.wipe();
        }
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            dataHandler(data);
        }
        socket.onerror = (e) => {
            console.error(e);
        }
    }
}