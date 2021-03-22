import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

import heads from "./img/heads.png";
import tails from "./img/tails.png";

import { useState } from "react";

function CoinFlipperDisplay({ coin }) {
  if (!coin) return null;
  return (
    <Card.Body className="pb-0">
      <Card.Img
        variant="top"
        src={coin === "H" ? heads : tails}
        className="w-75"
      />
      <Card.Title className="mt-1 text-center">
        {coin === "H" ? "Heads!" : "Tails!"}
      </Card.Title>
    </Card.Body>
  );
}

function CoinFlipperButton({ flipCoin }) {
  return (
    <Card.Body className="d-flex justify-content-center">
      <Button className="w-50" onClick={flipCoin}>
        Flip
      </Button>
    </Card.Body>
  );
}

function CoinFlipperLog({ flipLog }) {
  if (!flipLog.length) return null;
  return (
    <ListGroup.Item>
      <span>
        [{" "}
        {flipLog.length > 9
          ? `... ${flipLog.slice(-9).join(", ")}`
          : flipLog.join(", ")}{" "}
        ]
      </span>
    </ListGroup.Item>
  );
}

function CoinFlipperCount({ flipCount }) {
  return (
    <ListGroup.Item>
      <div className="d-flex justify-content-around">
        <div>Heads: {flipCount.heads}</div>
        <div>Tails: {flipCount.tails}</div>
      </div>
    </ListGroup.Item>
  );
}

function CoinFlipperCard() {
  const [coin, setCoin] = useState(false);
  const [flipLog, setFlipLog] = useState([]);
  const [flipCount, setFlipCount] = useState({ heads: 0, tails: 0 });

  const flipCoin = () => {
    const newCoin = Math.random() < 0.5 ? "H" : "T";
    setCoin(newCoin);
    setFlipLog((flipLog) => [...flipLog, newCoin]);
    setFlipCount((flipCount) => {
      const duplicate = { ...flipCount };

      if (newCoin === "H") duplicate.heads++;
      else duplicate.tails++;

      return duplicate;
    });
  };

  return (
    <Card style={{ width: "300px", textAlign: "center" }}>
      <Card.Header>Flip a coin!</Card.Header>

      <CoinFlipperDisplay coin={coin} />
      <CoinFlipperButton flipCoin={flipCoin} />

      <ListGroup>
        <CoinFlipperLog flipLog={flipLog} />
        <CoinFlipperCount flipCount={flipCount} />
      </ListGroup>
    </Card>
  );
}

export default CoinFlipperCard;
