// riskManager.js
export const shouldExecuteTrade = (
    winProbability,
    reward,
    lossProbability,
    risk,
    positionSize,
    spreadPct,    // e.g., 0.0005 (0.05%)
    commission,   // Fixed $ amount
    slippagePct   // e.g., 0.0005 (0.05%)
) => {
    // Costs scale with trade size
    const transactionCost = (positionSize * spreadPct) + commission + (positionSize * slippagePct);

    const expectedValue = (
        (winProbability * reward) - 
        (lossProbability * risk) - 
        transactionCost
    );

    return {
        execute: expectedValue > 0,
        ev: expectedValue
    };
};