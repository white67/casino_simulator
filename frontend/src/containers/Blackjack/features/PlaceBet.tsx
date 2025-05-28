import Button from "../../../components/Button.tsx";
import {Container} from "@mui/material";

interface Props {
    addBet: (value: number) => void;
}

const PlaceBet = ({addBet}: Props) => {
    return (
        <>
            <Container sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Button sx={{height: "2rem", alignSelf: "flex-end"}} bgcolor={"green"} text={"5$"} onClick={() => {
                    addBet(5)
                }}/>
                <Button sx={{height: "2rem", alignSelf: "flex-end"}} bgcolor={"green"} text={"10$"} onClick={() => {
                    addBet(10)
                }}/>
                <Button sx={{height: "2rem", alignSelf: "flex-end"}} bgcolor={"green"} text={"20$"} onClick={() => {
                    addBet(20)
                }}/>
                <Button sx={{height: "2rem", alignSelf: "flex-end"}} bgcolor={"green"} text={"50$"}
                        onClick={() => addBet(50)}/>
                <Button sx={{height: "2rem", alignSelf: "flex-end"}} bgcolor={"green"} text={"Clear"}
                        onClick={() => addBet(-30000)}/>
            </Container>
        </>
    )
}
export default PlaceBet;
