interface Props {
    balance: number,
    currency: string,
    betValue?: number
}

const BetInfo = ({betValue, currency}: Props) => {

    return (
        <h1>
            Betting: {currency}
            {betValue}
        </h1>
    );
};

export default BetInfo;
