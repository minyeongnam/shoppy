interface PriceCardProps {
  text: string;
  price: number;
}

export default function PriceCard({ price, text }: PriceCardProps) {
  return (
    <div className="price-card">
      <span className="card__text">{text}</span>
      <span className="card__price">{price.toLocaleString()}원</span>
    </div>
  );
}
