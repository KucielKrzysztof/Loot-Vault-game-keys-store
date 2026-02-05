import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import chestImg from "./assets/empty-chest.png";

function PageNotFound(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-64">
        <img
          src={chestImg}
          alt="Empty chest"
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="mt-6 text-2xl font-black tracking-tight uppercase">
        404 - <span className="text-primary">Loot </span> Not Found
      </div>
      <p className="mt-2 text-gray-400">
        The loot you are looking for is in another castle.
      </p>
      <Button variant="primary" onClick={() => navigate("/")} className="my-2">
        Go Home
      </Button>
    </div>
  );
}

export default PageNotFound;
