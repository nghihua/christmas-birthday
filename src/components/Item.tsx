import { ReactNode, FunctionComponent, useEffect, useRef } from "react";

interface IItemProps {
  image: ReactNode;
  xCoordinate: number;
  size: number;
  isNear: boolean;
  setHandleKeyDownCallback: React.Dispatch<
    React.SetStateAction<(keyCode: string) => void>
  >;
}

const Item: FunctionComponent<IItemProps> = ({
  image,
  xCoordinate,
  size,
  isNear,
  setHandleKeyDownCallback,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isNear) {
      itemRef.current?.focus();
      setHandleKeyDownCallback(
        (oldHandle: (keyCode: string) => void) => handleKeyDownCallback
      );
    } else {
      itemRef.current?.blur();
      setHandleKeyDownCallback(
        (oldHandle: (keyCode: string) => void) => (keyCode: string) => {}
      );
    }
  }, [isNear]);

  const handleKeyDownCallback = (keyCode: string) => {
    if (keyCode === "Enter") {
      alert("enter");
    }
  };
  return (
    <div>
      {xCoordinate + size > 0 && (
        <div
          ref={itemRef}
          className={`absolute bottom-0`}
          style={{
            left: `${xCoordinate}px`,
            width: `${size}px`,
          }}
        >
          {/* glow */}
          {isNear && (
            <div className="mx-auto mb-[-100%] bg-orange-200/70 w-[200px] h-[200px] rounded-full"></div>
          )}
          {/* actual guitar */}
          <div className="width-[400px]">{image}</div>
        </div>
      )}
    </div>
  );
};

export default Item;
