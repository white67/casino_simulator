// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as deckComp from '@letele/playing-cards'
import Button from "../../../components/Button.tsx";
import {useState} from 'react';
import {Container} from "@mui/material";

const cardNames = ["Sa", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "Sj", "Sq", "Sk", "Ha", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9", "H10", "Hj", "Hq", "Hk", "Da", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "Dj", "Dq", "Dk", "Ca", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "Cj", "Cq", "Ck"];


interface Card {
    name: string;
    value: number;
}

interface BlackjackGameProps {
    setIsGameStarted: (value: boolean) => void;
    setWinner: (winner: string) => void;
}


const BlackjackGame = ({setIsGameStarted, setWinner}: BlackjackGameProps) => {
    const getCardValue = (cardName: string): number => {
        const value = cardName.slice(1);
        if (["j", "q", "k"].includes(value.toLowerCase())) {
            return 10;
        } else if (value.toLowerCase() === "a") {
            return 11;
        } else {
            return parseInt(value, 10);
        }
    };

    const drawCard = (deck: string[]): Card => {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const cardName = deck.splice(randomIndex, 1)[0]; // Usuwamy wylosowaną kartę z talii
        return {
            name: cardName,
            value: getCardValue(cardName)
        };
    };

    const calculateHandValue = (hand: Card[]): number => {
        let sum = 0;
        let aceCount = 0;

        hand.forEach(card => {
            sum += card.value;
            if (card.value === 11) aceCount += 1;
        });

        while (sum > 21 && aceCount > 0) {
            sum -= 10;
            aceCount -= 1;
        }

        return sum;
    };

    const dealerTurn = (dealerHand: Card[], playerHandValue: number, deck: string[]): Card[] => {
        let dealerValue = calculateHandValue(dealerHand);

        while (dealerValue < 17 || (dealerValue < playerHandValue && dealerValue <= 21)) {
            dealerHand.push(drawCard(deck));
            dealerValue = calculateHandValue(dealerHand);
        }

        return dealerHand;
    };

    const determineWinner = (playerValue: number, dealerValue: number): string => {
        if (playerValue > 21) return "Player Busts, Dealer Wins!";
        if (dealerValue > 21) return "Dealer Busts, Player Wins!";
        if (playerValue === dealerValue) return "Draw!";
        if (playerValue > dealerValue) return "Player Wins!";
        return "Dealer Wins!";
    };

    const [deck, setDeck] = useState<string[]>([...cardNames]);
    const [playerHand, setPlayerHand] = useState<Card[]>([drawCard(deck), drawCard(deck)]);
    const [dealerHand, setDealerHand] = useState<Card[]>([drawCard(deck), drawCard(deck)]);
    const [playerValue, setPlayerValue] = useState<number>(calculateHandValue(playerHand));
    const [dealerValue, setDealerValue] = useState<number | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [playerTurnOver, setPlayerTurnOver] = useState<boolean>(false);


    const handleHit = () => {
        const newDeck = [...deck];
        const newCard = drawCard(newDeck);
        const newPlayerHand = [...playerHand, newCard];
        setPlayerHand(newPlayerHand);
        setPlayerValue(calculateHandValue(newPlayerHand));
        setDeck(newDeck);

        if (calculateHandValue(newPlayerHand) > 21) {
            setResult("Player Busts, Dealer Wins!");
            setPlayerTurnOver(true);
            setWinner("Dealer");
            setTimeout(() => setIsGameStarted(false), 3000);
        }
    };

    const handleStand = () => {
        setPlayerTurnOver(true);

        const newDeck = [...deck];
        const newDealerHand = dealerTurn([...dealerHand], playerValue, newDeck);
        const newDealerValue = calculateHandValue(newDealerHand);
        setDealerHand(newDealerHand);
        setDealerValue(newDealerValue);
        setDeck(newDeck);

        const gameResult = determineWinner(playerValue, newDealerValue);
        setResult(gameResult);
        if (gameResult === "Player Busts, Dealer Wins!" || gameResult === "Dealer Wins!") {
            setWinner("Dealer");
        } else if (gameResult === "Draw!") {
            setWinner("Draw");
        } else {
            setWinner("Player");
        }
        setTimeout(() => setIsGameStarted(false), 3000);
    };


    const renderCard = (cardName: string) => {
        const CardComponent = deckComp[cardName];
        return <CardComponent style={{width: '5rem', height: '7.5rem'}}/>;
    };

    return (
        <Container>
            <div>
                <h2>Player's Hand</h2>
                <div>
                    {playerHand.map(card => renderCard(card.name))}
                    {playerTurnOver && playerValue !== null && <p>Value: {playerValue}</p>}
                </div>
            </div>
            <div>
                <h2>Dealer's Hand</h2>
                <div>
                    {dealerHand.map((card, index) => (
                        playerTurnOver || index === 0
                            ? renderCard(card.name)
                            : <div key={index}
                                   style={{
                                       width: '5rem',
                                       height: '7.5rem',
                                       backgroundColor: 'gray',
                                       display: 'inline-block'
                                   }}></div>
                    ))}
                </div>
                {playerTurnOver && dealerValue !== null && <p>Value: {dealerValue}</p>}
            </div>

            {result ? (
                <h2>{result}</h2>
            ) : (
                <div>
                    <Button bgcolor={"green"} text={"Hit"} onClick={handleHit}/>
                    <Button bgcolor={"green"} text={"Stand"} onClick={handleStand}/>
                </div>
            )}
        </Container>
    );
};

export default BlackjackGame;
