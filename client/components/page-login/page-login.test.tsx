import * as Enzyme from "enzyme";
import { shallow } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import toJson, { Json } from "enzyme-to-json";
import * as React from "react";
import PageLogIn from "./page-login";

Enzyme.configure({ adapter: new Adapter() });
it(`PageLogIn correctly render`, (): void => {
  const tree: Json = toJson(shallow(<PageLogIn />));
  expect(tree).toMatchSnapshot();
});
