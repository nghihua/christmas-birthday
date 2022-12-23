import { FunctionComponent, useEffect, useRef, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import LoadingModal from "./modals/LoadingModal";
import Modal from "./modals/Modal";
import NameTag from "./NameTag";
import PaperModal from "./PaperModal";
import { IDrinkItem, IDrinkstallProps } from "../interface";
import { drinkList } from "../const/drinkList";

const Drinkstall: FunctionComponent<IDrinkstallProps> = ({
  interactDistance,
  xCoordinate,
  setHandleKeyDownCallback,
  focusOnCanvas,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const image = (
    <img src="https://cdni.iconscout.com/illustration/premium/thumb/food-truck-beverage-and-wooden-chair-4975285-4144388.png" />
  );
  const size = 900;
  const [isNear, setIsNear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedFood, setSelectedFood] = useState<IDrinkItem | undefined>(
    undefined
  );

  useEffect(() => {
    if (
      0 > xCoordinate - interactDistance / 2 &&
      0 < xCoordinate + interactDistance * 4
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
  const handleCloseMessage = () => {
    setShowMessage(false);
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
            {isNear && <NameTag content="Xe đồ uống" />}
            <div className="mb-[-30px]">{image}</div>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          title="ĂN XONG GIỜ ÚN MÍN NHA"
          handleCloseModal={handleCloseModal}
          content={
            <div className="flex flex-col">
              {drinkList.map((food) => (
                <button
                  className="hover:bg-[#d9e46c] px-2 flex gap-2 items-center"
                  onClick={() => {
                    setSelectedFood(
                      drinkList.filter((item) => item.value === food.value)[0]
                    );
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
          content="Đang pha đợi xíu"
          duration={3000}
          img={<img src="https://drinksonme.live/bartender-greet.gif" />}
          callback={() => setShowMessage(true)}
          toggleModal={setShowLoading}
        />
      )}
      {showMessage && selectedFood && (
        <>
          <PaperModal
            title="Kính mời quý khách"
            extraContent={
              <div className="flex flex-col gap-2">
                <img className="w-[200px] mx-auto" src={selectedFood.img} />
                <blockquote className="sm:text-xl text-sm italic font-patrick text-center">
                  “{selectedFood.quote}”
                </blockquote>
              </div>
            }
            content={selectedFood.content}
            handleCloseModal={handleCloseMessage}
          />
        </>
      )}
    </>
  );
};

export default Drinkstall;
