import {
  ReactNode,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";
import LoadingModal from "./LoadingModal";
import Modal from "./Modal";
import PaperModal from "./PaperModal";

interface IFoodstallProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

const foodList = [
  {
    label: "Pancake",
    value: "pancake",
    img: "https://2.bp.blogspot.com/-IYuKasIqJSI/WPVryfyuhkI/AAAAAAAOnAw/boSzUubeyR0ecILV-O-FDgijLLkm52fBwCLcB/s1600/AS002524_22.gif",
  },
  {
    label: "Cupcake",
    value: "cupcake",
    img: "https://media2.giphy.com/media/L3KpMnDHfPqse6Jz6j/giphy.gif?cid=790b7611a54296017554f28b33bb48414e136f78fa0e6fc0",
  },
  {
    label: "Kem con cá",
    value: "fishicecream",
    img: "https://media3.giphy.com/media/AM7L5s0gzx7fS24E1h/giphy.gif?cid=6c09b952f1281e3855d690fcb63fc3e1ad9af2d93620f823",
  },
];

const Foodstall: FunctionComponent<IFoodstallProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const image = (
    <img src="https://cdn2.iconfinder.com/data/icons/food-and-market-stall/267/10-512.png" />
  );
  const size = 400;
  const glowSize = 300;
  const [isNear, setIsNear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedFood, setSelectedFood] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (
      0 > xCoordinate - interactDistance &&
      0 < xCoordinate + interactDistance
    ) {
      setIsNear(true);
    } else {
      setIsNear(false);
    }
  }, [xCoordinate]);

  useEffect(() => {
    if (isNear) {
      itemRef.current?.focus();
      setHandleKeyDownCallback(
        (oldHandle: () => void) => handleKeyDownCallback
      );
    } else {
      itemRef.current?.blur();
      setHandleKeyDownCallback((oldHandle: () => void) => () => {});
    }
  }, [isNear]);

  const handleKeyDownCallback = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    focusOnCanvas();
  };
  return (
    <>
      <div>
        {xCoordinate + size > 0 && (
          <div
            ref={itemRef}
            className={`absolute bottom-10`}
            style={{
              left: `${xCoordinate}px`,
              width: `${size}px`,
            }}
          >
            {/* glow */}
            {isNear && (
              <div
                className="transition-all mx-auto mb-[-80%] bg-orange-200/70 rounded-full"
                style={{
                  width: glowSize + "px",
                  height: glowSize + "px",
                }}
              ></div>
            )}
            <div className="mb-[-30px]">{image}</div>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          title="QUÝ KHÁCH MUỐN DÙNG GÌ?"
          handleCloseModal={handleCloseModal}
          content={
            <div className="flex flex-col">
              {foodList.map((food) => (
                <button
                  className="hover:bg-[#d9e46c] px-2 flex gap-1 items-center"
                  onClick={() => {
                    setSelectedFood(food.value);
                    setShowLoading(true);
                    handleCloseModal();
                  }}
                >
                  <IoFastFoodOutline size={20} color="#1f5b33" />
                  {food.label}
                </button>
              ))}
            </div>
          }
        />
      )}
      {showLoading && (
        <LoadingModal
          content="Đang nấu đợi xíu"
          duration={3000}
          img={
            <img src="https://www.icegif.com/wp-content/uploads/chef-pusheen-icegif.gif" />
          }
          callback={() => setShowMessage(true)}
          toggleModal={setShowLoading}
        />
      )}
      {showMessage && selectedFood && (
        <>
          <PaperModal
            title="Notes"
            content={
              <div>
                <p className="text-xl leading-10">
                  Đồ ăn tới rồi nè. Chúc em một năm mới nhiều điều ngọt ngào như
                  món này nha.
                </p>
                <div className="my-5 flex justify-center items-center">
                  <img
                    className="w-[200px]"
                    src={
                      foodList.filter((item) => item.value === selectedFood)[0]
                        .img
                    }
                  />
                </div>
              </div>
            }
            handleCloseModal={() => setShowMessage(false)}
          />
        </>
      )}
    </>
  );
};

export default Foodstall;
