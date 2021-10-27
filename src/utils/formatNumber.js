export const formatNumber = ({ number = 0, precision = 2, cut = false }) => {
    let numberRes = new Intl.NumberFormat('en-US', {}).format(number.toFixed(precision));
    if (cut && number > 100) {
        numberRes = numberRes.slice(0, 5);
        console.log(numberRes);
        numberRes = numberRes.replace(',', '.');
        numberRes += 'K';
    }
    return numberRes;
}
export default formatNumber;