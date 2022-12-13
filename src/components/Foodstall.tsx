import { FunctionComponent, useEffect, useRef, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import LoadingModal from "./LoadingModal";
import Modal from "./Modal";
import NameTag from "./NameTag";
import PaperModal from "./PaperModal";
import { IFoodstallProps } from "../interface";
import { foodList } from "../const/foodList";

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
            {isNear && <NameTag content="Hàng đồ ăn" />}
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
            content="Đồ ăn tới rồi nè. Chúc em một năm mới nhiều điều ngọt ngào như món này nha."
            extraContent={
              <img
                className="w-[200px]"
                src={
                  foodList.filter((item) => item.value === selectedFood)[0].img
                }
              />
            }
            handleCloseModal={() => setShowMessage(false)}
          />
        </>
      )}
    </>
  );
};

export default Foodstall;
