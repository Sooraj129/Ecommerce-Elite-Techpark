export const calculateDiscount = (oldPrice,newPrice) =>{
    const discountAmount = oldPrice - newPrice;
    const discountPercentage = ((discountAmount / oldPrice) * 100).toFixed(2);
    return {
        discountAmount:discountAmount.toFixed(2),
        discountPercentage
    }
}