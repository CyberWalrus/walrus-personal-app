import RoutePath from "@client/routes";
import * as React from "react";
import { FunctionComponent, ReactElement } from "react";
import { Link } from "react-router-dom";
export interface Props {
  onButtonCLick: () => void;
}
const ContainerButton: FunctionComponent<Props> = ({
  onButtonCLick,
}: Props): ReactElement => {
  return (
    <div className="toolbar">
      <ul className={`toolbar__list`}>
        <li className={`toolbar__item`}>
          <a href="#" className={`toolbar__btn`} onClick={onButtonCLick}>
            {`J`}
          </a>
        </li>
        <li className={`toolbar__item`}>
          <a href="#" className={`toolbar__btn`} onClick={onButtonCLick}>
            {`k`}
          </a>
        </li>
        <li className={`toolbar__item`}>
          <a href="#" className={`toolbar__btn`} onClick={onButtonCLick}>
            {`s`}
          </a>
        </li>
        <li className={`toolbar__item`}>
          <a href="#" className={`toolbar__btn`} onClick={onButtonCLick}>
            {`M`}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ContainerButton;
