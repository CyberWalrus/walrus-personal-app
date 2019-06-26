import { FormType } from "@config/constants";
import * as React from "react";
import { ComponentClass, PureComponent, ReactElement } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { getError, getSuccess } from "../../store/user/selectors";
import { ActionCreator, Operation } from "../../store/user/user";
import { StateApp, ThunkDispatch } from "../../type/reducer";

interface PropsInsert {
  formType: FormType;
}
interface PropsState {
  errorMessage: string;
  success: boolean;
}
interface PropsDispatch {
  onSignIn: (email: string, password: string) => void;
  onSignUp: (email: string, password: string, login: string) => void;
  onResetError: () => void;
}
type Props = PropsState & PropsDispatch & PropsInsert;
interface State {
  login: string;
  email: string;
  password: string;
  passwordConfirm: string;
  formErrors: FormErrors;
  emailValid: boolean;
  passwordValid: boolean;
  loginValid: boolean;
  passwordConfirmValid: boolean;
  formValid: boolean;
}
interface FormErrors {
  email: string;
  password: string;
  signIn: string;
  login: string;
  passwordConfirm: string;
}
export type WithState = (
  Component: any,
  isSignUp: boolean,
) => ComponentClass<Props, State>;

export interface Option {
  values: object;
  formErrors: object;
  formValid: boolean;
  onChangeUserInput: () => void;
  onClickSubmit: () => void;
}
const withAuthorizationState = (
  Component: any,
): ComponentClass<Props, State> => {
  type P = ReturnType<typeof Component>;
  type PropsAuthorization = Props & P;
  class WithAuthorizationState extends PureComponent<
    PropsAuthorization,
    State
  > {
    public constructor(props: Props) {
      super(props);
      this.state = {
        login: ``,
        email: ``,
        password: ``,
        passwordConfirm: ``,
        formErrors: {
          email: ``,
          password: ``,
          signIn: ``,
          login: ``,
          passwordConfirm: ``,
        },
        emailValid: false,
        passwordValid: false,
        loginValid: true,
        passwordConfirmValid: true,
        formValid: false,
      };

      this.handleUserInput = this.handleUserInput.bind(this);
      this.handleSendSubmit = this.handleSendSubmit.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
      this._handleValidateField = this._handleValidateField.bind(this);
      this._handleValidateForm = this._handleValidateForm.bind(this);
    }
    public componentDidUpdate(): void {
      if (this.props.errorMessage) {
        const formErrors = this.state.formErrors;
        formErrors.signIn = this.props.errorMessage;
        this.setState({
          formErrors,
        });
        this.props.onResetError();
      }
    }
    public handleUserInput(event: React.ChangeEvent<HTMLInputElement>): void {
      const key = event.target.name as keyof State;
      const value = event.target.value as string;
      this.setState<never>({[key]: value}, (): void => {
        this._handleValidateField(key, value);
      });
    }
    public handleSendSubmit(event: React.ChangeEvent<HTMLFormElement>): void {
      event.preventDefault();
      this.props.onSignIn(this.state.email, this.state.password);
    }
    public handleSignUp(event: React.ChangeEvent<HTMLFormElement>): void {
      event.preventDefault();
      this.props.onSignUp(
        this.state.email,
        this.state.password,
        this.state.login,
      );
    }

    public render(): ReactElement {
      const login = this.state.login;
      const email = this.state.email;
      const password = this.state.password;
      const passwordConfirm = this.state.passwordConfirm;
      const optionSignIn = {
        values: {email, password},
        formErrors: this.state.formErrors,
        formValid: this.state.formValid,
        onChangeUserInput: this.handleUserInput,
        onClickSubmit: this.handleSendSubmit,
      };
      const optionSignUp = {
        values: {email, password, login, passwordConfirm},
        formErrors: this.state.formErrors,
        formValid: this.state.formValid,
        onChangeUserInput: this.handleUserInput,
        onClickSubmit: this.handleSignUp,
      };
      let options = {};
      switch (this.props.formType) {
        case FormType.SIGN_IN:
          options = optionSignIn;
          break;
        case FormType.SIGN_UP:
          options = optionSignUp;
          break;
        default:
          break;
      }
      return <Component {...this.props} options={options} />;
    }
    private _handleValidateField(fieldName: keyof State, value: string): void {
      const fieldValidationErrors = this.state.formErrors;
      let loginValid = this.state.loginValid;
      let emailValid = this.state.emailValid;
      let passwordValid = this.state.passwordValid;
      let passwordConfirmValid = this.state.passwordConfirmValid;
      const password = this.state.password;
      const passwordConfirm = this.state.passwordConfirm;
      switch (fieldName) {
        case "login":
          loginValid = value.length >= 4;
          fieldValidationErrors.login = loginValid ? "" : "Login is too short";
          break;
        case `email`:
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
            ? true
            : false;
          fieldValidationErrors.email = emailValid
            ? ``
            : `Please enter a valid email address`;
          break;
        case "password":
          passwordValid = value.length >= 6;
          fieldValidationErrors.password = passwordValid
            ? ""
            : "Password is too short";
          break;
        case "passwordConfirm":
          passwordConfirmValid = password === passwordConfirm;
          fieldValidationErrors.passwordConfirm = passwordConfirmValid
            ? ""
            : " Passwords do not match ";
          break;
        default:
          break;
      }
      this.setState(
        {
          formErrors: fieldValidationErrors,
          emailValid,
          loginValid,
          passwordValid,
          passwordConfirmValid,
        },
        this._handleValidateForm,
      );
    }
    private _handleValidateForm(): void {
      this.setState({
        formValid:
          this.state.emailValid &&
          this.state.passwordValid &&
          this.state.loginValid &&
          this.state.passwordConfirmValid,
      });
    }
  }

  return WithAuthorizationState;
};

const mapStateToProps = (state: StateApp, ownProps: Props): Props => ({
  ...ownProps,
  errorMessage: getError(state),
  success: getSuccess(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch): PropsDispatch => ({
  onSignIn: (email: string, password: string): void => {
    dispatch(Operation.signIn(email, password));
  },
  onSignUp: (email: string, password: string, login: string): void => {
    dispatch(Operation.signUp(email, password, login));
  },
  onResetError: (): void => {
    dispatch(ActionCreator.resetError());
  },
});

export { withAuthorizationState };

export default compose(
  connect<Props, PropsDispatch, {}, StateApp>(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAuthorizationState,
);
