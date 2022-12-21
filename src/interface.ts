export interface IReminderProps {
  callback: () => void;
}

export interface IComponentProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

// Piano
export interface IPianoProps extends IComponentProps {}

// Trophy
export interface ITrophyProps extends IComponentProps {}

// Desk
export interface IShootingStarProps extends IComponentProps {}

// Drink Stall
export interface IDrinkItem {
  label: string;
  value: string;
  img: string;
  content: string;
  quote: string;
}
export interface IDrinkstallProps extends IComponentProps {}

// Food Stall
export interface IFoodItem {
  label: string;
  value: string;
  img: string;
}
export interface IFoodstallProps extends IComponentProps {}

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
  extraContent?: React.ReactNode;
  handleCloseModal: () => void;
}

// Name Tag
export interface INameTagProps {
  content: string;
}

export interface ICanvasProps {}
