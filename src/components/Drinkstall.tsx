import { FunctionComponent, useEffect, useRef, useState } from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import LoadingModal from "./LoadingModal";
import Modal from "./Modal";
import PaperModal from "./PaperModal";

interface IDrinkstallProps {
  interactDistance: number;
  xCoordinate: number;
  setHandleKeyDownCallback: React.Dispatch<React.SetStateAction<() => void>>;
  focusOnCanvas: () => void;
}

interface IFoodItem {
  label: string;
  value: string;
  img: string;
  content: string;
  quote: string;
}

const foodList: IFoodItem[] = [
  {
    label: "Cà phê",
    value: "coffee",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/4a08a1135089065.61e186788991a.gif",
    content: "Biết ngay mà coffeholic. Tuổi mới heo thì hơn nha.",
    quote:
      "no-nonsense, straight shooter, don't mess around, a bit obsessive, want to be in control and highly motivated",
  },
  {
    label: "Trà",
    value: "tea",
    img: "https://www.ashigaracha.co.jp/html/template/ashigaracha/assets/img/page/hti01.png",
    content:
      "Em có thích uống trà đâu, chọn cho vui đúng hong? Nhưng thôi nào mình vô SG đi trà đạo i.",
    quote:
      "You value harmony and inner peace, enjoy exploring new places and cultures.",
  },
  {
    label: "Hot Chocolate",
    value: "chocolate",
    img: "https://media.baamboozle.com/uploads/images/103030/1637141849_24746_gif-url.gif",
    content:
      "Chuẩn chỉnh cho ngày Giáng sinh. Chúc em một năm an lành ấm áp như ly chocolate này nha.",
    quote:
      "You take delight in pretty things and enjoy little pleasures in life. You have a good heart and values kindness in relationships.",
  },
  {
    label: "Nước lọc",
    value: "water",
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAMAAAAshD+zAAAAw1BMVEX///9cAADB4/+A0P9jBweQ///36+vm2Nju5eV8MjOzh4eMSUnbx8f/2dnJqalrFRVXiYlzGxuqeHijamqEPDz/xcVklJTBnZ13KCi7lJTOs7P+X1//t7fI2tro9PS31vH/qKjU7/CcYmKyxs5tIiOVWFittsr/lZV6oqKht7yNsK+ObHZ/SE9mnKSYhZKej6CJ5v+knrCJGBh7xuyEU1uu//9zt9Bsqbd6PUKtLy/fTU1iaWlJAADUz89dNDTBOjqNz9EDaoUyAAASNElEQVR4nO1dCZfaOBLGaUU+Y+NjMHYWWAz0QNNHetLpdJI59v//qlWVbHNJAhuRTs/zt/vepA9sfapSXSqpe70OHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQ4cOHTp06NChQwcBTMf1XnsMF4JVEMMIrV6PWpZpmp5HX3tE2mBFjBpDOJ8HAcF/2+ZrD0oT0gCpEf6fEuG/Q3YeZ0M8yyWA8kvrtcelBS5ycUwmKlxvQySXvfaw9MDBJWYmgQuaSAsUXfHao9KFPPd6FBbcokez8N8ktxK48IKIUzP+ZR7PGlZmkhSX9wKU4+LvwXf5UeUGguii1CwvdRauHQZhwP4/TNw4y81LkvScsPZuziVfZOZlsLALMo8vFhA59UvIBY0k9R2XbN4UAMjmG2HhX0JjzPLxixRebsN6MAFafbhZKUdgF47vmZZlUYhivTyL3DnnSJJcu/ws9mhiRyaN4Q3DRRIGGKeQQturzKIavlDrqenMOXXb1/XK+tUpaARNDtaCq+f5+YJH4pGvUAYvW6BJs7MLrD4Tuc13Que5jveYC5SZmx/9TYurbnD8Nxsi55Nr0dxPfQb80tHw4AyftDgtKKCpjRqj17Rwo2JTpqFcWgS/PPu5HsTkJD493qEpaBDRqZsYVxoL6sOD2bTl8IbwfHOJTqZp1puSFh9SIINBpL0eVwov4Sp67lPR/JLmum2iuLWtPBY0EzDCduXKQYznPhRNVNJKAlAZIOm5A6jgOTgIsw6eNdgSmKOo5WdxYs6f3x1YbslNQxDmnadaoNI6PTqNSmqhhqcy3zI/a9kwYzTUFyI5ZRQ7TzVElczuumcOjU2PpgJcGSIxqaU6Hghp/dnP8YieALBaa4GedC43ML04Fy4Udc5GymN2V4dC9ni8kzSaJVNY2TC1BO8w06GjKyig88YhQPZnLPw2jy3OhO/oyxOL5j6ABjIBwXr5hSrfEJ82LXpmhmw2oCanYfVqAg2bhwB0Ppf+zAv0pF6wk2X2TN+J4jhKW9ajioN0wk+OKamjMhuZLsV0jaCoC1Kt0gLvMGpy/zwWYiZK2dhnmcxaRNZOkaFN1AuGct/u5eypC5UlztXVezM4I8pMSU4dN855HSwo4sjJ0mzeaoPOEeXvEI6r0rrEGKoH2F4xTVLuqDo9SniwSi0TjB5p7viG4kmGjDyWreH8qC9zD9XhRJiVFhKLYgVzCGVLK29DzpdF8rktr0kmR4s1MJbNr4xHo9nqBrCajUZT5SfBBCSpP4f5s+v1lmVt1DKUrw5Ip4TT758QhLgbdzBaDfr9/uBuyTCAfy5XCn4pD3FccL1QYhy67iJ2oP7ROOHwVQ4X6j6iooN7gobk1UyP7hib2Wg6xm+Px6PZDSN4M5K+lEcUCVhHWBs5s57sf24LA2wrzRpUZ4MDIbElf4JVRtGNR0smp30iY5ClTHoON/oJfBxCp3kynAfY0tA03ciPRUois2eSUkGUO5Fs7QR/LfsDsYjGs35f/DmHLwYk5+34uaZquTgaKHlDI9h3aXw3yU/CsFCs8cSY9/ursezH07uZ8PspT5psUE668eJMdk3D3+D4VjqN/xQqIZ9VhdX0/5aJjWPcF7LLkRxFawl1i9gyLdg+s5raSu+k+N0RPtY5FhNNB4O1UpFuhOwwbUaZMVPiEMP2OBrHzY5icJan3vcuOLlE+gvL/lq94zAe9AVK60G3HgYnVtlK1K6+R22pVlLoJpirnneM3Kz/EMdqdzgSiQ43VnMmMuJlO/akYRrFbLosRCyHrmCXqd84HgysKI7UynS3PPzexoigyNKUxYeui3X1Rp02vjRJtYhSLqZZGRTpZueof9Nz4ljp7NkEHOolrfcHAAt0CixD8Js6ulgqmsrBBNtjN6NSTGxZsEn03SCUN+rO+qOeH8fKpHfWF5DDhUbmbgQtIgUFu0DAmiTNihc0NAKJfbXKRgaMeHw+QqiNYEOBOTwhK77pT9lsxKp1MhqIJIe+AOfMguIeGOXEJQVsHDSJnD1FuMZ7HPmmDUvLofPRhp2yoe+BeRYqI6UfPnyoopZVf9UDvVSMp3+zEpHreRFyY3PvoGOIwa+b2U6ecRS+KudiybBb6izTEztNmSz/+YfLcy5cSUANgUNg4dWol8YKZzC664nJlchhyYO8KFSwLKeZ5JwTrWvVEfLt48dvuBCFA2bcfgOU7Bi5wTRXLLoZ09ubgeK1PpBz0CxYiQMGogk5uT3ZgwVdj4Rx+/jx+zfJVgdw+w8A6PXQWg4Gck/HsoUbtjAFrqCGD/aMph7lesL0R2YhRHAbeI7CCD9yhGL/gNz+ywDsKJBbjVlOsBZGu4wa+u/ljeKVkO+4jrMIcBMDKmFNNv9YfHJyVSIzyHcVOcp0knH7HdmB6KYgmVV/MBjtL6spJOY3mM0NVopXWnXF0vAzvzCaZavzBiUXNo3/qMiB4Bg3hlJ04wFTObpeD6CqwPJwhuloNMM0vCozjJXkSosNLS750XjpAGGDFeqhPTmN3H9QLwd3EKHG0WjFdHCDwXJWp+BTcdJTg/pREReZVYZkjcoMQQNy7PF/cHJ/CAMFJPf7NrklM/OUR5fTUV36mm4rqTBwFgIipmbl9H1y4ISlTcxJZVEU5LbVkpn5mpwMo74qmd1BnjfcsNsjR7d98AEig6jIUW4sGbfSoDBjcpTc7HRyjbFL7kPthIXDYRble0lOlCbRfVfARn6U3OqC5HasJdry0gmLxsMM87eSnHBnbvvzIDimc1Mgp4qBILi+FLbz8HrmwRwI2SWlRZGQqyVffRwWlLUhN55++fJlumNP0OZIkG+Fba12VFxjs/VLK63i7AS/XS06GTlg96EOLbmdN+MYI5Txl/cbfKkZ3d3JhmZuObWs1TZtvLUTXlu72iDsIy8XnZRcaZEqcwse2otjf48aovLh0tDS36TdbD20OTmXbaU8GD2VfkpMjuUd39Tkers16LsbSMW93gE1BvyFaV8aoOSbIkDaamMOnlA7/R1yv4nI9Rbc0ynJbWO57GVxPBJQe/+F/XgKsbXoc9TLU0jjIvRsdAGtRG7jNilzqw1tO8IQS65yBmJXIMANlL9WIm5I7v1U7MOdTbycWHkRqktVUkCdqTKXx9cczMU3qRMXYDbI4/8JuXFy78U+fHNGySCbzcfmzR/F5iNlyrLlhA8xRL08mdyoHz2IuQG58fv3z0I354X1GVzX5ExDe95cdB7Z5H9YJQAXLAtRKr0MT43Op/2lhFtJ7qvEzVEKBRPDxxPwLrcnzclt7+2iIf9ty08Jfz0Ecid2G40HX2XkpkhOVG8uAfWuIHR4xgq0WnSh7Gwa010/JQCT9Lfv5FTtN/tfP8nJTd9/GkiKDKYf1ydVTb7aaIsTubCXsl1GOXZqEyz0yV6n+HF3JWEH5D5dDYTZnJfU5jJcLMCkZBixNO++dpuJm5bvOgUeYeSupOS+XF2Jc4LaPA79qqg/z7w2bfOwcd3E/ZtRcepLEuPH4POVWHaM3ERGznYTO4GzeTm2MJReziBMRZ2GB6qftB252wPTYCQnZMesJfuJIuHBAnpv6/gqLIZhg2odwjTaaPMJz2Vr88fg+epKRO/TpDdm31fU0p0yoIRNwEXkLtKSXMMG40jnQYca2BMz63Nye/Q+fbq66k3V5NIycE7KGroJhm/Y3GSGutpatwGul077X69qfCrBvxqzJXclc3O547FsDCJYyyhTH+YKkuJ0Y1YjM/TffBDjM0fb5ASQuDl+ohMdcFpXYsuV13gFsZwi1Hso0+FjGg/ulOQk2VxZXoY4yK53dkhlVZpiqOXI5AbQ7QfeU0FuwtTys6z0FVW1c4i9yiXDxdni3hA9pzhqQB8h35JdDmTkwM9JyUFrDZ/uiNTGzlwM251I9w19x/rwPF9ZrLyRkZv0eu+unuVFS8+vzqdrGFXauBQvA/T/1N5ohV5cSk7mw2lBMCakDt4W4icF7blhu9OmADAB5x6eQ9jVyVVq+u4PGbmrKfNzX2XkitJyuOjsfKwxGHttI40AB9+H54Yq1LfxOLzp+dGQPfBvKTnAV4kPh4mG2o7HTQjGl3iaudkpsW2gPrX9MAc/q+w7dpWz/D14VpC7E5NzqoIJ7qx6aDt5Q0PzZLwG9NC01+vqGo76kjUyjPO/lOQknQw4M7xblcDRBuoSSHfQ+7U/u2aBrqubteTwoq2m1vkiSqGfcTxQhCifJeTgAWXEZPHB8MbcrJ2f24zQaEkv39TgAjfb9H0uFSHKZ0mPc0wk9yD4dtsj7OXnC7B2buSffH8S2A4XhUYSt+AC22CmsCjPEnI6XJsMHs9+SeIcJWimi7KQE96KYxyVXt6puocuBrO8VImEiyyXeXYzj+aVUXy5n1xLArhlXya659M2+/WL0UzdqqhNbDd28C6ZEmnmRIukJjZ/Wl+/e/duRsR16Glfsuqe+6rOqBoOaXncSYncOI7gZX09eYeYBJIAYibO6Z77ot7tA4Cru0ARBMwfWa/tQHSjGbgzuyaG5EJZM+Sqf3eomV/VJw5qALnzTKQIeMQ+YKOfXD/er9dPtxWentbr9f3jNjHEULr9OevvufLPXwdl69dRQDeb9ivbKMor3GegwEvteQ8wvWH0Kul9foZDWad2aAA5Dbch7ILFd8xkkNnJ3K5DVSFmNIDjcwA8PXd68wmQK61wWrQNnvbAUvMQzuTa16dRm6xB0oqVP4aDj8vlEru/jr+fWqbnwYEUCJe5FYbwuUkvqRxzNlKKhmN9Crd7HlbqKhBaLK1AzHMgN0dK2t6Q4UkhbiZvj6676xc0PvrIbcWpJkSDuJmBo9FgOEFmJrZ/wHZEsFbq5uMtvHb++ND6dPEB6t0PNl9IFDJXvDFRg8uL0PzSgBmUNfo0KbvJA7+Yaz2ZrvQV0GiaspgIKaacKDzZ1qIafxmYK4K6z6bXOHr7QaSc1+vhRnOvz8mTRcDj4mbZ9O9Dd4oOY2nzhBeOHjKRTe6xaEBuH65nNcPJjLn2Fx6q3D5yprrJQfyXwGYnvl5T/OxU+sUmrRx3mWOT0GYBytPTix1Wd6+G64rwtSRybgs8i4Wn4ANQTT1hCj9xCHArcpX09hE+bWkrI6dVcjmXF0guP790VSKrZ4nZlft67LP7WzusGZJw+PK0uw5netUSBZdxt2DGhp7rVczNc3zDeNq1jbPrB8Dj1uqrf3arlxxeH9Xj5HKL8C/OhbupMDGetswHHBjOubZ1wTEvvZqNpjIzdFzilxubljzmC06MnHloqXN/Fk8Ewj9sTjIxmu71C0C2n8FUPXg8gdsDqZ2RJmAhHZOMhC89vBjlzGVHd/IWflDIflRFl9cYw4T3kyanS44B5FY+zS41gp4/e+6uai24RKQrb/KAIQq5n0wfNW5felthZEWOB87nbN17e0UeuNIEqmD2vUh4sydei72F0PNWxx10HHgoqZopIBfzsZ0TqFi+P9wPu5lJuV/Du4Lbe3AAVakLoi/MBkpqUNnTdgMd7ojDyqcWt5rF5tsttYP3kB2+53Y6WVeuO5gPbYZhXREbViKVFJxboUrqrYC42O9cplLulrY2BC/C7s0+uPSH6bv77VbjGsGmtrfWYakr2GWDXl05LVNUWq+/poDbYCP7YIuIfTsAvbu+3wqXCYugX5621uE90fnHV6jHp5hWU1oZSRonrS4xt7BFNDocIrQ5Vb5uwtYaoF57FTfjEpXTXtWQePYltfzSF/tQpSFlDRR+rtTJC934CLczSMuhJ8OC3f5YdGEu3Jq3VrhxiJj19EGIYPo6/lBHqd+i57MfDWVVlAlW9S6hkzrBPYGwco2HaW5F9CYPoeaA+ULwF4uFJMbALgnj5WF382OyWl/oj0z8XNDqz/jdrh/QXj4+rF+q3cm3/yfvqhva9zCE6uKb/2uFzJBG0W6ViNhwvs1/C0vuCLiAzNwpXIguF7FTmmiLXKL9+6eCzqXZRvLm9dIKpFdgnXobzq8LU57ReLrL6D8dnnxn2tL25xdeC55i863JdTi/JFJFvma+db2MFGU1qOr/Qhf4N4fymilHX+HrVWCrzpkoTOlbAJV1rfGfNrmn6deDqd41Va3IXx+q2xR7WIN7w39U2VdXEiz55a1vAMfsof2WF11xpIwdX+ZM78/BsUvu3/SiO2broZPqzQbPwbFsO37D6bhjH1lSVNvf5OrQoUOHDh06dOjQoUOHDh06dHh1/B/Q0UiFRXZAUwAAAABJRU5ErkJggg==",
    content:
      "Quáo, dị mà chọn option chán nhất trong menu luôn. 多喝点水，皮肤更美.",
    quote:
      "You are simple, not basic, a minimalist, not boring. You like clarity in life and you tend to know exactly what you want.",
  },
];

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
  const glowSize = 600;
  const [isNear, setIsNear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedFood, setSelectedFood] = useState<IFoodItem | undefined>(
    undefined
  );

  useEffect(() => {
    if (
      0 > xCoordinate - interactDistance &&
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
                className="absolute top-0 left-[50%] bg-orange-200/70 rounded-full"
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
          title="ĂN XONG GIỜ ÚN MÍN NHA"
          handleCloseModal={handleCloseModal}
          content={
            <div className="flex flex-col">
              {foodList.map((food) => (
                <button
                  className="hover:bg-[#d9e46c] px-2 flex gap-2 items-center"
                  onClick={() => {
                    setSelectedFood(
                      foodList.filter((item) => item.value === food.value)[0]
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
            title="Notes"
            extraContent={
              <div className="flex flex-col gap-2">
                <img className="w-[200px] mx-auto" src={selectedFood.img} />
                <blockquote className="text-xl italic font-patrick text-center">
                  “{selectedFood.quote}”
                </blockquote>
              </div>
            }
            content={selectedFood.content}
            handleCloseModal={() => setShowMessage(false)}
          />
        </>
      )}
    </>
  );
};

export default Drinkstall;
