import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HStack } from "@chakra-ui/react";

const CardSkeleton = ({ amount }) => {
  const loadCards = Array(amount).fill(1);
  return loadCards.map((card, i) => (
    <div className="card-skeleton" key={i}>
      <HStack>
        <Skeleton width={20} height={20} />
        <Skeleton width={120} height={10} count={2} />
      </HStack>
      <div>
        <Skeleton count={2} width={50} height={10} />
      </div>
    </div>
  ));
};

export default CardSkeleton;
