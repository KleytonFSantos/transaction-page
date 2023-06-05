import { Card } from "flowbite-react";

type CardProps = {
    title: string;
    value: number;
}

export default function TransactionCard({ title, value }: CardProps) {
  return (
    <Card
    className="w-1/3"
  >
    <a href="#">
      <h5 className="text-xs font-semibold tracking-tight text-gray-900 dark:text-white">
        <p>{title}</p>
      </h5>
    </a>
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-gray-900 dark:text-white">
        R$ {value}
      </span>

    </div>
  </Card>
  );
}
