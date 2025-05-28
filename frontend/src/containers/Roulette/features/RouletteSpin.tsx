import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Box from "@mui/material/Box";
import RollRoulette from "./RollRoulette";
import { useEffect } from "react";

interface RouletteSpinProps {
  mustSpin: boolean;
  prizeNumber: number;
  setMustSpin: React.Dispatch<React.SetStateAction<boolean>>;
}

// import sourceee from "./rul.png";

let data = [];
const numLayout = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
for (let i = 0; i < numLayout.length; i++) {
  data.push({
    option: numLayout[i].toString(),
    style: {
      backgroundColor:
        numLayout[i] === 0 ? "#1f7e03" : i % 2 === 0 ? "#ec0004" : "#131011",
    },
  });
}

const RouletteSpin = ({
  mustSpin,
  prizeNumber,
  setMustSpin,
}: RouletteSpinProps) => {
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    if (mustSpin) {
      setIsRolling(true);
    }
  }, [mustSpin]);

  const handleStopSpinning = () => {
    setMustSpin(false);
    setIsRolling(false); // Stop rolling animation
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              setTimeout(() => setMustSpin(false), 100);
              handleStopSpinning();
            }}
            innerRadius={70}
            textDistance={90}
            spinDuration={0.5}
            fontSize={16}
            textColors={["#ffffff"]}
            outerBorderWidth={3}
            outerBorderColor={"#D4AF37"}
            innerBorderWidth={3}
            innerBorderColor={"#D4AF37"}
            radiusLineWidth={0}
            radiusLineColor={"#f4f4f4"}
            disableInitialAnimation={true}
            perpendicularText={true}
            // pointerProps={{
            //   src: sourceee,
            //   style: {
            //     width: "220px", // Customize size or other styles as needed
            //     position: "absolute", // Customize position if necessary
            //   },
            // }}
          />
        </Box>

        <Box
          sx={{
            position: "absolute",
            zIndex: 2, // Bottom layer
          }}
        >
          <RollRoulette isRolling={isRolling} />
        </Box>
      </Box>
    </>
  );
};

export default RouletteSpin;
