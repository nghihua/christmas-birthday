// Piano
export interface IPianoProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

// Trophy
export interface ITrophyProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

// Drink Stall
export interface IDrinkItem {
  label: string;
  value: string;
  img: string;
  content: string;
  quote: string;
}
export interface IDrinkstallProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

// Food Stall
export interface IFoodItem {
  label: string;
  value: string;
  img: string;
}
export interface IFoodstallProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

// Joystick
export interface IJoystickProps {
  handleClickLeft: () => void;
  handleClickRight: () => void;
  handleClickSelect: () => void;
}

// Modal
export interface ILoadingModalProps {
  content: React.ReactNode;
  img: React.ReactNode;
  duration: number;
  callback: Function;
  toggleModal: Function;
}
export interface IModalProps {
  title: string;
  content: React.ReactNode;
  handleCloseModal: () => void;
}
export interface IPaperModalProps {
  title: string;
  content: string;
  extraContent: React.ReactNode;
  handleCloseModal: () => void;
}

// Name Tag
export interface INameTagProps {
  content: string;
}

export interface ICanvasProps {}
