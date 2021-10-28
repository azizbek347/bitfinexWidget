export const formatNumber = ({ number = 0, precision = 2, cut = false }) => {
    let numberRes = new Intl.NumberFormat('en-US', {}).format(number.toFixed(precision));
    if (cut && number > 100) {
        numberRes = numberRes.slice(0, 5);
        numberRes = numberRes.replace(',', '.');
        numberRes += 'K';
    }
    return numberRes;
}

export const numberWithCommas = (x, precision = 2) => x.toFixed(precision).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

export default formatNumber;