import { PropsHoc } from "@client/components/form-custom/form-custom";
import * as React from "react";
import { ComponentClass, PureComponent, ReactElement } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { getMessage, getTypeNotification } from "../../store/condition/selector";
import { StateApp, ThunkDispatch } from "../../type/reducer";
export interface PropsState {
    message: string;
    type: string;
}
type Props = PropsState;

const withNotificationState = (Component: any): ComponentClass<Props> => {
  type P = ReturnType<typeof Component>;
  type PropsAuthorization = Props & P;
  class WithNotificationState extends PureComponent<PropsAuthorization> {
    public render(): ReactElement {
      return (
        <Component
          {...this.props}
        />
      );
    }
  }

  return WithNotificationState;
};

const mapStateToProps = (state: StateApp, ownProps: Props): Props => ({
  ...ownProps,
  message: getMessage(state),
  type: getTypeNotification(state),
});

export { withNotificationState };

export default compose<any, PropsHoc>(
  connect<Props, {}, {}, StateApp>(
    mapStateToProps,
  ),
  withNotificationState,
);
