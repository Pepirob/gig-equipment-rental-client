import { Link } from "react-router-dom";
import { capitalize } from "../utils";

function ItemTransaction({ item }) {
  const currentDay = new Date();
  const transactionCreatedDay = new Date(item.updatedAt);
  const lastDayRent = transactionCreatedDay.setDate(
    transactionCreatedDay.getDate() + item.daysRented
  );
  const timeDiff = Math.abs(lastDayRent - currentDay.getTime());
  const remainingDays = Math.round(timeDiff / (1000 * 3600 * 24));

  return (
    <li>
      <img src={item.equipment.img} width="100" />
      <div>
        <Link to={`/transaction/${item._id}`}>
          {capitalize(item.equipment.name)}
        </Link>
        <p>State: {capitalize(item.state)}</p>
        <p>Remaining Days:{remainingDays}</p>
      </div>
    </li>
  );
}

export default ItemTransaction;
